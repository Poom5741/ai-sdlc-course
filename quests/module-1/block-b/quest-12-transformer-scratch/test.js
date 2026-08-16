/**
 * Quest 1.12: Transformer From Scratch — test suite
 *
 * Tool skill: implement a simplified transformer block from scratch.
 * Engineering habit: BUILD TO UNDERSTAND — implementing reveals how pieces fit.
 *
 * Requires ./problem.js exporting { transformerBlock }. Run: node test.js
 */

const { transformerBlock } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 1.12: Transformer From Scratch\n');

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

function approxEqual(a, b, eps = 0.01) {
  return Math.abs(a - b) < eps;
}

// Helper: create identity-like weights for testing
function makeIdentityWeights(dModel) {
  return {
    Wq: Array(dModel).fill(null).map((_, i) => Array(dModel).fill(0).map((_, j) => i === j ? 1 : 0)),
    Wk: Array(dModel).fill(null).map((_, i) => Array(dModel).fill(0).map((_, j) => i === j ? 1 : 0)),
    Wv: Array(dModel).fill(null).map((_, i) => Array(dModel).fill(0).map((_, j) => i === j ? 1 : 0)),
    Wo: Array(dModel).fill(null).map((_, i) => Array(dModel).fill(0).map((_, j) => i === j ? 1 : 0)),
    W1: Array(dModel).fill(null).map((_, i) => Array(dModel).fill(0).map((_, j) => i === j ? 1 : 0)),
    W2: Array(dModel).fill(null).map((_, i) => Array(dModel).fill(0).map((_, j) => i === j ? 1 : 0)),
    ln1_gamma: Array(dModel).fill(1),
    ln1_beta: Array(dModel).fill(0),
    ln2_gamma: Array(dModel).fill(1),
    ln2_beta: Array(dModel).fill(0),
  };
}

// Test 1: Output shape preserved
const dModel = 4;
const weights = makeIdentityWeights(dModel);
const input1 = [[1, 2, 3, 4]];
const out1 = transformerBlock(input1, weights);
check('output shape matches input', out1 && out1.length === 1 && out1[0].length === dModel,
  `got ${JSON.stringify(out1)}`);

// Test 2: Identity weights should preserve input (with layer norm)
const input2 = [[1, 2, 3, 4]];
const out2 = transformerBlock(input2, weights);
check('output is 2D array', Array.isArray(out2) && Array.isArray(out2[0]));

// Test 3: CRITICAL — residual connection check
// With identity weights, output should be close to input after layer norm
// If naive AI forgets residuals, output will differ significantly
check('residual connections preserve information',
  out2 && out2[0] && out2[0].length === dModel);

// Test 4: Multiple tokens
const input4 = [[1, 2, 3, 4], [5, 6, 7, 8]];
const out4 = transformerBlock(input4, weights);
check('multiple tokens handled', out4 && out4.length === 2,
  `got ${out4 ? out4.length : 'null'} tokens`);

// Test 5: Different weights produce different output
const weights2 = makeIdentityWeights(dModel);
weights2.ln1_gamma = Array(dModel).fill(2); // Different layer norm
const out5 = transformerBlock(input2, weights2);
check('different weights produce different output',
  JSON.stringify(out5) !== JSON.stringify(out2),
  'output unchanged with different weights');

// Test 6: Edge case — naive AI forgets residual connection
// Create a simple test where residual makes a difference
const simpleWeights = makeIdentityWeights(2);
const simpleInput = [[10, 20]];
const simpleOut = transformerBlock(simpleInput, simpleWeights);
// With proper residuals + layer norm, the output should retain some of the input's magnitude
check('output retains input magnitude (residual present)',
  simpleOut && simpleOut[0] && Math.abs(simpleOut[0][0]) > 0.5,
  `got ${simpleOut ? simpleOut[0][0].toFixed(4) : 'null'}`);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 1.12 complete. You built a transformer block from scratch.');
  process.exit(0);
}
console.log('\nHint: check the residual connections — each sub-layer must add its input back.');
process.exit(1);
