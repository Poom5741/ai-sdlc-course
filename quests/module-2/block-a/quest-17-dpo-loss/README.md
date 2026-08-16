# Quest 2.5: DPO Loss Implementation

**Block**: 2 - LLM Training | **Difficulty**: 🔴 Hard | **Time**: 30 minutes

## 🎯 Learning Objectives

- Implement DPO (Direct Preference Optimization) loss function.
- **Understand the loss** — DPO simplifies RLHF without a reward model.

## 📋 Instructions

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-2/block-a/quest-17-dpo-loss my-quest
cd my-quest
```

1. Implement `dpoLoss(policyLogps, refLogps, beta)` using the DPO formula.
2. Verify: `node test.js`

## ✅ Verification

`node test.js` checks return type, positive loss, policy=reference baseline, beta sensitivity, and numerical stability.

## 💡 Hints

- Use log-space arithmetic: L = -log(σ(β * (log_ratio_chosen - log_ratio_rejected)))
- Numerically stable sigmoid: -log(sigmoid(x)) = softplus(-x) = log(1 + exp(-x))
