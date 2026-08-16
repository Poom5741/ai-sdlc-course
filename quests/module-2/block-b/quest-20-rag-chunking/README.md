# Quest 2.8: RAG Chunking Strategist

**Block**: 2 - Advanced Capabilities | **Difficulty**: 🟡 Medium | **Time**: 25 minutes

## 🎯 Learning Objectives

- Implement document chunking for RAG systems.
- **Chunk wisely** — splitting affects retrieval quality.

## 📋 Instructions

```bash
npx degit Poom5741/ai-sdlc-course/quests/module-2/block-b/quest-20-rag-chunking my-quest
cd my-quest
```

1. Implement `chunkDocument(text, options)` with paragraph/sentence/word splitting.
2. Verify: `node test.js`

## ✅ Verification

`node test.js` checks array return, chunk size limits, overlap, and boundary respect.

## 💡 Hints

- Split by paragraphs, sentences, or words based on options
- Respect boundaries — don't split mid-word or mid-sentence
- Overlap helps maintain context between chunks
