/**
 * Quest 1.1: First AI Code Completion - Test Suite
 */

const factorial = require('./index.js');

const tests = [
  { input: 0, expected: 1, description: 'factorial(0) = 1' },
  { input: 1, expected: 1, description: 'factorial(1) = 1' },
  { input: 2, expected: 2, description: 'factorial(2) = 2' },
  { input: 3, expected: 6, description: 'factorial(3) = 6' },
  { input: 5, expected: 120, description: 'factorial(5) = 120' },
  { input: 10, expected: 3628800, description: 'factorial(10) = 3628800' },
];

let passed = 0;
let failed = 0;

console.log("Quest 1.1: First AI Code Completion\n");
console.log("Running tests...\n");

tests.forEach((test, index) => {
  try {
    const result = factorial(test.input);
    if (result === test.expected) {
      console.log(`✅ Test ${index + 1}: ${test.description}`);
      passed++;
    } else {
      console.log(`❌ Test ${index + 1}: ${test.description}`);
      console.log(`   Expected: ${test.expected}`);
      console.log(`   Got: ${result}`);
      failed++;
    }
  } catch (error) {
    console.log(`❌ Test ${index + 1}: ${test.description}`);
    console.log(`   Error: ${error.message}`);
    failed++;
  }
});

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log("\n🎉 Quest 1.1 Complete! You've written your first AI-assisted function.");
  process.exit(0);
} else {
  console.log("\n💡 Hint: Make sure your factorial function handles both base cases (0 and 1) and uses recursion for larger numbers.");
  process.exit(1);
}
