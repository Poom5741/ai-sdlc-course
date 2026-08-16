/**
 * Quest 1.10: Position Encoding Explorer — test suite
 *
 * Tool skill: implement positional encoding for transformer models.
 * Engineering habit: SEQUENCE MATTERS — transformers need position info.
 *
 * Requires ./problem.js exporting { positionalEncoding }. Run: node test.js
 */

const { positionalEncoding } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 1.10: Position Encoding Explorer\n');

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

function approxEqual(a, b, eps = 0.001) {
  return Math.abs(a - b) < eps;
}

// Test 1: Output shape
const pe1 = positionalEncoding(10, 16);
check('output is 2D array', Array.isArray(pe1) && Array.isArray(pe1[0]));
check('output shape is [10][16]', pe1.length === 10 && pe1[0].length === 16);

// Test 2: Position 0, dimension 0 should be sin(0) = 0
// PE(0, 0) = sin(0 / 10000^(0/16)) = sin(0) = 0
check('PE(0,0) = sin(0) = 0', approxEqual(pe1[0][0], 0), `got ${pe1[0][0]}`);

// Test 3: Position 0, dimension 1 should be cos(0) = 1
// PE(0, 1) = cos(0 / 10000^(0/16)) = cos(0) = 1
check('PE(0,1) = cos(0) = 1', approxEqual(pe1[0][1], 1), `got ${pe1[0][1]}`);

// Test 4: Check sin/cos pattern (even=sin, odd=cos)
// PE(1, 0) = sin(1 / 10000^(0/16)) = sin(1) ≈ 0.8415
check('PE(1,0) = sin(1) ≈ 0.8415', approxEqual(pe1[1][0], Math.sin(1)), `got ${pe1[1][0]}`);
// PE(1, 1) = cos(1 / 10000^(0/16)) = cos(1) ≈ 0.5403
check('PE(1,1) = cos(1) ≈ 0.5403', approxEqual(pe1[1][1], Math.cos(1)), `got ${pe1[1][1]}`);

// Test 5: Check frequency decreases with dimension
// PE(0, 0) = sin(0) = 0
// PE(0, 2) = sin(0 / 10000^(2/16)) = sin(0) = 0
// But PE(1, 0) = sin(1) and PE(1, 2) = sin(1/10000^(2/16))
const pe2 = positionalEncoding(2, 4);
check('frequency decreases with dimension',
  Math.abs(pe2[1][0] - pe2[1][2]) > 0.001,
  `PE(1,0)=${pe2[1][0]}, PE(1,2)=${pe2[1][2]}`);

// Test 6: Edge case — naive AI swaps sin/cos
// Check that even indices use sin, odd use cos
const pe3 = positionalEncoding(1, 8);
const expected0 = Math.sin(0); // 0
const expected1 = Math.cos(0); // 1
const expected2 = Math.sin(0 / Math.pow(10000, 2/8));
const expected3 = Math.cos(0 / Math.pow(10000, 2/8));
check('even indices use sin, odd use cos (not swapped)',
  approxEqual(pe3[0][0], expected0) && approxEqual(pe3[0][1], expected1) &&
  approxEqual(pe3[0][2], expected2) && approxEqual(pe3[0][3], expected3),
  `got [${pe3[0][0]}, ${pe3[0][1]}, ${pe3[0][2]}, ${pe3[0][3]}]`);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 1.10 complete. You implemented positional encoding correctly.');
  process.exit(0);
}
console.log('\nHint: check the sin/cos pattern — even indices use sin, odd use cos.');
process.exit(1);
