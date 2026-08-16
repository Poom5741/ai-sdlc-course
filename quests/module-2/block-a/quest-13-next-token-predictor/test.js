/**
 * Quest 2.1: Next Token Predictor — test suite
 *
 * Tool skill: implement a simple bigram language model.
 * Engineering habit: UNDERSTAND THE FOUNDATION — next-token prediction is core.
 *
 * Requires ./problem.js exporting { predictNext }. Run: node test.js
 */

const { predictNext } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 2.1: Next Token Predictor\n');

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

const corpus = 'the cat sat on the mat the cat ate the fish the dog sat on the log';

// Test 1: Basic prediction
const r1 = predictNext('the', corpus);
check('predicts next word after "the"', r1 === 'cat' || r1 === 'dog' || r1 === 'mat' || r1 === 'fish' || r1 === 'log',
  `got "${r1}"`);

// Test 2: "the cat" → "sat" or "ate"
const r2 = predictNext('the cat', corpus);
check('predicts after "the cat"', r2 === 'sat' || r2 === 'ate',
  `got "${r2}"`);

// Test 3: Empty context → most common word
const r3 = predictNext('', corpus);
check('empty context returns most common word', r3 === 'the',
  `got "${r3}", expected "the"`);

// Test 4: Case-insensitive matching
const r4 = predictNext('The', corpus);
check('case-insensitive: "The" matches "the"', r4 === 'cat' || r4 === 'dog' || r4 === 'mat' || r4 === 'fish' || r4 === 'log',
  `got "${r4}"`);

// Test 5: Unknown context → fallback to most common
const r5 = predictNext('xyz', corpus);
check('unknown context falls back to most common', r5 === 'the',
  `got "${r5}", expected "the"`);

// Test 6: Edge case — naive AI does case-sensitive
const r6 = predictNext('The Cat', 'The Cat sat the Cat ate');
check('case-insensitive with mixed case', r6 === 'sat' || r6 === 'ate',
  `got "${r6}" for "The Cat" in mixed-case corpus`);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 2.1 complete. You implemented a bigram predictor.');
  process.exit(0);
}
console.log('\nHint: check case-insensitive matching and empty context handling.');
process.exit(1);
