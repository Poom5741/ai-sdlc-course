/**
 * Quest 19.1: AI Bias Auditor — test suite
 */

const { computeFairnessMetrics } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 19.1: AI Bias Auditor\n');

function check(label, cond, detail) {
  if (cond) {
    console.log(`PASS ${label}`);
    passed++;
  } else {
    console.log(`FAIL ${label}`);
    if (detail) console.log(`   ${detail}`);
    failed++;
  }
}

// Biased predictions: group A gets 80% positive, group B gets 20%
const predictions = [
  { group: 'A', predicted: true, actual: true },
  { group: 'A', predicted: true, actual: true },
  { group: 'A', predicted: true, actual: false },
  { group: 'A', predicted: false, actual: false },
  { group: 'B', predicted: false, actual: true },
  { group: 'B', predicted: false, actual: true },
  { group: 'B', predicted: true, actual: false },
  { group: 'B', predicted: false, actual: false },
];

const metrics = computeFairnessMetrics(predictions);

// Test 1: Returns object with required fields
check('has demographicParity', typeof metrics.demographicParity === 'number',
  `got ${JSON.stringify(metrics)}`);
check('has equalizedOdds', typeof metrics.equalizedOdds === 'number');
check('has groups', typeof metrics.groups === 'object');

// Test 2: Demographic parity detects bias
check('demographic parity > 0 for biased data', metrics.demographicParity > 0,
  `got ${metrics.demographicParity}`);

// Test 3: Equalized odds detects bias
check('equalized odds > 0 for biased data', metrics.equalizedOdds > 0,
  `got ${metrics.equalizedOdds}`);

// Test 4: EDGE CASE — fair data should have low scores
const fairPredictions = [
  { group: 'A', predicted: true, actual: true },
  { group: 'A', predicted: false, actual: false },
  { group: 'B', predicted: true, actual: true },
  { group: 'B', predicted: false, actual: false },
];
const fairMetrics = computeFairnessMetrics(fairPredictions);
check('fair data has low demographic parity', fairMetrics.demographicParity <= 0.1,
  `got ${fairMetrics.demographicParity}`);

// Test 5: Per-group breakdown
check('groups have per-group stats', Object.keys(metrics.groups).length >= 2,
  `groups: ${JSON.stringify(metrics.groups)}`);

// Test 6: Empty input
const empty = computeFairnessMetrics([]);
check('empty input returns zeros', empty.demographicParity === 0 && empty.equalizedOdds === 0);

// Test 7: Values between 0 and 1
check('demographicParity 0-1', metrics.demographicParity >= 0 && metrics.demographicParity <= 1);
check('equalizedOdds 0-1', metrics.equalizedOdds >= 0 && metrics.equalizedOdds <= 1);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 19.1 complete. You measure fairness between groups.');
  process.exit(0);
}
console.log('\nHint: check if you compute fairness BETWEEN groups, not by averaging everything.');
process.exit(1);
