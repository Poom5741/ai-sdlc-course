# Quest 1.11: Model Architecture Classifier

**Block**: 1 - LLM Fundamentals | **Difficulty**: 🔴 Hard | **Time**: 30 minutes

## 🎯 Learning Objectives

- Classify model architectures (BERT, GPT, T5) by their properties.
- **Know your tools** — different architectures have different strengths.

## 📋 Instructions (run on your machine)

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-1/block-b/quest-11-model-arch-classifier my-quest
cd my-quest
```

1. **Open `problem.js`** in editor with AI tool.
2. **Implement `classifyArchitecture(config)`** that identifies BERT, GPT, T5, or UNKNOWN.
3. **Verify:**
   ```bash
   node test.js
   ```

## ✅ Verification

`node test.js` checks correct classification for BERT, GPT, T5, and multiple edge cases where naive AI gets it wrong.

## 💡 Hints

- Don't just check `type` — also check `attentionType`.
- Decoder-only + bidirectional attention is NOT GPT (GPT uses causal attention).
- Encoder-only + causal attention is NOT BERT (BERT uses bidirectional).
