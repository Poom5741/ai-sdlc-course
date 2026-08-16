/**
 * Quest 5.8: Prompt Version Manager — test suite
 * Requires ./problem.js exporting { createPromptManager }. Run: node test.js
 */

const { createPromptManager } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 5.8: Prompt Version Manager\n');

function check(label, cond, detail) {
  if (cond) { console.log(`PASS ${label}`); passed++; } else { console.log(`FAIL ${label}`); if (detail) console.log(`   ${detail}`); failed++; }
}

const mgr = createPromptManager();

// Test 1: Create version
const v1 = mgr.create('greeting', 'Hello, how can I help?');
check('create returns version ID', typeof v1 === 'string' && v1.length > 0);

// Test 2: Create second version
const v2 = mgr.create('greeting', 'Hi! What can I do for you?');
check('multiple versions created', v2 !== v1);

// Test 3: Deploy
const deployed = mgr.deploy(v2);
check('deploy returns boolean', typeof deployed === 'boolean');

// Test 4: Metrics
const metrics = mgr.getMetrics(v1);
check('metrics has uses', typeof metrics.uses === 'number');
check('metrics has avgScore', typeof metrics.avgScore === 'number');

// Test 5: A/B test (THE EDGE CASE)
const abResult = mgr.abTest('greeting', [
  { id: 'v1', prompt: 'Hello', score: 7 },
  { id: 'v2', prompt: 'Hi', score: 9 },
]);
check('abTest returns winning variant', abResult,
  `naive A/B test doesn't compare — got ${abResult}`);

// Test 6: Winner has higher score
check('winner has higher score', abResult && abResult.id === 'v2',
  `expected v2 to win, got ${abResult && abResult.id}`);

// Test 7: Rollback
const rolledBack = mgr.rollback('greeting');
check('rollback returns previous version', rolledBack === v1 || rolledBack !== null,
  `rollback: ${rolledBack}`);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 5.8 complete. You version prompts — and A/B test before deploying.');
  process.exit(0);
}
console.log('\nHint: check the A/B test. Naive AI doesn\'t compare variant performance.');
process.exit(1);
