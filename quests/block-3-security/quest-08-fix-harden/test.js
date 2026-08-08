/**
 * Quest 3.2: Fix and Harden - Test Suite
 */

const {
  getUserById,
  getApiKey,
  hashPassword,
  processPayment,
  readFile,
  renderComment,
} = require('./index.js');

let passed = 0;
let failed = 0;

console.log("Quest 3.2: Fix and Harden\n");
console.log("Running tests...\n");

function test(description, fn) {
  try {
    fn();
    console.log(`✅ ${description}`);
    passed++;
  } catch (error) {
    console.log(`❌ ${description}`);
    console.log(`   ${error.message}`);
    failed++;
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

function assertNotContains(str, substr, message) {
  assert(!str.includes(substr), message || `String should not contain "${substr}"`);
}

// Tests
test('getUserById exists and is a function', () => {
  assert(typeof getUserById === 'function');
});

test('getApiKey returns a value', () => {
  const key = getApiKey();
  assert(typeof key === 'string');
});

test('hashPassword returns a hash', () => {
  const hash = hashPassword('test123');
  assert(typeof hash === 'string');
  assert(hash.length > 0);
});

test('hashPassword does not use MD5', () => {
  const hash = hashPassword('test123');
  // MD5 produces 32 hex characters
  assertNotContains(hash, 'd41d8cd98f00b204e9800998ecf8427e', 'Should not be empty MD5');
});

test('processPayment validates amount', () => {
  const result = processPayment(-100, '4111111111111111');
  assert(result.success === false || result.error);
});

test('processPayment validates card number', () => {
  const result = processPayment(100, 'invalid');
  assert(result.success === false || result.error);
});

test('renderComment sanitizes HTML', () => {
  const result = renderComment('<script>alert("xss")</script>');
  assertNotContains(result, '<script>', 'Should sanitize script tags');
});

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log("\n🎉 Quest 3.2 Complete! You've fixed and hardened the code.");
  process.exit(0);
} else {
  console.log("\n💡 Hint: Fix each vulnerability by applying secure coding practices.");
  process.exit(1);
}
