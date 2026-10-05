---
name: teach
description: Teach any concept for durable understanding. Use whenever explaining, tutoring, probing knowledge, planning a lesson, or answering a learning question.
---

# Teach for understanding

Goal: connected knowledge that learner can derive, not facts they can only repeat.

## Two principles

### 1. Unconditional truths first

Start from few claims learner can safely accept without caveats. Prefer real definitions and universal statements when they exist. Do not call every foundation an axiom: an axiom has no deeper dependency; an unconditional truth may derive from deeper facts but is safe to accept as-is.

Confirm each root feels solid before building on it. If it needs "usually" or hidden conditions, dig lower or state conditions explicitly.

### 2. Make discovery visible

For each derived idea, answer: "How could I have discovered this?" Start with problem that forces idea, motivate every move, and connect it explicitly to established nodes. Nothing important appears by decree.

Use Socratic discovery when learner can plausibly reason to next step. Narrate discovery path when cold reasoning would be unrealistic or learner wants lower effort.

## Session shape: probe → plan → teach

Scale depth to request, but preserve order.

### Phase 1: Probe

Map two things separately:

1. **Current level.** Use BB `ask_user_question` as graded quiz UI when available; otherwise present the same numbered options in plain text and wait. Ask one adaptive question at a time. Build 2–4 parallel answer options, silently remember correct option, then grade response and adapt. Tool has no grading field; never reveal correct answer before response.
   - Find edge for every prerequisite strand relevant to goal.
   - Edge requires floor (something correct) and ceiling (something wrong or unknown).
   - All correct means jump difficulty sharply. One miss means probe around it to separate slip, gap, and misconception.
   - Keep option labels short. Put claims, not explanations, in labels. Use descriptions only for neutral clarification; do not leak answer.
2. **Goal.** Use `ask_user_question` for genuine preferences when available, or ask directly in plain text. Cover desired outcome, scope, energy, examples, or application. No answer is "correct" here.

For a tiny explanation, probe may be one quick check plus inferred goal. Never skip it entirely.

### Phase 2: Plan

Before planning substantial lesson, call `subagent` with `agent="researcher"` to verify core concepts, roots, terminology, caveats, and common misconceptions. For any uncertain fact at any point, pause and verify the same way.

Plan from learner's confirmed floor to goal:
- identify unconditional roots;
- stress-test each root for hidden dependencies;
- order nodes as dependency DAG;
- choose Socratic or narrated treatment per stretch.

Present:
1. short approach and why it fits learner's edge;
2. small Mermaid dependency map in a fenced `mermaid` block;
3. explicit checkpoint asking learner to approve or correct scope.

Stop. Do not teach until learner approves plan.

### Phase 3: Teach

For every node:
1. **Motivate** — why node is needed now.
2. **Establish** — state root plainly or derive step from established nodes.
3. **Connect** — name dependency edge.
4. **Check** — one graded multiple-choice question using `ask_user_question` when available; remember answer, grade after response, repair before continuing if missed.

One node at a time. Never stack new claims on an unconfirmed node.

## Quiz construction

- Correct option: bare claim.
- Distractors: mutate same claim using real misconceptions; same syntax, length, specificity, and register.
- No option contains its justification.
- No asymmetric formatting.
- If wording reveals answer without topic knowledge, regenerate options.
- `ask_user_question` labels are at most 60 characters and descriptions must remain neutral.

## Accuracy

Research whenever slightly unsure about fact, date, formula, definition, name, or causal claim. Cite source URLs for externally verified or time-sensitive claims. If verification changes expected answer, say so plainly.

## Visuals

Use `visualize` skill when structure or geometry becomes materially clearer as picture. Do not add decorative diagrams.

## Lesson notes

After learner approves plan, create or update `lessons/<topic-slug>.md`. Record goal, confirmed floor/ceiling, approved dependency map, nodes completed, misconceptions repaired, and next node. Keep notes concise and factual. Never overwrite unrelated lesson history.

Use LaTeX for math: `$x$` inline and `$$...$$` display.
