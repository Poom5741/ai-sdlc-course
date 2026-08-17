/**
 * Quest 1.1: First AI Code Completion — test suite
 *
 * Requires ./problem.js (the learner's work), never ./index.js or
 * ./_solution/solution.js.
 *
 * Run: node test.js
 */

const factorial = require('./problem.js');

const cases = [
  { input: 0, expected: 1, description: 'factorial(0) = 1' },
  { input: 1, expected: 1, description: 'factorial(1) = 1' },
  { input: 2, expected: 2, description: 'factorial(2) = 2' },
  { input: 3, expected: 6, description: 'factorial(3) = 6' },
  { input: 5, expected: 120, description: 'factorial(5) = 120' },
  { input: 10, expected: 3628800, description: 'factorial(10) = 3628800' },
];

let passed = 0;
let failed = 0;

console.log('Quest 1.1: First AI Code Completion\n');

cases.forEach((test, index) => {
  try {
    const result = factorial(test.input);
    if (result === test.expected) {
      console.log(`PASS Test ${index + 1}: ${test.description}`);
      passed++;
    } else {
      console.log(`FAIL Test ${ index + 1 }: ${test.description}`);
      console.log(`   Expected: ${test.expected}`);
      console.log(`   Got: ${result}`);
      failed++;
    }
  } catch (error) {
    console.log(`FAIL Test ${index + 1}: ${test.description}`);
    console.log(`   Error: ${error.message}`);
    failed++;
  }
});

// Edge case: negative input. The naive AI suggestion `if (n <= 1) return 1`
// silently returns 1 for factorial(-1) — which is wrong. The correct function
// must reject negatives (throw). This is the "verify before trust" lesson.
try {
  const got = factorial(-1);
  console.log(`FAIL Test ${cases.length + 1}: factorial(-1) must throw on negative input`);
  console.log(`   Expected: throw`);
  console.log(`   Got: ${got}`);
  failed++;
} catch (error) {
  console.log(`PASS Test ${cases.length + 1}: factorial(-1) throws on negative input`);
  passed++;
}

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 1.1 complete. You verified AI output before trusting it.');
  process.exit(0);
}
console.log('\nHint: check the negative-input edge case. Naive AI output gets it wrong.');
process.exit(1);