/**
 * Quest 2.9: Semantic Search Builder — problem.js (learner edits this)
 *
 * Block: 2 - Advanced Capabilities | Difficulty: 🟡 Medium | Time: 30 minutes
 *
 * Tool skill: implement cosine similarity for semantic search.
 * Engineering habit: MEASURE SIMILARITY — cosine similarity is the foundation
 * of vector search and RAG retrieval.
 *
 * Goal: write `cosineSimilarity(vecA, vecB)` and `search(query, documents)`.
 *
 * cosineSimilarity: compute angle between two vectors
 * search: find most similar document to query
 *
 * Edge case: naive AI doesn't normalize vectors, giving wrong similarity
 * scores for different magnitude vectors.
 */

// TODO: implement cosineSimilarity(vecA, vecB) and search(query, documents).
function cosineSimilarity(vecA, vecB) {
  return 0;
}

function search(query, documents) {
  return documents[0];
}

module.exports = { cosineSimilarity, search };
