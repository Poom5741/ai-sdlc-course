/**
 * Quest 1.3: Compare Tools - Test Suite
 */

const sortByKey = require('./index.js');

const testData = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 20 },
  { name: 'Diana', age: 35 },
];

const tests = [
  {
    description: 'Sort by age ascending',
    input: { array: [...testData], key: 'age', ascending: true },
    expected: [
      { name: 'Charlie', age: 20 },
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 30 },
      { name: 'Diana', age: 35 },
    ],
  },
  {
    description: 'Sort by age descending',
    input: { array: [...testData], key: 'age', ascending: false },
    expected: [
      { name: 'Diana', age: 35 },
      { name: 'Bob', age: 30 },
      { name: 'Alice', age: 25 },
      { name: 'Charlie', age: 20 },
    ],
  },
  {
    description: 'Sort by name ascending',
    input: { array: [...testData], key: 'name', ascending: true },
    expected: [
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 30 },
      { name: 'Charlie', age: 20 },
      { name: 'Diana', age: 35 },
    ],
  },
  {
    description: 'Sort empty array',
    input: { array: [], key: 'age' },
    expected: [],
  },
  {
    description: 'Returns new array (not mutated)',
    input: { array: [...testData], key: 'age' },
    checkMutated: true,
  },
];

let passed = 0;
let failed = 0;

console.log("Quest 1.3: Compare Tools\n");
console.log("Running tests...\n");

tests.forEach((test, index) => {
  try {
    const result = sortByKey(
      test.input.array,
      test.input.key,
      test.input.ascending
    );
    
    if (test.checkMutated) {
      // Check that original array wasn't mutated
      if (JSON.stringify(result) !== JSON.stringify(testData)) {
        console.log(`✅ Test ${index + 1}: ${test.description}`);
        passed++;
      } else {
        console.log(`❌ Test ${index + 1}: ${test.description}`);
        console.log(`   Array was mutated!`);
        failed++;
      }
    } else if (JSON.stringify(result) === JSON.stringify(test.expected)) {
      console.log(`✅ Test ${index + 1}: ${test.description}`);
      passed++;
    } else {
      console.log(`❌ Test ${index + 1}: ${test.description}`);
      console.log(`   Expected:`, test.expected);
      console.log(`   Got:`, result);
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
  console.log("\n🎉 Quest 1.3 Complete! You've compared different AI tools.");
  process.exit(0);
} else {
  console.log("\n💡 Hint: Make sure your function creates a new array and doesn't modify the original.");
  process.exit(1);
}
