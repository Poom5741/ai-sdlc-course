# Quest 1.9: Self-Attention Implementation

**Block**: 1 - LLM Fundamentals | **Difficulty**: 🟡 Medium | **Time**: 25 minutes

## 🎯 Learning Objectives

- Implement the self-attention mechanism (QKV calculation).
- **Understand the math** — don't treat neural networks as black boxes.

## 📋 Instructions (run on your machine)

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-1/block-b/quest-09-self-attention my-quest
cd my-quest
```

1. **Open `problem.js`** in editor with AI tool.
2. **Implement `selfAttention(tokens, Wq, Wk, Wv)`** using the scaled dot-product attention formula.
3. **Verify:**
   ```bash
   node test.js
   ```

## ✅ Verification

`node test.js` checks single-token attention, two-token distribution, sqrt(d_k) scaling, and determinism.

## 💡 Hints

- The formula: Q = tokens × Wq, K = tokens × Wk, V = tokens × Wv
- Scale scores by sqrt(d_k) before softmax — this prevents gradient explosion
- Apply softmax per row (each token attends independently)
