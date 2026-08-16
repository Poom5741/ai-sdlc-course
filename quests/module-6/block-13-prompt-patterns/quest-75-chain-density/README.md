# Quest 6.3: Chain-of-Density Optimizer

**Block**: 13 - Prompt Patterns | **Difficulty**: 🟡 Medium | **Time**: 25 minutes

## 🎯 Learning Objectives

- Reduce verbosity while keeping information density.
- **Dense > verbose** — every token costs money. Remove filler, keep meaning.

## 📋 Instructions

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-6/block-13-prompt-patterns/quest-75-chain-density my-quest
cd my-quest
```

Implement `optimizeDensity(text, targetRatio)` that removes fillers, redundant phrases, and compresses text.

## ✅ Verification

`node test.js` checks filler removal, ratio targets, key term preservation, and redundant phrase removal.
