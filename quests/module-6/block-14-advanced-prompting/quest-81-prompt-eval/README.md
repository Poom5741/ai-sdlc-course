# Quest 6.9: Prompt Evaluation Framework

**Block**: 14 - Advanced Prompting | **Difficulty**: 🔴 Hard | **Time**: 35 minutes

## 🎯 Learning Objectives

- Evaluate prompt quality systematically with test cases and scoring.
- **Measure prompt quality** — "it feels right" is not a metric.

## 📋 Instructions

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-6/block-14-advanced-prompting/quest-81-prompt-eval my-quest
cd my-quest
```

Implement `createPromptEvaluator(testCases)` with scoring that penalizes forbidden content.

## ✅ Verification

`node test.js` checks scoring, pass/fail counting, forbidden content penalties, and partial credit.
