# Quest 5.6: LLM Evaluator

**Block**: 12 - Production Patterns | **Difficulty**: 🟡 Medium | **Time**: 30 minutes

## 🎯 Learning Objectives

- Implement LLM-as-a-Judge with calibrated scoring.
- **Evaluate with an LLM** — but detect systematic biases like overly generous scoring.

## 📋 Instructions

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-5/block-12-production/quest-68-llm-evaluator my-quest
cd my-quest
```

Implement `createEvaluator(criteria)` with weighted scoring, grade assignment, and suspicious score detection.

## ✅ Verification

`node test.js` checks scoring, weighted calculation, grade assignment, and suspicious scoring detection.
