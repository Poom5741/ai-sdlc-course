# Quest 5.7: Semantic Cache Builder

**Block**: 12 - Production Patterns | **Difficulty**: 🔴 Hard | **Time**: 30 minutes

## 🎯 Learning Objectives

- Cache LLM responses by semantic similarity.
- **Cache the expensive** — if a similar question was asked before, reuse the answer.

## 📋 Instructions

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-5/block-12-production/quest-69-semantic-cache my-quest
cd my-quest
```

Implement `createSemanticCache(threshold)` with cosine similarity matching, hit/miss tracking, and size stats.

## ✅ Verification

`node test.js` checks exact match, semantic match, threshold filtering, stats tracking, and the edge case: similar meanings must match even if words differ.
