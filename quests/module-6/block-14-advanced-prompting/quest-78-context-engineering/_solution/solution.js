/**
 * Quest 6.6: Context Engineering — REFERENCE solution (do NOT import or read during the exercise)
 */

function selectContext(query, documents, maxTokens) {
  // Sort by relevance (highest first), then by original order
  const sorted = [...documents].sort((a, b) => b.relevance - a.relevance);

  const selected = [];
  const dropped = [];
  let totalTokens = 0;

  for (const doc of sorted) {
    if (totalTokens + doc.tokens <= maxTokens) {
      selected.push({ id: doc.id, text: doc.text, tokens: doc.tokens });
      totalTokens += doc.tokens;
    } else {
      dropped.push(doc.id);
    }
  }

  // Re-sort selected by original document order
  selected.sort((a, b) => documents.findIndex(d => d.id === a.id) - documents.findIndex(d => d.id === b.id));

  return { selected, totalTokens, dropped };
}

module.exports = { selectContext };
