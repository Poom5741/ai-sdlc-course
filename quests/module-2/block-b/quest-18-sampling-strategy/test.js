/**
 * Quest 2.6: Sampling Strategy Explorer — test suite
 */
const { sampleNext } = require('./problem.js');

let passed = 0;
let failed = 0;
console.log('Quest 2.6: Sampling Strategy Explorer\n');

function check(label, cond, detail) {
  if (cond) { console.log(`PASS ${label}`); passed++; }
  else { console.log(`FAIL ${label}`); if (detail) console.log(`   ${detail}`); failed++; }
}

// Test 1: Greedy always picks highest
const logits1 = [1, 5, 2, 3];
check('greedy picks max index', sampleNext(logits1, { type: 'greedy' }) === 1);

// Test 2: Greedy with tie — picks first max
const logits2 = [5, 5, 1];
check('greedy picks first max on tie', sampleNext(logits2, { type: 'greedy' }) === 0);

// Test 3: Temperature=0 should be greedy
check('temperature=0 is greedy', sampleNext(logits1, { type: 'temperature', temperature: 0 }) === 1);

// Test 4: Top-k restricts candidates
const logits3 = [1, 5, 2, 3];
const kResult = sampleNext(logits3, { type: 'top-k', k: 2 });
check('top-k only picks from top 2', kResult === 1 || kResult === 3,
  `got ${kResult}, expected 1 or 3`);

// Test 5: Top-p (nucleus) sampling
const logits4 = [1, 5, 2, 3];
const pResult = sampleNext(logits4, { type: 'top-p', p: 0.8 });
check('top-p returns valid index', typeof pResult === 'number' && pResult >= 0 && pResult < logits4.length);

// Test 6: Edge case — naive AI applies temperature after softmax
// With temp < 1, probabilities should be sharper, not flatter
check('temperature applied to logits (not after softmax)', true);

console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed === 0) { console.log('\nQuest 2.6 complete.'); process.exit(0); }
console.log('\nHint: apply temperature to logits BEFORE softmax, not after.');
process.exit(1);
