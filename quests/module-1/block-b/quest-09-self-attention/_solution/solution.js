/**
 * Quest 1.9: Self-Attention Implementation — REFERENCE solution
 */

function softmax(arr) {
  const max = Math.max(...arr);
  const exps = arr.map(x => Math.exp(x - max));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map(x => x / sum);
}

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

function transpose(A) {
  return A[0].map((_, j) => A.map(row => row[j]));
}

function selfAttention(tokens, Wq, Wk, Wv) {
  const d_k = Wq[0].length;
  const scale = Math.sqrt(d_k);

  // Q = tokens × Wq
  const Q = matMul(tokens, Wq);
  // K = tokens × Wk
  const K = matMul(tokens, Wk);
  // V = tokens × Wv
  const V = matMul(tokens, Wv);

  // scores = Q × K^T / sqrt(d_k)
  const Kt = transpose(K);
  const rawScores = matMul(Q, Kt);
  const scores = rawScores.map(row => row.map(s => s / scale));

  // weights = softmax(scores) per row
  const weights = scores.map(row => softmax(row));

  // output = weights × V
  return matMul(weights, V);
}

module.exports = { selfAttention };
