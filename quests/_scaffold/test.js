/**
 * Quest scaffold — test.js
 *
 * Requires ./problem.js (the learner's work), never ./_solution/solution.js.
 * Run with: node test.js
 */

const { solve } = require('./problem.js');

const tests = [
  { input: 'example', expected: 'example', description: 'scaffold example passes through' },
];

let passed = 0;
let failed = 0;

console.log('Quest scaffold: test suite\n');

tests.forEach((test, index) => {
  const result = solve(test.input);
  if (result === test.expected) {
    console.log(`PASS Test ${index + 1}: ${test.description}`);
    passed++;
  } else {
    console.log(`FAIL Test ${index + 1}: ${test.description}`);
    console.log(`   Expected: ${JSON.stringify(test.expected)}`);
    console.log(`   Got: ${JSON.stringify(result)}`);
    failed++;
  }
});

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nScaffold OK.');
  process.exit(0);
}
process.exit(1);