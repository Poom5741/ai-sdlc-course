# Quest 5.5: Self-Reflecting Agent

**Block**: 11 - Agentic Workflows | **Difficulty**: 🔴 Hard | **Time**: 35 minutes

## 🎯 Learning Objectives

- Build an agent that scores its own output quality and retries.
- **Self-assessment prevents overconfidence** — know when to ask for help.

## 📋 Instructions

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-5/block-11-agentic/quest-67-self-reflecting my-quest
cd my-quest
```

Implement `createSelfReflectingAgent(generateFn, evaluateFn)` with self-scoring, confidence levels, and retry on low quality.

## ✅ Verification

`node test.js` checks scoring, confidence levels, retry behavior, and needsHelp flag.
