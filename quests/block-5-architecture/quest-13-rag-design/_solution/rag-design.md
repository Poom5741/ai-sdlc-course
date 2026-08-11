# RAG Design — reference design (do NOT copy; write your own)

> Reference shape for `rag-design.md`. The learner writes their own RAG design
> over the workshop docs. Do not ship this to learners; it lives in `_solution/`
> so maintainers can GREEN-verify the validator.

## Corpus

The corpus being indexed is the **workshop docs** — every Markdown page under
`interactive-docs/src/content/docs/` (Blocks 1–5, concept notes, quest pages,
and ADR examples), roughly 50 kb of prose. We also index the README files in
each `quests/<block>/quest-NN-*` folder so the RAG can answer "which quest
teaches X?".

## Chunking strategy

Each workshop doc is split on Markdown headings first (`#`, `##`, `###`).
Any heading section longer than 800 characters is further split on paragraph
boundaries into ≤ 800-char windows with a 100-char overlap so a single
chunk never straddles two topics. Very short sections (< 200 chars) are
merged with the following section. Each chunk carries metadata: source path,
heading path, and char offset for citation.

## Embedding strategy

We embed each chunk and each user query with a small sentence-transformer
(`all-MiniLM-L6-v2`, 384-dim). Chunks are embedded once at index time and
stored in an in-memory vector index keyed by chunk id. Queries are embedded
on demand. Embedding the chunk's heading path prepended to its body improved
recall versus body-only.

## Retrieval strategy + quality metric

Retrieve top-K (K = 5) chunks by cosine similarity between the query
embedding and chunk embeddings. The retrieval quality metric is **recall@5**
measured against a held-out Q&A set of 40 workshop questions with
human-labeled relevant chunks. We hold out precision too, but the primary
metric is recall@5 because the LLM can tolerate noisy context but not
missing context. Target: recall@5 >= 0.8 on the held-out set.

## Failure handling (DESIGN FOR THE FAILURE MODE)

The system is built for three failure modes, each with a fallback:

1. **Empty retrieval** — top-K cosine scores all below 0.30. Failure mode
   fallback: do NOT call the LLM with empty context; return a canned
   "I don't have enough context to answer that" answer plus a link to the
   docs index. This avoids hallucination.
2. **Low-confidence retrieval** — top score between 0.30 and 0.45.
   Fallback: still generate, but prepend "This answer is uncertain; the
   best-matched doc section is <heading>." so the user can verify.
3. **Out-of-corpus query** — a small classifier flags queries that look
   unrelated to the workshop (e.g. asks for code in another language).
   Graceful degradation: return the canned "out of scope" message instead
   of guessing. This is the most important failure mode — it teaches the
   system to say "I don't know" rather than confabulate.

## Why this design

Chunking on headings keeps each chunk on one topic; the 800-char window
bounds the LLM context cost. A sentence-transformer is cheap and good
enough at this corpus size. recall@5 rewards "did we surface the right
chunk" without overfitting to a single gold result. The failure-mode
fallbacks — empty retrieval, low-confidence, out-of-corpus — are what
make the system trustworthy: it costs little to add them and they prevent
the worst failure (confidently wrong answers) at query time.