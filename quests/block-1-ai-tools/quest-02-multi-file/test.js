/**
 * Quest 1.2: Multi-file Generation - Test Suite
 */

const calculator = require('./index.js');

const tests = [
  { 
    operation: 'add', 
    args: [2, 3], 
    expected: 5, 
    description: 'add(2, 3) = 5' 
  },
  { 
    operation: 'subtract', 
    args: [10, 4], 
    expected: 6, 
    description: 'subtract(10, 4) = 6' 
  },
  { 
    operation: 'multiply', 
    args: [6, 7], 
    expected: 42, 
    description: 'multiply(6, 7) = 42' 
  },
  { 
    operation: 'divide', 
    args: [15, 3], 
    expected: 5, 
    description: 'divide(15, 3) = 5' 
  },
  { 
    operation: 'divide', 
    args: [10, 0], 
    expected: Infinity, 
    description: 'divide(10, 0) = Infinity' 
  },
];

let passed = 0;
let failed = 0;

console.log("Quest 1.2: Multi-file Generation\n");
console.log("Running tests...\n");

tests.forEach((test, index) => {
  try {
    const result = calculator[test.operation](...test.args);
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

// Test calculate method
try {
  const result = calculator.calculate('add', 5, 5);
  if (result === 10) {
    console.log(`✅ Test 6: calculate('add', 5, 5) = 10`);
    passed++;
  } else {
    console.log(`❌ Test 6: calculate('add', 5, 5) = 10`);
    console.log(`   Got: ${result}`);
    failed++;
  }
} catch (error) {
  console.log(`❌ Test 6: calculate('add', 5, 5) = 10`);
  console.log(`   Error: ${error.message}`);
  failed++;
}

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log("\n🎉 Quest 1.2 Complete! You've created a multi-file utility library.");
  process.exit(0);
} else {
  console.log("\n💡 Hint: Make sure you create separate files for math.js and validators.js, then import them in index.js.");
  process.exit(1);
}
