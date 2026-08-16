# Quest 1.4: Token Counter

**Block**: 1 - AI Tools Setup | **Difficulty**: 🟢 Easy | **Time**: 15 minutes

## 🎯 Learning Objectives

- Count tokens in text to understand context window consumption.
- **Measure before you optimize** — know how many tokens your prompts use before trying to reduce them.

## 📋 Instructions (run on your machine)

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-1/block-a/quest-04-token-counter my-quest
cd my-quest
```

1. **Open `problem.js`** in editor with AI tool.
2. **Implement `countTokens(text)`** that returns approximate token count:
   - Split on whitespace (words ≈ 1 token each)
   - Punctuation attached to a word counts as a separate token
   - Empty string returns 0
   - Single space returns 1
3. **Verify:**
   ```bash
   node test.js
   ```

## ✅ Verification

`node test.js` checks basic cases, punctuation separation, and the single-space edge case (naive impls return 0 for " ").

## 💡 Hints

- Think character-by-character: when you hit a space or punctuation, that's a token boundary.
- Naive tokenizers often merge "hello," into 1 token — but it's actually 2: "hello" + ",".
- A single space IS a token (it separates words). Don't return 0 for " ".
