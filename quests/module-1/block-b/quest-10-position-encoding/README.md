# Quest 1.10: Position Encoding Explorer

**Block**: 1 - LLM Fundamentals | **Difficulty**: 🟡 Medium | **Time**: 25 minutes

## 🎯 Learning Objectives

- Implement positional encoding for transformer models.
- **Sequence matters** — transformers need position info because attention alone is permutation-invariant.

## 📋 Instructions (run on your machine)

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-1/block-b/quest-10-position-encoding my-quest
cd my-quest
```

1. **Open `problem.js`** in editor with AI tool.
2. **Implement `positionalEncoding(maxLen, dModel)`** using sinusoidal encoding.
3. **Verify:**
   ```bash
   node test.js
   ```

## ✅ Verification

`node test.js` checks output shape, sin/cos values at position 0, frequency patterns, and correct sin/cos assignment.

## 💡 Hints

- Even indices (0, 2, 4, ...) use sin, odd indices (1, 3, 5, ...) use cos
- The angle formula: pos / 10000^(2i/dModel) where i is the dimension index
- Frequency decreases as dimension increases
