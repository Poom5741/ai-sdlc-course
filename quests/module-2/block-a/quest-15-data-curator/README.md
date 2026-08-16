# Quest 2.3: Data Curator

**Block**: 2 - LLM Training | **Difficulty**: 🟡 Medium | **Time**: 25 minutes

## 🎯 Learning Objectives

- Clean and filter training data for quality.
- **Data quality matters** — garbage in, garbage out.

## 📋 Instructions

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-2/block-a/quest-15-data-curator my-quest
cd my-quest
```

1. Implement `curateData(rawData)` to clean training data.
2. Verify: `node test.js`

## ✅ Verification

`node test.js` checks duplicate removal, short line filtering, punctuation detection, and whitespace trimming.

## 💡 Hints

- Remove duplicates (case-insensitive)
- Remove lines < 10 chars
- Remove lines where >50% is punctuation
- Trim whitespace on all lines
