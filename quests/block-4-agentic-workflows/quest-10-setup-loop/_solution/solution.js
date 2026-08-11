/**
 * Quest 4.1: REFERENCE solution (do NOT read during the exercise)
 *
 * generate(iteration): returns the correct answer (42) from iteration 3
 * onwards; a wrong value (iteration * 10) for iterations 1 and 2 — simulating
 * a tool that needs a few retries before producing correct output.
 *
 * verify(draft): deterministic check — the answer must be exactly 42.
 *
 * runLoop({ maxIterations }): for i = 1..maxIterations, generate(i) then
 * verify; stop as soon as verify passes. Reject maxIterations < 1 by
 * returning { converged:false, iterations:0 } (no crash).
 */

const TARGET = 42;

function generate(iteration) {
  if (typeof iteration !== 'number' || iteration < 1) return 0;
  if (iteration >= 3) return TARGET;
  return iteration * 10; // wrong for iterations 1 and 2
}

function verify(draft) {
  return draft === TARGET;
}

function runLoop({ maxIterations } = {}) {
  if (typeof maxIterations !== 'number' || maxIterations < 1) {
    return { converged: false, iterations: 0 };
  }
  for (let i = 1; i <= maxIterations; i++) {
    const draft = generate(i);
    if (verify(draft)) {
      return { converged: true, iterations: i };
    }
  }
  return { converged: false, iterations: maxIterations };
}

module.exports = { runLoop, generate };