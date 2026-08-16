# Quest 2.2: Scaling Laws Calculator

**Block**: 2 - LLM Training | **Difficulty**: 🟡 Medium | **Time**: 25 minutes

## 🎯 Learning Objectives

- Compute compute-optimal parameter/data allocation.
- **Scale intentionally** — understand tradeoffs between model size, data, and compute.

## 📋 Instructions

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-2/block-a/quest-14-scaling-laws my-quest
cd my-quest
```

1. Implement `computeOptimal(computeBudget)` using Chinchilla scaling laws.
2. Verify: `node test.js`

## ✅ Verification

`node test.js` checks scaling law formula, budget relationships, and ratio classification.

## 💡 Hints

- Use Chinchilla approximation: N ≈ 0.3 × C^0.5
- Parameters and tokens should be roughly equal for compute-optimal
