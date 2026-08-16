/**
 * Quest 5.7: Semantic Cache Builder — REFERENCE solution (do NOT import or read during the exercise)
 */

function cosineSimilarity(a, b) {
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  return Math.sqrt(magA) && Math.sqrt(magB) ? dot / (Math.sqrt(magA) * Math.sqrt(magB)) : 0;
}

function createSemanticCache(threshold = 0.85) {
  const entries = [];
  let hits = 0;
  let misses = 0;

  function get(query, embedding) {
    let bestMatch = null;
    let bestSim = 0;

    for (const entry of entries) {
      const sim = cosineSimilarity(embedding, entry.embedding);
      if (sim > bestSim) {
        bestSim = sim;
        bestMatch = entry;
      }
    }

    if (bestMatch && bestSim >= threshold) {
      hits++;
      return bestMatch.response;
    }
    misses++;
    return null;
  }

  function set(query, response, embedding) {
    entries.push({ query, response, embedding });
  }

  function stats() {
    return { hits, misses, size: entries.length };
  }

  return { get, set, stats };
}

module.exports = { createSemanticCache };
