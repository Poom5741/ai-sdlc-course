/**
 * Quest 6.9: Prompt Evaluation Framework — REFERENCE solution (do NOT import or read during the exercise)
 */

function createPromptEvaluator(testCases) {
  function evaluate(promptFn) {
    let totalScore = 0;
    let passed = 0;
    let failed = 0;
    const details = [];

    for (const tc of testCases) {
      const output = promptFn(tc.input);
      let score = 100;
      const penalties = [];

      // Check required contains
      for (const word of (tc.expectedContains || [])) {
        if (!output.toLowerCase().includes(word.toLowerCase())) {
          score -= 20;
          penalties.push(`Missing: ${word}`);
        }
      }

      // Check forbidden contains (THE EDGE CASE)
      for (const word of (tc.expectedNotContains || [])) {
        if (output.toLowerCase().includes(word.toLowerCase())) {
          score -= 30;
          penalties.push(`Forbidden: ${word}`);
        }
      }

      score = Math.max(0, Math.min(100, score));
      totalScore += score;

      if (score >= 80) passed++; else failed++;

      details.push({ input: tc.input, score, penalties, penalty: penalties.length > 0, output: output.slice(0, 100) });
    }

    return {
      score: testCases.length > 0 ? Math.round(totalScore / testCases.length) : 0,
      passed,
      failed,
      details,
    };
  }

  return { evaluate };
}

module.exports = { createPromptEvaluator };
