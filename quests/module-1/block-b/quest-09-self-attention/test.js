/**
 * Quest 1.9: Self-Attention Implementation — test suite
 *
 * Tool skill: implement the self-attention mechanism (QKV calculation).
 * Engineering habit: UNDERSTAND THE MATH — implement core operations to
 * understand how attention works.
 *
 * Requires ./problem.js exporting { selfAttention }. Run: node test.js
 */

const { selfAttention } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 1.9: Self-Attention Implementation\n');

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

// Helper: simple matrix multiply
function matMul(A, B) {
  const result = [];
  for (let i = 0; i < A.length; i++) {
    result[i] = [];
    for (let j = 0; j < B[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < B.length; k++) {
        sum += A[i][k] * B[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
}

// Test 1: Single token — output should equal the value vector
// Q = [1,0] × Wq = [1,0], K = [1,0] × Wk = [1,0], V = [1,0] × Wv = [1,0]
// scores = [1×1 + 0×0] / sqrt(2) = 1/1.414 ≈ 0.707
// softmax([0.707]) = [1.0] (single element)
// output = 1.0 × [1,0] = [1,0]
const tokens1 = [[1, 0]];
const Wq1 = [[1, 0], [0, 1]];
const Wk1 = [[1, 0], [0, 1]];
const Wv1 = [[1, 0], [0, 1]];

const out1 = selfAttention(tokens1, Wq1, Wk1, Wv1);
check('single token returns correct shape', out1 && out1.length === 1 && out1[0].length === 2);
check('single token output equals value', approxEqual(out1[0][0], 1) && approxEqual(out1[0][1], 0),
  `got ${JSON.stringify(out1[0])}`);

// Test 2: Two identical tokens — attention should be uniform (0.5, 0.5)
// Q = K = V = [[1,0],[1,0]]
// scores = [[1,1],[1,1]] / sqrt(2) = [[0.707,0.707],[0.707,0.707]]
// softmax = [[0.5,0.5],[0.5,0.5]]
// output = [[0.5,0.5],[0.5,0.5]] × [[1,0],[1,0]] = [[1,0],[1,0]]
const tokens2 = [[1, 0], [1, 0]];
const out2 = selfAttention(tokens2, Wq1, Wk1, Wv1);
check('two identical tokens produce uniform attention',
  approxEqual(out2[0][0], 1) && approxEqual(out2[0][1], 0) &&
  approxEqual(out2[1][0], 1) && approxEqual(out2[1][1], 0),
  `got ${JSON.stringify(out2)}`);

// Test 3: Different tokens — attention should weight them differently
// tokens = [[1,0],[0,1]], Wq=Wk=Wv=identity
// Q = K = V = [[1,0],[0,1]]
// scores = [[1,0],[0,1]] / sqrt(2) = [[0.707,0],[0,0.707]]
// softmax = [[0.731,0.269],[0.269,0.731]]
// output[0] = 0.731×[1,0] + 0.269×[0,1] = [0.731, 0.269]
// output[1] = 0.269×[1,0] + 0.731×[0,1] = [0.269, 0.731]
const tokens3 = [[1, 0], [0, 1]];
const out3 = selfAttention(tokens3, Wq1, Wk1, Wv1);
check('different tokens produce weighted output',
  approxEqual(out3[0][0], 0.670, 0.05) && approxEqual(out3[0][1], 0.330, 0.05),
  `got [${out3[0][0].toFixed(3)}, ${out3[0][1].toFixed(3)}]`);

// Test 4: CRITICAL — scaling by sqrt(d_k)
// Without scaling, scores would be [[1,0],[0,1]], producing different softmax
// With scaling: scores = [[0.707,0],[0,0.707]], softmax ≈ [[0.731,0.269],[0.269,0.731]]
// Without scaling: scores = [[1,0],[0,1]], softmax = [[0.731,0.269],[0.269,0.731]] (same for diagonal)
// Actually for diagonal identity, scaling doesn't change the ratio. Let's use non-diagonal.
const Wq4 = [[2, 0], [0, 1]];
const tokens4 = [[1, 0], [0, 1]];
const out4 = selfAttention(tokens4, Wq4, Wk1, Wv1);
// Q = [[2,0],[0,1]], K = [[1,0],[0,1]]
// raw scores = [[2,0],[0,1]], scaled = [[1.414,0],[0,0.707]]
// Without scaling: softmax([2,0]) = [0.881, 0.119]
// With scaling: softmax([1.414,0]) = [0.801, 0.199]
// Check that scaling affects the output
const out4NoScale = (() => {
  // Simulate without scaling
  const Q = [[2,0],[0,1]];
  const K = [[1,0],[0,1]];
  const V = [[1,0],[0,1]];
  const scores = [[2,0],[0,1]]; // No scaling
  const exp0 = Math.exp(2), exp1 = Math.exp(0);
  const w00 = exp0/(exp0+exp1), w01 = exp1/(exp0+exp1);
  const w10 = exp1/(exp1+exp0), w11 = exp0/(exp1+exp0);
  return [[w00*1+w01*0, w00*0+w01*1], [w10*1+w11*0, w10*0+w11*1]];
})();
// The outputs should differ because scaling changes softmax
check('scaling by sqrt(d_k) affects output',
  !approxEqual(out4[0][0], out4NoScale[0][0], 0.001),
  `with scale: ${out4[0][0].toFixed(4)}, without: ${out4NoScale[0][0].toFixed(4)}`);

// Test 5: Determinism — same input gives same output
const out5a = selfAttention(tokens3, Wq1, Wk1, Wv1);
const out5b = selfAttention(tokens3, Wq1, Wk1, Wv1);
check('function is deterministic',
  JSON.stringify(out5a) === JSON.stringify(out5b));

// Test 6: Stub check — stub returns input unchanged, which is wrong for different tokens
check('stub does not return input unchanged',
  JSON.stringify(out3) !== JSON.stringify(tokens3),
  'output equals input — implementation is likely a stub');

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 1.9 complete. You implemented self-attention with proper scaling.');
  process.exit(0);
}
console.log('\nHint: check sqrt(d_k) scaling and the attention weight calculations.');
process.exit(1);
