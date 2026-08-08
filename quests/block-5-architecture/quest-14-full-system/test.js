/**
 * Quest 5.2: Full System Design - Test Suite
 */

const {
  AISystem,
  ChatbotSystem,
  CodeReviewSystem,
} = require('./index.js');

let passed = 0;
let failed = 0;

console.log("Quest 5.2: Full System Design\n");
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
  // AISystem tests
  test('AISystem can be instantiated', () => {
    const system = new AISystem('Test System', 'test');
    assert(system instanceof AISystem);
    assert(system.name === 'Test System');
    assert(system.type === 'test');
  });

  test('AISystem has addComponent method', () => {
    const system = new AISystem('Test System', 'test');
    assert(typeof system.addComponent === 'function');
  });

  test('AISystem has process method', () => {
    const system = new AISystem('Test System', 'test');
    assert(typeof system.process === 'function');
  });

  test('AISystem has getStatus method', () => {
    const system = new AISystem('Test System', 'test');
    assert(typeof system.getStatus === 'function');
  });

  test('AISystem has toDocumentation method', () => {
    const system = new AISystem('Test System', 'test');
    assert(typeof system.toDocumentation === 'function');
  });

  // ChatbotSystem tests
  test('ChatbotSystem extends AISystem', () => {
    const chatbot = new ChatbotSystem();
    assert(chatbot instanceof AISystem);
    assert(chatbot.type === 'chatbot');
  });

  test('ChatbotSystem has chat method', () => {
    const chatbot = new ChatbotSystem();
    assert(typeof chatbot.chat === 'function');
  });

  // CodeReviewSystem tests
  test('CodeReviewSystem extends AISystem', () => {
    const reviewer = new CodeReviewSystem();
    assert(reviewer instanceof AISystem);
    assert(reviewer.type === 'code-review');
  });

  test('CodeReviewSystem has review method', () => {
    const reviewer = new CodeReviewSystem();
    assert(typeof reviewer.review === 'function');
  });

  console.log(`\nResults: ${passed} passed, ${failed} failed`);

  if (failed === 0) {
    console.log("\n🎉 Quest 5.2 Complete! You've designed a full AI system.");
    process.exit(0);
  } else {
    console.log("\n💡 Hint: A complete system needs components, interfaces, and documentation.");
    process.exit(1);
  }
}

runTests();
