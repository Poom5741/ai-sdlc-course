# Quest 1.12: Transformer From Scratch

**Block**: 1 - LLM Fundamentals | **Difficulty**: 🔴 Hard | **Time**: 45 minutes

## 🎯 Learning Objectives

- Implement a simplified transformer block from scratch.
- **Build to understand** — implementing reveals how pieces fit together.

## 📋 Instructions (run on your machine)

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-1/block-b/quest-12-transformer-scratch my-quest
cd my-quest
```

1. **Open `problem.js`** in editor with AI tool.
2. **Implement `transformerBlock(input, weights)`** with:
   - Layer Normalization
   - Self-Attention with QKV
   - Feed-Forward network
   - Residual connections after each sub-layer
3. **Verify:**
   ```bash
   node test.js
   ```

## ✅ Verification

`node test.js` checks output shape, residual connections, multiple tokens, and weight sensitivity.

## 💡 Hints

- Each sub-layer (attention, feed-forward) must have a residual connection: output = input + sublayer(normalized(input))
- Layer norm: normalize across features, not across tokens
- Use ReLU activation in the feed-forward layer
