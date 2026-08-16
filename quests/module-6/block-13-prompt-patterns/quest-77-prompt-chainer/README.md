# Quest 6.5: Prompt Chainer

**Block**: 13 - Prompt Patterns | **Difficulty**: 🔴 Hard | **Time**: 30 minutes

## 🎯 Learning Objectives

- Build multi-step prompt workflows with failure handling.
- **Chain prompts for complexity** — complex tasks need multiple focused prompts.

## 📋 Instructions

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-6/block-13-prompt-patterns/quest-77-prompt-chainer my-quest
cd my-quest
```

Implement `createChain(steps)` with sequential execution, history recording, and failure-stops-chain behavior.

## ✅ Verification

`node test.js` checks chaining, history, output passing, and the critical edge case: failure must stop the chain.
