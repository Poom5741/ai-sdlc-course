# Quest 4.11: Bias Detector

**Block**: 9 - Governance & Compliance | **Difficulty**: 🟡 Medium | **Time**: 25 minutes

## 🎯 Learning Objectives

- Detect bias in AI outputs using fairness metrics (disparate impact ratio).
- **Measure fairness** — bias is invisible unless you quantify it. Use rates, not counts.

## 📋 Instructions

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-4/block-9-governance/quest-53-bias-detector my-quest
cd my-quest
```

Implement `detectBias(results, demographics)` using the 4/ths rule (disparate impact ratio < 0.8).

## ✅ Verification

`node test.js` checks fair detection, biased detection, disparate impact calculation, and the critical edge case: different group sizes with proportional rates.
