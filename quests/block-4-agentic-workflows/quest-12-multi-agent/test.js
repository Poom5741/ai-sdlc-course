/**
 * Quest 4.3: Multi-Agent Pipeline - Test Suite
 */

const {
  Agent,
  PlannerAgent,
  CoderAgent,
  ReviewerAgent,
  TesterAgent,
  Pipeline,
} = require('./index.js');

let passed = 0;
let failed = 0;

console.log("Quest 4.3: Multi-Agent Pipeline\n");
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
  // Agent tests
  test('Agent base class exists', () => {
    assert(typeof Agent === 'function');
  });

  test('PlannerAgent extends Agent', () => {
    const planner = new PlannerAgent();
    assert(planner instanceof Agent);
    assert(planner.name === 'Planner');
  });

  test('CoderAgent extends Agent', () => {
    const coder = new CoderAgent();
    assert(coder instanceof Agent);
    assert(coder.name === 'Coder');
  });

  test('ReviewerAgent extends Agent', () => {
    const reviewer = new ReviewerAgent();
    assert(reviewer instanceof Agent);
    assert(reviewer.name === 'Reviewer');
  });

  test('TesterAgent extends Agent', () => {
    const tester = new TesterAgent();
    assert(tester instanceof Agent);
    assert(tester.name === 'Tester');
  });

  // Pipeline tests
  test('Pipeline can be instantiated', () => {
    const pipeline = new Pipeline();
    assert(pipeline instanceof Pipeline);
  });

  test('Pipeline can add agents', () => {
    const pipeline = new Pipeline();
    const planner = new PlannerAgent();
    pipeline.addAgent(planner);
    assert(pipeline.agents.length === 1);
  });

  test('Pipeline has execute method', () => {
    const pipeline = new Pipeline();
    assert(typeof pipeline.execute === 'function');
  });

  test('Pipeline execute returns result', async () => {
    const pipeline = new Pipeline();
    pipeline.addAgent(new PlannerAgent());
    pipeline.addAgent(new CoderAgent());
    pipeline.addAgent(new ReviewerAgent());
    pipeline.addAgent(new TesterAgent());
    
    const result = await pipeline.execute('test task');
    assert(typeof result.success === 'boolean');
    assert(Array.isArray(result.results));
  });

  console.log(`\nResults: ${passed} passed, ${failed} failed`);

  if (failed === 0) {
    console.log("\n🎉 Quest 4.3 Complete! You've created a multi-agent pipeline.");
    process.exit(0);
  } else {
    console.log("\n💡 Hint: The pipeline orchestrates multiple specialized agents working together.");
    process.exit(1);
  }
}

runTests();
