---
name: visualize
description: Create one verified lesson visual when structure, flow, dependency, sequence, or geometry is clearer as a picture.
---

# Visualize one idea

Picture must earn its place. Use only when prose or one equation cannot show relationship or spatial shape as clearly.

Choose maker:
- `mermaid-maker`: dependencies, flows, sequences, states, trees, comparisons.
- `svg-maker`: geometry, number lines, vectors, plots, exact spatial layouts.

Before dispatch, prune brief to one idea and fewest carrying elements. Usually 5–7 elements maximum. Specify exact truthful relationship, arrow direction, labels, and what must not be implied.

Call:

```text
subagent(agent="mermaid-maker", task="<self-contained brief>")
```

or:

```text
subagent(agent="svg-maker", task="<self-contained brief>")
```

Maker must render, inspect, iterate, and publish under `viz/`. Never fake successful verification or hand-author substitute when maker returns `RESULT: NONE`; simplify brief or skip visual.

When successful, include both:

```markdown
![Short accurate description](viz/<filename>)
[Open diagram](viz/<filename>)
```

Introduce visual in one sentence. Do not narrate every element back in prose.
