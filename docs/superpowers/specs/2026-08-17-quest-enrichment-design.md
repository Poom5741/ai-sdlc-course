# Quest Content Enrichment Design

## Overview

Transform all 136 quest pages from bare-bones coding instructions into rich **"learn first, then do"** mini-lessons. Each quest page becomes a complete learning experience: concept explanation → visual demonstration → knowledge quiz → hands-on practice.

## Goals

- Mix text reading material with hands-on quests (learn → visualize → quiz → practice)
- Use interactive 3D/2D visualizations where concepts benefit from spatial/dynamic interaction
- Generate content via AI (subagent dispatch) directly — no separate generation script
- Keep content within the existing Astro/Starlight infrastructure

## Quest Page Structure

Each enriched quest page follows this top-to-bottom flow:

```
┌─────────────────────────────────────────────┐
│  QUEST HEADER (existing)                    │
│  Title, Difficulty, Time badges             │
├─────────────────────────────────────────────┤
│  🎯 LEARNING OBJECTIVES                    │
│  3-5 bullet points of what you'll learn     │
├─────────────────────────────────────────────┤
│  📖 CONCEPT                                 │
│  2-3 paragraphs explaining the core idea    │
│  + embedded static SVG or 3D visualization  │
├─────────────────────────────────────────────┤
│  ⚙️ HOW IT WORKS                            │
│  Step-by-step breakdown with code examples  │
│  + comparison table or flowchart            │
├─────────────────────────────────────────────┤
│  💡 EXAMPLE                                  │
│  Concrete walkthrough of the concept        │
│  with annotated code                        │
├─────────────────────────────────────────────┤
│  ⚠️ COMMON MISTAKES                         │
│  Anti-patterns and how to avoid them        │
├─────────────────────────────────────────────┤
│  🧩 INTERACTIVE (if applicable)             │
│  Standalone HTML visualization via iframe   │
├─────────────────────────────────────────────┤
│  📝 QUIZ                                    │
│  2-3 multiple choice questions              │
├─────────────────────────────────────────────┤
│  🏋️ QUEST (existing, moved to bottom)       │
│  Download, code, test, submit               │
└─────────────────────────────────────────────┘
```

## Visualization Strategy

### When to use each type

| Concept Type | Tool | Rendering | Example Quests |
| --- | --- | --- | --- |
| Dynamic/spatial (top-p, attention, gradients, particles) | AetherViz Master | Three.js 3D | Token sampling, backpropagation, embedding spaces |
| Process/flow (pipelines, workflows, git branching) | visualize | SVG + CSS animation | CI/CD pipeline, SDLC phases, git merge |
| Data/comparison (benchmarks, costs, feature matrix) | visualize | D3.js / HTML | Model comparison, tool selection |
| Code anatomy (prompt structure, function breakdown) | visualize | Annotated code | Prompt engineering, refactoring |

### Scope rule

Not every quest gets an interactive visualization. The subagent decides based on whether the concept benefits from spatial/dynamic interaction. Roughly 40-50% of quests will have interactive visualizations. The rest get static SVGs or text-only explanations.

### Storage

- Standalone HTML files: `interactive-docs/public/visualizations/quest-{NN}.html`
- Static SVGs: `interactive-docs/src/assets/diagrams/quest-{NN}-{slug}.svg`

### Embedding in MDX

```mdx
import Visualization from '../../../components/Visualization.astro';

<Visualization questId="quest-35" title="Top-P / Top-K Sampling" />
```

## Quiz System

### Format

Each quest has 2-3 multiple choice questions stored as JSON:

```json
{
  "questId": "quest-35-top-p-top-k",
  "questions": [
    {
      "question": "What does top-p control?",
      "choices": [
        "Number of tokens to consider",
        "Cumulative probability threshold",
        "Temperature of sampling",
        "Maximum output length"
      ],
      "answer": 1,
      "explanation": "Top-p sets a cumulative probability cutoff. Tokens whose combined probability exceeds the threshold are excluded."
    }
  ]
}
```

### Storage

`interactive-docs/src/data/quizzes/quest-{NN}.json`

### Behavior

- Instant feedback on selection (correct/wrong + explanation)
- Soft gate: quiz completion encouraged before quest section, not enforced

