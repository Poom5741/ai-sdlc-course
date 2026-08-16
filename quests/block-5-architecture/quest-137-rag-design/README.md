# Quest 5.1: RAG Design

**Block**: 5 - Architecture | **Difficulty**: 🟡 Medium | **Time**: 20 minutes

## 🎯 Learning Objectives

- Design a Retrieval-Augmented Generation system over a real corpus.
- **Design for the failure mode** — plan empty retrieval, low-confidence, and out-of-corpus queries up front.

## 📋 Instructions (run on your machine)

```bash
npx degit Poom5741/ai-sdlc-course/quests/block-5-architecture/quest-13-rag-design my-quest
cd my-quest
```

1. Read the workshop docs in `interactive-docs/src/content/docs/` — that is the **corpus** you will index.
2. Design a RAG system in `rag-design.md` in THIS folder. Cover:
   - **Chunking strategy**: how you split the docs
   - **Embedding strategy**: which model + how chunks/queries are embedded
   - **Retrieval quality metric**: how you measure retrieval quality (e.g. recall@5, NDCG, precision)
   - **Failure handling**: what happens on empty retrieval / low confidence / out-of-corpus queries
   - **Corpus**: which documents are indexed
3. Verify:
   ```bash
   node test.js
   ```

## ✅ Verification

`node test.js` is a **design-doc validator** — it checks that `rag-design.md`
exists and contains the required sections (chunk, embed, metric, failure
mode/fallback, corpus) plus ≥ 400 characters of substance. It does NOT run code.

## 💡 Hints

- Pick a real, small corpus (the workshop docs). A small corpus makes the failure modes cheap to test.
- Name your metric explicitly (recall@5, precision@10, NDCG) — vague "it works" is not design.
- A failure mode without a fallback is just a bug. For each failure, write what the system returns.
- The hardest failure to design for is the out-of-corpus query — the LLM wants to answer. Add a guard.