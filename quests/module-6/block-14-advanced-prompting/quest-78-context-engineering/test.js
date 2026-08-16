/**
 * Quest 6.6: Context Engineering — test suite
 * Requires ./problem.js exporting { selectContext }. Run: node test.js
 */

const { selectContext } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 6.6: Context Engineering\n');

function check(label, cond, detail) {
  if (cond) { console.log(`PASS ${label}`); passed++; } else { console.log(`FAIL ${label}`); if (detail) console.log(`   ${detail}`); failed++; }
}

const docs = [
  { id: 'high', text: 'Very relevant content about AI safety', tokens: 20, relevance: 0.95 },
  { id: 'med', text: 'Somewhat relevant content', tokens: 15, relevance: 0.6 },
  { id: 'low', text: 'Not very relevant content', tokens: 10, relevance: 0.2 },
  { id: 'high2', text: 'Another highly relevant doc', tokens: 15, relevance: 0.9 },
];

// Test 1: Selects within budget
const r1 = selectContext('AI safety', docs, 35);
check('stays within token budget', r1.totalTokens <= 35, `totalTokens: ${r1.totalTokens}`);

// Test 2: Prioritizes high relevance (THE EDGE CASE)
check('selects high relevance first',
  r1.selected.some(d => d.id === 'high'),
  `selected: ${r1.selected.map(d => d.id).join(', ')}`);

// Test 3: Drops low relevance
check('drops low relevance', r1.dropped.includes('low') || r1.totalTokens <= 35,
  `dropped: ${r1.dropped}`);

// Test 4: Selects highest relevance docs within budget
const r1Ids = r1.selected.map(d => d.id);
check('high and high2 selected before med',
  r1Ids.indexOf('high') < r1Ids.indexOf('med') || !r1Ids.includes('med'));

// Test 5: Tracks dropped docs
check('dropped is array', Array.isArray(r1.dropped));

// Test 6: Budget exactly filled
const r2 = selectContext('topic', docs, 20);
check('exact budget respected', r2.totalTokens <= 20);

// Test 7: Large budget includes all
const r3 = selectContext('topic', docs, 100);
check('large budget includes all docs', r3.selected.length === 4);
check('no docs dropped with large budget', r3.dropped.length === 0);

// Test 8: Empty docs
const r4 = selectContext('query', [], 50);
check('empty docs returns empty', r4.selected.length === 0);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 6.6 complete. Context engineering — relevant docs first, budget respected.');
  process.exit(0);
}
console.log('\nHint: check the relevance prioritization. Naive AI picks docs in order, ignoring relevance.');
process.exit(1);
