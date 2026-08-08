/**
 * Quest 4.2: Generate-Review-Fix Loop - Test Suite
 */

const GRFLoop = require('./index.js');

let passed = 0;
let failed = 0;

console.log("Quest 4.2: Generate-Review-Fix Loop\n");
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
  const loop = new GRFLoop();

  test('GRFLoop can be instantiated', () => {
    assert(loop instanceof GRFLoop);
  });

  test('generate method exists', () => {
    assert(typeof loop.generate === 'function');
  });

  test('review method exists', () => {
    assert(typeof loop.review === 'function');
  });

  test('fix method exists', () => {
    assert(typeof loop.fix === 'function');
  });

  test('qualityCheck method exists', () => {
    assert(typeof loop.qualityCheck === 'function');
  });

  test('run method exists', () => {
    assert(typeof loop.run === 'function');
  });

  test('generate returns code object', async () => {
    const result = await loop.generate('test task');
    assert(typeof result.code === 'string');
    assert(result.task === 'test task');
  });

  test('review returns issues array', async () => {
    const result = await loop.review('test code');
    assert(Array.isArray(result.issues));
    assert(typeof result.score === 'number');
  });

  test('qualityCheck returns quality result', async () => {
    const result = await loop.qualityCheck('test code');
    assert(typeof result.passed === 'boolean');
    assert(typeof result.score === 'number');
    assert(Array.isArray(result.suggestions));
  });

  test('run returns final result', async () => {
    const result = await loop.run('test task');
    assert(typeof result.success === 'boolean');
    assert(typeof result.iterations === 'number');
    assert(typeof result.finalCode === 'string');
  });

  console.log(`\nResults: ${passed} passed, ${failed} failed`);

  if (failed === 0) {
    console.log("\n🎉 Quest 4.2 Complete! You've created a Generate-Review-Fix loop.");
    process.exit(0);
  } else {
    console.log("\n💡 Hint: The GRF loop generates code, reviews it for issues, and fixes problems iteratively.");
    process.exit(1);
  }
}

runTests();
