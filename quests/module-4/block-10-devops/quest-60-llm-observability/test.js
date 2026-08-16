/**
 * Quest 4.18: LLM Observability System — test suite
 * Requires ./problem.js exporting { createTracer }. Run: node test.js
 */

const { createTracer } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 4.18: LLM Observability System\n');

function check(label, cond, detail) {
  if (cond) { console.log(`PASS ${label}`); passed++; } else { console.log(`FAIL ${label}`); if (detail) console.log(`   ${detail}`); failed++; }
}

const tracer = createTracer();

const id1 = tracer.trace({ model: 'gpt-4', prompt: 'Hello', response: 'Hi there', tokens: { input: 10, output: 20 }, latency: 150 });
const id2 = tracer.trace({ model: 'gpt-4', prompt: 'Explain', response: 'Long response', tokens: { input: 50, output: 200 }, latency: 800 });
const id3 = tracer.trace({ model: 'gpt-3.5', prompt: 'Quick', response: 'Short', tokens: { input: 5, output: 10 }, latency: 50 });

// Test 1: trace returns ID
check('trace returns a string ID', typeof id1 === 'string' && id1.length > 0);

// Test 2: getTrace returns full trace
const trace = tracer.getTrace(id1);
check('getTrace returns trace object', trace && trace.model === 'gpt-4');

// Test 3: Metrics
const metrics = tracer.getMetrics();
check('totalCalls is 3', metrics.totalCalls === 3);
check('totalTokens calculated', metrics.totalTokens > 0);

// Test 4: Cost calculation (THE EDGE CASE)
check('totalCost is calculated (not just token count)',
  metrics.totalCost > 0,
  `naive AI tracks tokens but not cost — cost: ${metrics.totalCost}`);

// GPT-4 cost: input (10+50)/1000*0.003 + output (20+200)/1000*0.006 = 0.00018 + 0.00132 = 0.0015
check('cost is approximately correct', metrics.totalCost >= 0.001 && metrics.totalCost <= 0.002,
  `expected ~0.0015, got ${metrics.totalCost}`);

// Test 5: By-model breakdown
check('byModel has gpt-4', metrics.byModel['gpt-4'] !== undefined);
check('byModel has gpt-3.5', metrics.byModel['gpt-3.5'] !== undefined);

// Test 6: Slow queries
const slow = tracer.getSlowQueries(500);
check('finds slow queries', slow.length >= 1);
check('slow query has correct id', slow.some(t => t.id === id2));

// Test 7: avgLatency
check('avgLatency is calculated', metrics.avgLatency > 0, `avgLatency: ${metrics.avgLatency}`);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 4.18 complete. You observe LLMs — tracking COST, not just tokens.');
  process.exit(0);
}
console.log('\nHint: check the cost calculation. Naive AI sums tokens but ignores dollar cost.');
process.exit(1);
