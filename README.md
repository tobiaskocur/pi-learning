# Pi Learning

A prediction-first AI tutor profile for [Pi](https://github.com/earendil-works/pi) and BB.

Instead of answering immediately, the tutor:

1. probes the learner’s current edge;
2. verifies foundations with an isolated researcher;
3. proposes a dependency map and waits for approval;
4. teaches one connected node at a time;
5. generates and inspects a useful visual when needed;
6. checks transfer before recording progress.

The point is productive struggle: AI prompts, corrects, visualizes, and tests without replacing the learner’s thinking.

## What is included

- `.pi-profile/SYSTEM.md` — tutor system prompt
- `.pi-profile/skills/teach/` — prediction-first teaching workflow
- `.pi-profile/skills/visualize/` — visual selection and verification workflow
- `.pi-profile/extensions/subagent/` — isolated researcher and visual-maker agents
- `.pi-profile/extensions/visual-tools/` — Mermaid and SVG render tools
- `AGENTS.md` — workspace rules
- `lessons/` — local lesson state, ignored by Git
- `viz/` — generated visuals, ignored by Git

## Requirements

- Pi installed and authenticated with any supported model provider
- Node.js and npm
- [Lightpanda](https://lightpanda.io/) or `curl` for researcher web access
- Chrome/Chromium for Mermaid rendering
- Optional: `rsvg-convert` or ImageMagick for SVG rendering

Extensions execute with your local user permissions. Review them before use.

## Run

```bash
git clone https://github.com/tobiaskocur/pi-learning.git
cd pi-learning
npm install --prefix .pi-profile/extensions/visual-tools
PI_CODING_AGENT_DIR="$PWD/.pi-profile" pi
```

Pi chooses from your authenticated models. Visual/research subagents inherit the model selected in the parent session. Plain Pi uses text questions; BB renders them as structured answer cards.

For BB, create a project rooted at this repository and set `PI_CODING_AGENT_DIR` to the absolute `.pi-profile` path.

## Example prompt

```text
Teach me how to distinguish AI confidence from diagnostic evidence.
Require my prediction before explanation, show the dependency plan first,
and finish with a transfer check.
```

## Local data

Authentication, model overrides, lesson notes, generated images, dependencies, and session state stay untracked. Do not commit them without reviewing their contents.
