# Quest 1.5: Context Window Budget Calculator

**Block**: 1 - AI Tools Setup | **Difficulty**: 🟡 Medium | **Time**: 20 minutes

## 🎯 Learning Objectives

- Calculate how much context fits in a model's context window.
- **Budget your context** — allocate context window space intentionally (system prompt, user prompt, history, response) instead of letting it grow until truncation.

## 📋 Instructions (run on your machine)

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-1/block-a/quest-05-context-budget my-quest
cd my-quest
```

1. **Open `problem.js`** in editor with AI tool.
2. **Implement `calculateBudget()`** that returns `{ total, used, available, withinBudget, overBy }` for a 16384-token context window.
3. **Verify:**
   ```bash
   node test.js
   ```

## ✅ Verification

`node test.js` checks basic calculation, exact-budget boundary, over-budget clamping, all-zeros, and reserved-response-exceeds-total.

## 💡 Hints

- `available` must never go below 0 — use `Math.max(0, ...)`.
- `overBy` is 0 when within budget, positive when over.
- The total context window is 16384 tokens.
