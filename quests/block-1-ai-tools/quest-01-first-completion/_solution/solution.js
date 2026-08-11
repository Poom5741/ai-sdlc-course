/**
 * Quest 1.1: REFERENCE solution (do NOT import or read during the exercise)
 *
 * One correct way to implement factorial(n) with the negative-input guard.
 * The learner may peek here only when stuck; the AI may not.
 */

function factorial(n) {
  if (n < 0) {
    throw new RangeError(`factorial is undefined for negative numbers: ${n}`);
  }
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

module.exports = factorial;