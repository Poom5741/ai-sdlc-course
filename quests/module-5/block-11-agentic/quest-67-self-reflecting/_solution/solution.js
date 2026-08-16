/**
 * Quest 5.5: Self-Reflecting Agent — REFERENCE solution (do NOT import or read during the exercise)
 */

function createSelfReflectingAgent(generateFn, evaluateFn) {
  function getConfidence(score) {
    if (score > 80) return 'high';
    if (score >= 50) return 'medium';
    return 'low';
  }

  function generate(task) {
    let output = generateFn(task);
    let score = evaluateFn(output);

    // Retry once if quality is low
    if (score < 60) {
      output = generateFn(task + ' (improved attempt)');
      score = evaluateFn(output);
    }

    const confidence = getConfidence(score);
    return {
      output,
      selfScore: score,
      confidence,
      needsHelp: confidence === 'low',
    };
  }

  return { generate };
}

module.exports = { createSelfReflectingAgent };
