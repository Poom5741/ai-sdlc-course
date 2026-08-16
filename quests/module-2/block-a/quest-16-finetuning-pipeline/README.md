# Quest 2.4: Fine-Tuning Pipeline Design

**Block**: 2 - LLM Training | **Difficulty**: 🟡 Medium | **Time**: 25 minutes

## 🎯 Learning Objectives

- Design a fine-tuning pipeline (SFT → RLHF → DPO).
- **Plan before you train** — fine-tuning is expensive.

## 📋 Instructions

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-2/block-a/quest-16-finetuning-pipeline my-quest
cd my-quest
```

1. Create `finetuning-design.md` covering SFT, RLHF, DPO stages.
2. Verify: `node test.js`

## ✅ Verification

`node test.js` checks that the design doc covers all three stages with data requirements and metrics.

## 💡 Hints

- SFT uses labeled examples, RLHF uses reward models, DPO uses preference pairs
- Each stage has different data requirements
- Evaluation metrics differ by stage
