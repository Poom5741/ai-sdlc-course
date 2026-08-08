/**
 * Quest 2.1: Fix the Vague Prompt - Test Suite
 */

const createUser = require('./index.js');

const tests = [
  {
    description: 'Creates user with valid data',
    input: { name: 'Alice', email: 'alice@example.com' },
    expected: { success: true },
    checkFields: ['id', 'name', 'email'],
  },
  {
    description: 'Rejects invalid email',
    input: { name: 'Bob', email: 'invalid-email' },
    expected: { success: false },
    checkError: true,
  },
  {
    description: 'Rejects missing name',
    input: { email: 'test@example.com' },
    expected: { success: false },
    checkError: true,
  },
  {
    description: 'Rejects missing email',
    input: { name: 'Charlie' },
    expected: { success: false },
    checkError: true,
  },
];

let passed = 0;
let failed = 0;

console.log("Quest 2.1: Fix the Vague Prompt\n");
console.log("Running tests...\n");

tests.forEach((test, index) => {
  try {
    const result = createUser(test.input);
    
    if (result.success === test.expected.success) {
      if (test.checkFields) {
        const hasAllFields = test.checkFields.every(field => field in result);
        if (hasAllFields) {
          console.log(`✅ Test ${index + 1}: ${test.description}`);
          passed++;
        } else {
          console.log(`❌ Test ${index + 1}: ${test.description}`);
          console.log(`   Missing fields: ${test.checkFields.filter(f => !(f in result)).join(', ')}`);
          failed++;
        }
      } else if (test.checkError && result.error) {
        console.log(`✅ Test ${index + 1}: ${test.description}`);
        passed++;
      } else {
        console.log(`✅ Test ${index + 1}: ${test.description}`);
        passed++;
      }
    } else {
      console.log(`❌ Test ${index + 1}: ${test.description}`);
      console.log(`   Expected success: ${test.expected.success}`);
      console.log(`   Got success: ${result.success}`);
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
  console.log("\n🎉 Quest 2.1 Complete! You've learned to write specific prompts.");
  process.exit(0);
} else {
  console.log("\n💡 Hint: A good prompt should specify: input format, validation rules, output structure, and error handling.");
  process.exit(1);
}
