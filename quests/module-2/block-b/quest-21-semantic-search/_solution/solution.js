/**
 * Quest 2.9: Semantic Search Builder — REFERENCE solution
 */
function cosineSimilarity(vecA, vecB) {
  const dot = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  if (magA === 0 || magB === 0) return 0;
  return dot / (magA * magB);
}

function search(query, documents) {
  let bestScore = -Infinity;
  let bestDoc = documents[0];
  
  for (const doc of documents) {
    const score = cosineSimilarity(query.embedding, doc.embedding);
    if (score > bestScore) {
      bestScore = score;
      bestDoc = doc;
    }
  }
  
  return bestDoc;
}

module.exports = { cosineSimilarity, search };
