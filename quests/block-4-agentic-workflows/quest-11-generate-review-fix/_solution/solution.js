/**
 * Quest 4.2: REFERENCE solution (do NOT read during the exercise)
 *
 * runGenerateOnly: generate once, score, return.
 *
 * runGrfLoop: generate → [review → fix] until issues==0 or budget exhausted.
 * Generation is separated from review: the reviewer and fixer are distinct
 * roles passed by the caller, and the orchestrator genuinely calls them.
 */

function runGenerateOnly({ generator, qualityTest, seed }) {
  const draft = generator(seed);
  return { finalScore: qualityTest(draft), draft, iterations: 1 };
}

function runGrfLoop({ generator, reviewer, fixer, qualityTest, maxIterations, seed }) {
  let draft = generator(seed);
  let iterations = 0;

  if (typeof maxIterations !== 'number' || maxIterations < 1) {
    // Budget too small to run review/fix — return generator's raw draft.
    return { finalScore: qualityTest(draft), draft, iterations: 0 };
  }

  for (let i = 1; i <= maxIterations; i++) {
    const issues = reviewer(draft) || [];
    if (issues.length === 0) break;
    draft = fixer(draft, issues);
    iterations = i;
  }

  return { finalScore: qualityTest(draft), draft, iterations };
}

module.exports = { runGrfLoop, runGenerateOnly };