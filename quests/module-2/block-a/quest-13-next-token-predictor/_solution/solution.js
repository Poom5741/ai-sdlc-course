/**
 * Quest 2.1: Next Token Predictor — REFERENCE solution
 */

function predictNext(context, trainingData) {
  const words = trainingData.toLowerCase().split(/\s+/).filter(w => w.length > 0);
  if (words.length === 0) return '';

  // Count word frequencies for fallback
  const wordFreq = {};
  for (const w of words) {
    wordFreq[w] = (wordFreq[w] || 0) + 1;
  }
  const mostCommon = Object.entries(wordFreq).sort((a, b) => b[1] - a[1])[0][0];

  if (!context || context.trim() === '') return mostCommon;

  const contextWords = context.toLowerCase().split(/\s+/).filter(w => w.length > 0);
  const contextLen = contextWords.length;

  // Find occurrences of context and count next words
  const nextWordFreq = {};
  for (let i = 0; i <= words.length - contextLen; i++) {
    const slice = words.slice(i, i + contextLen);
    if (slice.every((w, j) => w === contextWords[j])) {
      if (i + contextLen < words.length) {
        const next = words[i + contextLen];
        nextWordFreq[next] = (nextWordFreq[next] || 0) + 1;
      }
    }
  }

  if (Object.keys(nextWordFreq).length === 0) return mostCommon;

  return Object.entries(nextWordFreq).sort((a, b) => b[1] - a[1])[0][0];
}

module.exports = { predictNext };
