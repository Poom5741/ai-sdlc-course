/**
 * Quest 4.1: Set Up a Loop - Test Suite
 */

const PIVLoop = require('./index.js');

let passed = 0;
let failed = 0;

console.log("Quest 4.1: Set Up a Loop\n");
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

async function runTests() {
  const loop = new PIVLoop();

  test('PIVLoop can be instantiated', () => {
    assert(loop instanceof PIVLoop);
  });

  test('plan method exists', () => {
    assert(typeof loop.plan === 'function');
  });

  test('implement method exists', () => {
    assert(typeof loop.implement === 'function');
  });

  test('validate method exists', () => {
    assert(typeof loop.validate === 'function');
  });

  test('execute method exists', () => {
    assert(typeof loop.execute === 'function');
  });

  test('plan returns plan object', async () => {
    const plan = await loop.plan('test task');
    assert(plan.task === 'test task');
    assert(Array.isArray(plan.steps));
  });

  test('validate returns validation result', async () => {
    const result = await loop.validate({});
    assert(typeof result.valid === 'boolean');
    assert(Array.isArray(result.errors));
  });

  test('execute returns result', async () => {
    const result = await loop.execute('test task', 1);
    assert(typeof result.success === 'boolean');
    assert(typeof result.iterations === 'number');
  });

  console.log(`\nResults: ${passed} passed, ${failed} failed`);

  if (failed === 0) {
    console.log("\n🎉 Quest 4.1 Complete! You've set up a PIV loop.");
    process.exit(0);
  } else {
    console.log("\n💡 Hint: The PIV loop has three phases: Plan, Implement, Validate.");
    process.exit(1);
  }
}

runTests();
