/**
 * Quest 5.1: Agent Loop Builder — REFERENCE solution (do NOT import or read during the exercise)
 */

function agentLoop(generator, reviewer, maxIterations = 5) {
  const history = [];
  let result = null;
  let iterations = 0;

  for (let i = 0; i < maxIterations; i++) {
    iterations++;
    result = generator(i === 0 ? 'initial' : history[i - 1].feedback);
    const review = reviewer(result);

    history.push({
      iteration: i + 1,
      draft: result,
      approved: review.approved,
      feedback: review.feedback,
    });

    if (review.approved) break;
  }

  return { result, iterations, history };
}

module.exports = { agentLoop };
