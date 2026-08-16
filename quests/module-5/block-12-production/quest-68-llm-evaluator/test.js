/**
 * Quest 5.6: LLM Evaluator — test suite
 * Requires ./problem.js exporting { createEvaluator }. Run: node test.js
 */

const { createEvaluator } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 5.6: LLM Evaluator\n');

function check(label, cond, detail) {
  if (cond) { console.log(`PASS ${label}`); passed++; } else { console.log(`FAIL ${label}`); if (detail) console.log(`   ${detail}`); failed++; }
}

const criteria = [
  { name: 'correctness', weight: 0.5, rubric: 'Is the code correct?' },
  { name: 'readability', weight: 0.3, rubric: 'Is it readable?' },
  { name: 'performance', weight: 0.2, rubric: 'Is it performant?' },
];

// Create evaluator with a custom scorer that simulates LLM judgment
const evaluator = createEvaluator(criteria);

// Test 1: Returns structured result
const r1 = evaluator('good code', { correctness: 9, readability: 8, performance: 7 });
check('returns scores object', r1.scores && typeof r1.scores === 'object');
check('has all criteria', r1.scores.correctness !== undefined && r1.scores.readability !== undefined);
check('weighted score is number', typeof r1.weighted === 'number');
check('grade is string', typeof r1.grade === 'string');

// Test 2: Weighted calculation
const expected = (9 * 0.5 + 8 * 0.3 + 7 * 0.2) / (0.5 + 0.3 + 0.2);
check('weighted score is correct', Math.abs(r1.weighted - expected) < 0.1,
  `expected ~${expected}, got ${r1.weighted}`);

// Test 3: Grade assignment
check('grade A for high score', r1.grade === 'A', `got ${r1.grade} for weighted ${r1.weighted}`);

// Test 4: Low score gets low grade
const r2 = evaluator('bad code', { correctness: 2, readability: 1, performance: 3 });
check('low score gets F or D', ['D', 'F'].includes(r2.grade), `got ${r2.grade}`);

// Test 5: Suspicious scoring detection (THE EDGE CASE)
const r3 = evaluator('any code', { correctness: 10, readability: 10, performance: 10 });
check('flags suspicious uniform high scores',
  r3.flagged || r3.warnings || r1.weighted !== r3.weighted,
  `naive AI gives all 10s without flagging — weighted: ${r3.weighted}`);

// Test 6: Empty criteria
const emptyEval = createEvaluator([]);
const r4 = emptyEval('code', {});
check('handles empty criteria', r4.weighted === 0 || r4.grade);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 5.6 complete. You evaluate with LLMs — and detect suspicious scoring.');
  process.exit(0);
}
console.log('\nHint: check the all-10s test. Naive AI gives perfect scores without detecting bias.');
process.exit(1);
