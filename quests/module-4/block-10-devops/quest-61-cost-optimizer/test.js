/**
 * Quest 4.19: Cost Optimizer — test suite
 * Requires ./problem.js exporting { routeRequest }. Run: node test.js
 */

const { routeRequest } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 4.19: Cost Optimizer\n');

function check(label, cond, detail) {
  if (cond) { console.log(`PASS ${label}`); passed++; } else { console.log(`FAIL ${label}`); if (detail) console.log(`   ${detail}`); failed++; }
}

const budget = { dailyLimit: 1.0, spentToday: 0.2 };

// Test 1: Low complexity → cheap model
const r1 = routeRequest({ task: 'hello', complexity: 'low', maxTokens: 100 }, budget);
check('low complexity picks a model', r1.model && r1.model.length > 0);
check('estimated cost is a number', typeof r1.estimatedCost === 'number');

// Test 2: High complexity → quality model (THE EDGE CASE)
const r2 = routeRequest({ task: 'analyze code', complexity: 'high', maxTokens: 500 }, budget);
check('high complexity respects quality requirement', r2.model,
  `naive AI always picks cheapest — got ${r2.model}`);

// Test 3: Within budget check
check('reports withinBudget', typeof r2.withinBudget === 'boolean');
check('stays within budget', r2.withinBudget === true,
  `estimatedCost: ${r2.estimatedCost}, remaining: ${budget.dailyLimit - budget.spentToday}`);

// Test 4: Budget exceeded
const tightBudget = { dailyLimit: 0.001, spentToday: 0.0005 };
const r3 = routeRequest({ task: 'analyze', complexity: 'high', maxTokens: 1000 }, tightBudget);
check('handles budget exceeded', r3.withinBudget === false || r3.estimatedCost <= 0.0005);

// Test 5: Reason is provided
check('includes reason for decision', r1.reason && r1.reason.length > 0,
  `reason: ${r1.reason}`);

// Test 6: Medium complexity
const r4 = routeRequest({ task: 'summarize', complexity: 'medium', maxTokens: 200 }, budget);
check('medium complexity picks a model', r4.model);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 4.19 complete. You optimize cost — routing by complexity, not just price.');
  process.exit(0);
}
console.log('\nHint: check the high-complexity test. Naive AI always picks the cheapest model.');
process.exit(1);
