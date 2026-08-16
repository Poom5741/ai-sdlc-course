# Quest 2.1: Next Token Predictor

**Block**: 2 - LLM Training | **Difficulty**: 🟢 Easy | **Time**: 20 minutes

## 🎯 Learning Objectives

- Implement a simple bigram language model.
- **Understand the foundation** — next-token prediction is the core task all LLMs are trained on.

## 📋 Instructions (run on your machine)

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-2/block-a/quest-13-next-token-predictor my-quest
cd my-quest
```

1. **Open `problem.js`** in editor with AI tool.
2. **Implement `predictNext(context, trainingData)`** that predicts the most likely next word.
3. **Verify:**
   ```bash
   node test.js
   ```

## ✅ Verification

`node test.js` checks basic prediction, context matching, empty context fallback, and case-insensitive matching.

## 💡 Hints

- Count word frequencies after each occurrence of the context
- Case-insensitive matching is critical
- Empty context should return the most common word overall
