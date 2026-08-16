/**
 * Quest 20.4: Multimodal RAG System — REFERENCE solution
 */

function multimodalRAG(documents, query) {
  if (!documents || documents.length === 0) return [];

  const queryWords = query.toLowerCase().split(/\s+/);
  const results = [];

  for (const doc of documents) {
    let score = 0;
    let reason = '';

    switch (doc.type) {
      case 'text': {
        const textWords = doc.content.toLowerCase().split(/\s+/);
        const overlap = queryWords.filter(w => textWords.includes(w)).length;
        score = overlap / Math.max(queryWords.length, 1);
        reason = `Text keyword overlap: ${overlap}/${queryWords.length}`;
        break;
      }
      case 'image': {
        const metaText = [doc.metadata?.alt, ...(doc.metadata?.tags || [])].join(' ').toLowerCase();
        const imgWords = metaText.split(/\s+/);
        const overlap = queryWords.filter(w => imgWords.includes(w)).length;
        // Boost image score for visual queries
        const visualBoost = /\b(show|see|look|image|photo|picture|sunset|mountain)\b/i.test(query) ? 1.5 : 1;
        score = (overlap / Math.max(queryWords.length, 1)) * visualBoost;
        reason = `Image metadata match: ${overlap}/${queryWords.length}`;
        break;
      }
      case 'table': {
        const colText = (doc.metadata?.columns || []).join(' ').toLowerCase();
        const colWords = colText.split(/\s+/);
        const overlap = queryWords.filter(w => colWords.includes(w)).length;
        score = overlap / Math.max(queryWords.length, 1);
        reason = `Table column match: ${overlap}/${queryWords.length}`;
        break;
      }
    }

    results.push({ id: doc.id, type: doc.type, score: Math.round(score * 100) / 100, reason });
  }

  return results.sort((a, b) => b.score - a.score);
}

module.exports = { multimodalRAG };
