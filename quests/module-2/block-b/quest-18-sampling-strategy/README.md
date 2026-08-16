# Quest 2.6: Sampling Strategy Explorer

**Block**: 2 - Advanced Capabilities | **Difficulty**: 🟢 Easy | **Time**: 20 minutes

## 🎯 Learning Objectives

- Implement different sampling strategies (temperature, top-k, top-p).
- **Control the chaos** — sampling parameters control randomness/creativity.

## 📋 Instructions

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-2/block-b/quest-18-sampling-strategy my-quest
cd my-quest
```

1. Implement `sampleNext(logits, strategy)` for greedy, temperature, top-k, top-p.
2. Verify: `node test.js`

## ✅ Verification

`node test.js` checks greedy selection, temperature=0, top-k restriction, and top-p validity.

## 💡 Hints

- Apply temperature to logits BEFORE softmax
- Greedy always picks the highest logit
- Top-k restricts to top k candidates before sampling
