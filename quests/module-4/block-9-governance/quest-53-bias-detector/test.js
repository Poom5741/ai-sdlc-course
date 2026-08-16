/**
 * Quest 4.11: Bias Detector — test suite
 * Requires ./problem.js exporting { detectBias }. Run: node test.js
 */

const { detectBias } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 4.11: Bias Detector\n');

function check(label, cond, detail) {
  if (cond) { console.log(`PASS ${label}`); passed++; } else { console.log(`FAIL ${label}`); if (detail) console.log(`   ${detail}`); failed++; }
}

// Test 1: Fair results (proportional)
const fairResults = [
  { id: 1, output: 'approved', group: 'A' },
  { id: 2, output: 'approved', group: 'A' },
  { id: 3, output: 'denied', group: 'A' },
  { id: 4, output: 'approved', group: 'B' },
  { id: 5, output: 'denied', group: 'B' },
];
const fair = detectBias(fairResults, ['A', 'B']);
check('fair results detected', fair.fair === true, `fair: ${fair.fair}`);

// Test 2: Biased results
const biasedResults = [
  { id: 1, output: 'approved', group: 'A' },
  { id: 2, output: 'approved', group: 'A' },
  { id: 3, output: 'approved', group: 'A' },
  { id: 4, output: 'approved', group: 'A' },
  { id: 5, output: 'denied', group: 'B' },
  { id: 6, output: 'denied', group: 'B' },
  { id: 7, output: 'denied', group: 'B' },
  { id: 8, output: 'denied', group: 'B' },
];
const biased = detectBias(biasedResults, ['A', 'B']);
check('biased results detected', biased.fair === false);

// Test 3: Disparate impact ratio calculated
check('disparate impact < 0.8 for biased', biased.disparateImpact < 0.8,
  `got ${biased.disparateImpact}`);

// Test 4: Different group sizes (THE EDGE CASE)
// Group A: 10 people, 9 approved (90%). Group B: 2 people, 1 approved (50%).
// Rates: A=0.9, B=0.5. Ratio: 0.5/0.9 = 0.555. Should be flagged.
const diffSizeResults = [];
for (let i = 0; i < 9; i++) diffSizeResults.push({ id: i, output: 'approved', group: 'A' });
diffSizeResults.push({ id: 10, output: 'denied', group: 'A' });
diffSizeResults.push({ id: 11, output: 'approved', group: 'B' });
diffSizeResults.push({ id: 12, output: 'denied', group: 'B' });

const diffSize = detectBias(diffSizeResults, ['A', 'B']);
check('detects bias with different group sizes', diffSize.fair === false,
  `naive AI checks equal counts instead of rates — fair: ${diffSize.fair}`);
check('flagged groups listed', diffSize.flagged.length > 0);

// Test 5: Metrics include per-group rates
check('metrics have group A', diffSize.metrics['A'] !== undefined);
check('metrics have group B', diffSize.metrics['B'] !== undefined);
check('group A rate ~0.9', diffSize.metrics['A'].rate >= 0.89 && diffSize.metrics['A'].rate <= 0.91);
check('group B rate ~0.5', diffSize.metrics['B'].rate >= 0.49 && diffSize.metrics['B'].rate <= 0.51);

// Test 6: Empty input
const empty = detectBias([], ['A']);
check('empty results is fair', empty.fair === true);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 4.11 complete. You measure fairness with rates, not equal counts.');
  process.exit(0);
}
console.log('\nHint: check the different-group-sizes test. Naive AI checks equal counts instead of proportional rates.');
process.exit(1);
