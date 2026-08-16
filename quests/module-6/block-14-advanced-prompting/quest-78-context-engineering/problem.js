/**
 * Quest 6.6: Context Engineering — problem.js (learner edits this)
 *
 * Block: 14 - Advanced Prompting | Difficulty: 🟡 Medium | Time: 25 minutes
 *
 * Tool skill: optimal context selection from available documents.
 * Engineering habit: CONTEXT IS KING — the quality of LLM output depends
 * on what context you provide. More context ≠ better; relevant context = better.
 *
 * Goal: write `selectContext(query, documents, maxTokens)` that selects
 * the most relevant documents for a query within a token budget.
 *
 *   documents: [{ id, text, relevance }] — pre-scored for relevance
 *   maxTokens: maximum total tokens to include
 *
 * Returns: { selected: [{ id, text, tokens }], totalTokens, dropped: string[] }
 *
 * Rules:
 *   - Select documents by relevance score (highest first)
 *   - Never exceed maxTokens
 *   - Track which documents were dropped
 *   - Preserve original document order within selection
 *
 * Edge case: naive AI picks ALL documents until budget is full, ignoring
 * relevance. The selector MUST prioritize high-relevance docs even if
 * that means dropping some low-relevance ones that would fit.
 */

// TODO: implement selectContext(query, documents, maxTokens) here.
function selectContext(query, documents, maxTokens) {
  return { selected: [], totalTokens: 0, dropped: [] };
}

module.exports = { selectContext };
