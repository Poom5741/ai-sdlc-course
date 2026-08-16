# Quest 5.1: Agent Loop Builder

**Block**: 11 - Agentic Workflows | **Difficulty**: 🟡 Medium | **Time**: 25 minutes

## 🎯 Learning Objectives

- Implement a generate-review-fix agent loop.
- **Agent loops must terminate** — every loop needs a max iteration guard.

## 📋 Instructions

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-5/block-11-agentic/quest-63-agent-loop my-quest
cd my-quest
```

Implement `agentLoop(generator, reviewer, maxIterations)` that generates, reviews, and loops until approval or max iterations.

## ✅ Verification

`node test.js` checks first-try approval, multi-iteration improvement, max iteration termination, and history tracking.
