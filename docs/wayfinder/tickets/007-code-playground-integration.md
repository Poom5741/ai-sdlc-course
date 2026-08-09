---
title: "Code Playground Integration"
type: grilling
status: open
blocking: []
blocked_by: []
---

# Ticket: Code Playground Integration

## Question

How should we integrate code playgrounds into the interactive docs?

### Context
- Workshop uses Astro + Starlight interactive docs
- Learners need to run code during quests
- Mixed quest types (code-focused and design-focused)
- Need immediate feedback

### Decision needed
1. Which playground platform? (StackBlitz, CodeSandbox, GitHub Codespaces)
2. How to embed playgrounds in Astro/Starlight?
3. How to handle environment setup?
4. How to save learner progress?

### Options to consider
- StackBlitz embed (browser-based, instant)
- CodeSandbox embed (full IDE experience)
- GitHub Codespaces (full VS Code, but slower)
- Custom playground solution

## Acceptance criteria
- [ ] Playground platform selected
- [ ] Integration approach documented
- [ ] Environment setup clear
