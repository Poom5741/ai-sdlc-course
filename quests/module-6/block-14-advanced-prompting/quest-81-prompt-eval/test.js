/**
 * Quest 6.9: Prompt Evaluation Framework — test suite
 * Requires ./problem.js exporting { createPromptEvaluator }. Run: node test.js
 */

const { createPromptEvaluator } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 6.9: Prompt Evaluation Framework\n');

function check(label, cond, detail) {
  if (cond) { console.log(`PASS ${label}`); passed++; } else { console.log(`FAIL ${label}`); if (detail) console.log(`   ${detail}`); failed++; }
}

const testCases = [
  { input: 'What is AI?', expectedContains: ['artificial', 'intelligence'], expectedNotContains: ['I don\'t know'] },
  { input: 'Define ML', expectedContains: ['machine', 'learning'], expectedNotContains: ['magic'] },
];

const evaluator = createPromptEvaluator(testCases);

// Test 1: Good prompt function
const goodFn = (input) => 'AI is artificial intelligence. ML is machine learning.';
const r1 = evaluator.evaluate(goodFn);
check('good prompt gets high score', r1.score >= 80, `score: ${r1.score}`);
check('reports passed tests', r1.passed >= 1);

// Test 2: Bad prompt function
const badFn = (input) => 'I don\'t know. Magic stuff.';
const r2 = evaluator.evaluate(badFn);
check('bad prompt gets low score', r2.score < 50, `score: ${r2.score}`);

// Test 3: Forbidden content penalty (THE EDGE CASE)
check('penalizes forbidden content',
  r2.score < r1.score && r2.details.some(d => d.penalty),
  `naive AI doesn't penalize forbidden words — score: ${r2.score}`);

// Test 4: Partial credit
const partialFn = (input) => 'AI is artificial.';
const r3 = evaluator.evaluate(partialFn);
check('partial match gets partial credit', r3.score > 0 && r3.score < 100,
  `score: ${r3.score}`);

// Test 5: Structure
check('result has score', typeof r1.score === 'number');
check('result has passed', typeof r1.passed === 'number');
check('result has failed', typeof r1.failed === 'number');
check('result has details', Array.isArray(r1.details));

// Test 6: Details include test info
check('details reference test cases', r1.details.length > 0);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 6.9 complete. You measure prompt quality — not just "it feels right".');
  process.exit(0);
}
console.log('\nHint: check the forbidden content penalty. Naive AI counts passes without penalizing banned words.');
process.exit(1);
