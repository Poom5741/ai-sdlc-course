/**
 * Quest 2.10: Hallucination Prevention System — REFERENCE solution
 */
function preventHallucination(prompt, context, options = {}) {
  const { temperature = 0.7, requireCitation = false, confidenceThreshold = 0.5 } = options;
  const warnings = [];
  let enhancedPrompt = prompt;

  // Strategy 1: Temperature check
  if (temperature > 0.7) {
    warnings.push(`High temperature (${temperature}) increases hallucination risk. Consider reducing to 0.3-0.5.`);
  }

  // Strategy 2: Context quality check
  if (context.length === 0) {
    warnings.push('No context provided. Response may be purely hallucinated.');
  } else if (context.length < 2) {
    warnings.push('Sparse context. Consider retrieving more documents for grounding.');
  }

  // Strategy 3: Context injection
  if (context.length > 0) {
    enhancedPrompt = `Based ONLY on the following context, answer the question.\n\nContext:\n${context.map((c, i) => `[${i+1}] ${c}`).join('\n')}\n\nQuestion: ${prompt}\n\nIf the context doesn't contain enough information, say "I don't have enough information to answer this."`;
  }

  // Strategy 4: Citation requirement
  if (requireCitation) {
    enhancedPrompt += '\n\nCite your sources using [1], [2], etc. references from the context above.';
  }

  // Confidence check
  const safe = context.length > 0 && temperature <= 0.7;

  return { safe, warnings, enhancedPrompt };
}
module.exports = { preventHallucination };
