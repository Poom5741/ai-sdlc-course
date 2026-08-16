# Quest 2.9: Semantic Search Builder

**Block**: 2 - Advanced Capabilities | **Difficulty**: 🟡 Medium | **Time**: 30 minutes

## 🎯 Learning Objectives

- Implement cosine similarity for semantic search.
- **Measure similarity** — cosine similarity is the foundation of vector search.

## 📋 Instructions

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-2/block-b/quest-21-semantic-search my-quest
cd my-quest
```

1. Implement `cosineSimilarity(vecA, vecB)` and `search(query, documents)`.
2. Verify: `node test.js`

## ✅ Verification

`node test.js` checks identical/orthogonal/opposite vectors, magnitude invariance, and search accuracy.

## 💡 Hints

- Cosine similarity = dot(A,B) / (|A| × |B|)
- Normalize vectors to make similarity magnitude-invariant
- Search iterates through documents and finds highest similarity
