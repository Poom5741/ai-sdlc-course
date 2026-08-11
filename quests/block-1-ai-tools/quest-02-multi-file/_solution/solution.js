/**
 * Quest 1.2: REFERENCE solution (do NOT import or read during the exercise)
 *
 * One correct multi-file utility library. The learner may peek here only when
 * stuck; the AI may not.
 */

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
  if (b === 0) return Infinity;
  return a / b;
}

function calculate(op, a, b) {
  const ops = { add, subtract, multiply, divide };
  if (typeof ops[op] !== 'function') {
    throw new Error(`Unknown operation: ${op}`);
  }
  return ops[op](a, b);
}

module.exports = { add, subtract, multiply, divide, calculate };