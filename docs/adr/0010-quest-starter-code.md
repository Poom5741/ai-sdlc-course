# ADR-0010: Quest Starter Code Creation

## Status

**Superseded** by local folder approach (2026-08-12). StackBlitz distribution removed; quests now use `npx degit` to pull starter code locally. Partial solutions format and hybrid validation approach remain unchanged.

## Context

We need to create starter code for each of the 14 Code Quests. Learners need working code to start from, and the approach must be consistent across all quests and difficulty levels.

Key constraints:
- 14 code quests across 5 blocks
- Mix of difficulty levels (Easy/Medium/Hard)
- Workshop setting (8 hours)
- Must align with Code Playground decision (local folders via npx degit)

## Decision

We will use **partial solutions** (scaffolding + tasks) for all quests, distributed via **StackBlitz embeds**.

### Starter Code Format
**Partial solutions** — Each quest provides:
- Working scaffolding (project structure, imports, boilerplate)
- Clear task markers (comments like `// TODO: Implement your solution here`)
- Pre-configured dependencies
- README with quest instructions

Learners focus on the specific task, not project setup. Easy/hard refers to TASK complexity, not scaffolding.

### Distribution Method
**`npx degit`** — Primary method:
- One command to pull quest files locally
- Aligned with Code Playground decision (#009, superseded)
- Build and test on learner's machine

**Fallback**: Direct git clone from the course repo.

### Code Correctness
**Hybrid approach**:
- **Automated tests**: CI/CD on template repo catches regressions
- **Manual QA**: Instructor tests before each workshop
- **Learner validation**: `node test.js` passes = it's correct

### Quest Complexity Strategy
All quests use partial solutions regardless of difficulty:
- **Easy quests**: Simple task, clear scaffolding
- **Medium quests**: Moderate task, some scaffolding
- **Hard quests**: Complex task, minimal scaffolding but still structured

### Template Repo Structure
```
ai-sdlc-quests/
├── block-1-ai-tools/
│   ├── quest-01-setup/
│   │   ├── index.js          (partial solution)
│   │   ├── package.json      (pre-configured)
│   │   ├── README.md         (instructions)
│   │   └── test.js           (validation tests)
│   └── quest-02-config/
├── block-2-prompt-engineering/
├── block-3-context-engineering/
├── block-4-agentic-workflows/
└── block-5-integration/
```

## Consequences

### Positive
- Consistent experience across all quests
- Reduced cognitive load (learners focus on task, not setup)
- Aligns with local folder approach
- Easy to maintain (single template repo)

### Negative
- More upfront work to create partial solutions
- May feel "hand-holdy" for advanced learners
- Template repo needs ongoing maintenance

### Risks
- Partial solutions may have bugs
- Mitigation: Automated tests + manual QA
- Learners may not understand scaffolding
- Mitigation: Clear README with structure explanation

## Alternatives Considered

1. **Blank slates**: Rejected — too much setup friction for 8-hour workshop
2. **Complete projects**: Rejected — learners learn less if everything is pre-built
3. **Learner choice**: Rejected — adds complexity, inconsistent experience

## References

- Wayfinder Ticket #006: Quest Starter Code Creation
- Related ADR: 0009 (Code Playground Integration)
