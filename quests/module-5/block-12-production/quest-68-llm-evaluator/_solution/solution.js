/**
 * Quest 5.6: LLM Evaluator — REFERENCE solution (do NOT import or read during the exercise)
 */

function createEvaluator(criteria) {
  return function evaluate(output, scores) {
    const result = { scores: {}, weighted: 0, grade: 'F', flagged: false };

    for (const c of criteria) {
      result.scores[c.name] = scores[c.name] || 0;
    }

    const totalWeight = criteria.reduce((s, c) => s + c.weight, 0);
    if (totalWeight > 0) {
      result.weighted = criteria.reduce((s, c) => s + (result.scores[c.name] || 0) * c.weight, 0) / totalWeight;
    }

    // Detect suspicious uniform scoring (all 10s or all same score)
    const values = Object.values(result.scores);
    if (values.length >= 3 && values.every(v => v === values[0]) && values[0] >= 9) {
      result.flagged = true;
    }

    // Grade
    if (result.weighted >= 8) result.grade = 'A';
    else if (result.weighted > 7) result.grade = 'B';
    else if (result.weighted > 5.5) result.grade = 'C';
    else if (result.weighted > 4) result.grade = 'D';
    else result.grade = 'F';

    return result;
  };
}

module.exports = { createEvaluator };
