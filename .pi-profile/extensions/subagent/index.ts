import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Type } from "@earendil-works/pi-ai";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

const here = dirname(fileURLToPath(import.meta.url));
const visualTools = join(here, "..", "visual-tools", "tools");

const agents = {
  researcher: {
    prompt: "researcher.md",
    tools: "bash",
    extensions: [] as string[],
    thinking: "low",
  },
  "mermaid-maker": {
    prompt: "mermaid-maker.md",
    tools: "write_mermaid,edit_mermaid,render_mermaid",
    extensions: [join(visualTools, "mermaid_tools.ts")],
    thinking: "medium",
  },
  "svg-maker": {
    prompt: "svg-maker.md",
    tools: "write_svg,edit_svg,render_svg",
    extensions: [join(visualTools, "svg_tools.ts")],
    thinking: "medium",
  },
} as const;

type AgentName = keyof typeof agents;

function text(content: unknown): string {
  if (!Array.isArray(content)) return "";
  return content
    .filter((part): part is { type: "text"; text: string } =>
      typeof part === "object" && part !== null && (part as { type?: string }).type === "text")
    .map((part) => part.text)
    .join("\n");
}

async function runAgent(
  agent: AgentName,
  task: string,
  cwd: string,
  provider: string,
  model: string,
  signal?: AbortSignal,
): Promise<string> {
  const config = agents[agent];
  const systemPrompt = readFileSync(join(here, "agents", config.prompt), "utf8");
  const args = [
    "--mode", "json", "-p", "--no-session", "--no-skills", "--no-context-files",
    "--no-extensions", "--tools", config.tools,
    "--provider", provider, "--model", model,
    "--thinking", config.thinking, "--system-prompt", systemPrompt,
  ];
  for (const extension of config.extensions) args.push("--extension", extension);
  args.push(`Task: ${task}`);

  return await new Promise((resolve, reject) => {
    const child = spawn("pi", args, { cwd, env: process.env, stdio: ["ignore", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";
    let answer = "";

    child.stdout.on("data", (chunk: Buffer) => {
      stdout += chunk.toString();
      const lines = stdout.split("\n");
      stdout = lines.pop() ?? "";
      for (const line of lines) {
        try {
          const event = JSON.parse(line);
          if (event.type === "message_end" && event.message?.role === "assistant") {
            answer = text(event.message.content) || answer;
          }
        } catch {}
      }
    });
    child.stderr.on("data", (chunk: Buffer) => { stderr += chunk.toString(); });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0 && answer) resolve(answer);
      else reject(new Error(stderr.trim() || `Subagent exited ${code ?? "without status"}`));
    });

    const stop = () => child.kill("SIGTERM");
    if (signal?.aborted) stop();
    else signal?.addEventListener("abort", stop, { once: true });
  });
}

export default function (pi: ExtensionAPI) {
  pi.registerTool({
    name: "subagent",
    label: "Learning subagent",
    description: "Run an isolated researcher or visual maker. Researcher verifies facts from web sources. Mermaid/SVG makers render and inspect one visual, save it under viz/, and return its path.",
    parameters: Type.Object({
      agent: Type.Union([
        Type.Literal("researcher"),
        Type.Literal("mermaid-maker"),
        Type.Literal("svg-maker"),
      ]),
      task: Type.String({ description: "Self-contained task or visual brief." }),
    }),
    async execute(_id, params, signal, _onUpdate, ctx) {
      if (!ctx.model) throw new Error("No model selected.");
      const output = await runAgent(
        params.agent as AgentName,
        params.task,
        ctx.cwd,
        ctx.model.provider,
        ctx.model.id,
        signal,
      );
      return { content: [{ type: "text", text: output }], details: { agent: params.agent } };
    },
  });
}
