# Quest Content Enrichment — Design Spec

**Date:** 2026-08-17
**Status:** Approved
**Goal:** Transform 136 bare-bones quest pages into rich mini-lessons with interactive 3D visualizations, quizzes, and reading material.

## Problem

Current quest pages are just: title → download code → run tests → submit. No explanatory content, no visual aids, no learning before doing. Learners are thrown into coding without understanding the concepts first.

## Solution

Enrich each quest page with a "learn first, then do" structure:

```
🎯 Learning Objectives
📖 Concept (with visualization)
⚙️ How It Works (with code examples)
💡 Example (walkthrough)
⚠️ Common Mistakes
🧩 Interactive Demo (3D/2D visualization, if applicable)
📝 Quiz (2-3 questions)
🏋️ Quest (hands-on coding — moved to bottom)
```

## Architecture

### Components (3 new Astro components)

1. **`<Quiz />`** — Renders multiple-choice quiz from JSON data
   - Props: `questId: string`
   - Data: `src/data/quizzes/quest-{NN}.json`
   - Instant feedback with explanations

2. **`<Visualization />`** — Responsive iframe for standalone HTML visualizations
   - Props: `questId: string`, `title: string`
   - Source: `public/visualizations/quest-{NN}.html`
   - Loading state + no-JS fallback

3. **`<LearningObjectives />`** — Styled objectives card
   - Props: `items: string[]`

### Content Generation

- **Approach:** AI-generated directly in-session, dispatched to subagents
- **No separate script** — subagents generate content per quest/module batch
- Each subagent reads `problem.js` to understand the quest topic, then generates enriched MDX + quiz JSON + visualization HTML

### Visualization Strategy

| Concept Type | Rendering | Tool Reference | When |
| --- | --- | --- | --- |
| Dynamic/spatial | Three.js 3D | AetherViz Master | Token sampling, attention, gradients, embeddings |
| Process/flow | SVG + CSS animation | visualize | Pipelines, workflows, git branching |
| Data/comparison | D3.js / HTML | visualize | Benchmarks, cost tables, feature matrix |
| Code anatomy | Annotated code | visualize | Prompt structure, refactoring patterns |

**Scope:** ~40-50% of quests get interactive visualizations. Rest get static SVGs or text-only.

### Content Language

- Primary: **Thai** (matching existing site locale)
- Technical terms: **English** (preserved as-is)
- Code examples: **English**
- Tone: Friendly, martial arts metaphor woven naturally

## Implementation Phases

### Phase 1: Components

Create `Quiz.astro`, `Visualization.astro`, `LearningObjectives.astro`.

### Phase 2: Reference Quest

Enrich **Quest 1** as reference implementation. Review before batch processing.

### Phase 3: Batch Enrichment

12 subagents process quests in parallel by module.

## File Structure

```
interactive-docs/src/
├── components/
│   ├── Quiz.astro                    (new)
│   ├── Visualization.astro           (new)
│   └── LearningObjectives.astro      (new)
├── content/docs/quests/
│   └── quest-{NN}-{slug}.mdx        (enriched, all 136)
├── assets/diagrams/
│   └── quest-{NN}-{slug}.svg        (new, where needed)
├── data/quizzes/
│   └── quest-{NN}-{slug}.json       (new, all 136)
└── ...
interactive-docs/public/visualizations/
└── quest-{NN}-{slug}.html            (new, ~50-70 quests)
```

## Verification

- [ ] 3 new Astro components created and functional
- [ ] Quest 1 reference implementation approved
- [ ] All 136 quest MDX files enriched with mini-lesson content
- [ ] Quiz JSON generated for all quests
- [ ] ~50-70 interactive HTML visualizations generated
- [ ] `npm run build` passes without errors
- [ ] Quest download/test/submit flow preserved
- [ ] Content reads naturally in Thai with English technical terms