## Astro Components

### `<Quiz />`

- Props: `questId: string`
- Loads quiz data from `src/data/quizzes/{questId}.json`
- Renders question card with radio buttons, submit, feedback
- Dark theme matching BlueBeltDojo brand

### `<Visualization />`

- Props: `questId: string`, `title: string`
- Embeds `/visualizations/quest-{NN}.html` in responsive iframe
- Loading state, fallback message for no-JS

### `<LearningObjectives />`

- Props: `items: string[]`
- Renders highlighted card with ✅ icons

## Implementation Approach

### Phase 1: Components (subagent)

Create the three new Astro components (`Quiz`, `Visualization`, `LearningObjectives`) and wire them into the Starlight setup.

### Phase 2: Reference Quest (subagent)

Enrich **Quest 1** as a reference implementation:

- Generate enriched MDX content
- Generate quiz JSON
- Generate visualization HTML (if applicable)
- Review and approve before batch processing

### Phase 3: Batch Enrichment (subagents)

Process remaining quests in parallel batches:

- Each subagent handles 5-10 quests
- Reads `problem.js` to understand what each quest teaches
- Generates MDX, quiz JSON, and visualization HTML
- Writes files directly

### Batch allocation

| Module | Quests | Subagent |
| --- | --- | --- |
| Module 1: AI Foundations | quest-1 through quest-12 | Subagent A |
| Module 2: LLM Training | quest-13 through quest-22 | Subagent B |
| Module 3: SDLC Phases | quest-23 through quest-42 | Subagent C |
| Module 4: Security & Deploy | quest-43 through quest-62 | Subagent D |
| Module 5: Advanced Patterns | quest-63 through quest-72 | Subagent E |
| Module 6: Prompt Engineering | quest-73 through quest-82 | Subagent F |
| Module 7: Review & Docs | quest-83 through quest-92 | Subagent G |
| Module 8: Refactoring | quest-93 through quest-102 | Subagent H |
| Module 9: Ethics & Multimodal | quest-103 through quest-110 | Subagent I |
| Module 10: Integration | quest-111 through quest-118 | Subagent J |
| Module 11: Git & GitHub | quest-119 through quest-128 | Subagent K |
| Module 12: Cloudflare | quest-129 through quest-136 | Subagent L |

## Content Guidelines

### Language

- Primary content in **Thai** (matching existing site locale)
- Technical terms kept in English (e.g., "top-p sampling", "backpropagation")
- Code examples in English

### Tone

- Friendly, encouraging, martial arts metaphor woven in naturally
- "Ready to level up?" / "This is your white belt moment" / etc.
- Not forced — the metaphor enhances, doesn't obstruct

### Code Examples

- Use the quest's actual `problem.js` and `solution.js` as reference
- Show relevant snippets, not full files
- Annotate with comments explaining the "why"

## File Structure

```
interactive-docs/
├── src/
│   ├── components/
│   │   ├── Quiz.astro              (new)
│   │   ├── Visualization.astro     (new)
│   │   └── LearningObjectives.astro (new)
│   ├── content/
│   │   └── docs/
│   │       ├── quests/
│   │       │   ├── quest-1-first-code.mdx        (enriched)
│   │       │   ├── quest-2-*.mdx                 (enriched)
│   │       │   └── ...
│   │       ├── en/quests/                        (English versions, future)
│   │       └── th/quests/                        (Thai versions, future)
│   ├── assets/
│   │   └── diagrams/
│   │       ├── quest-1-first-code.svg            (new, if needed)
│   │       └── ...
│   └── data/
│       └── quizzes/
│           ├── quest-1-first-code.json           (new)
│           └── ...
└── public/
    └── visualizations/
        ├── quest-1-first-code.html               (new, if interactive)
        └── ...
```

## Success Criteria

- [ ] All 136 quest pages enriched with mini-lesson content
- [ ] Quiz component functional and wired up
- [ ] Visualization component embedding standalone HTML
- [ ] At least 30% of quests have interactive visualizations
- [ ] Content is bilingual-ready (Thai primary, English terms preserved)
- [ ] All existing quest functionality (download, test, submit) preserved
- [ ] Site builds and deploys without errors
