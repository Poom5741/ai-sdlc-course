/**
 * Quest 1.12: Transformer From Scratch — REFERENCE solution
 */

function layerNorm(x, gamma, beta) {
  const mean = x.reduce((a, b) => a + b, 0) / x.length;
  const variance = x.reduce((a, b) => a + (b - mean) ** 2, 0) / x.length;
  const std = Math.sqrt(variance + 1e-5);
  return x.map((xi, i) => gamma[i] * ((xi - mean) / std) + beta[i]);
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

function softmax(arr) {
  const max = Math.max(...arr);
  const exps = arr.map(x => Math.exp(x - max));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map(x => x / sum);
}

function selfAttention(input, Wq, Wk, Wv, Wo) {
  const d_k = Wq[0].length;
  const scale = Math.sqrt(d_k);

  const Q = matMul(input, Wq);
  const K = matMul(input, Wk);
  const V = matMul(input, Wv);

  const Kt = transpose(K);
  const scores = matMul(Q, Kt).map(row => row.map(s => s / scale));
  const weights = scores.map(row => softmax(row));

  const attended = matMul(weights, V);
  return matMul(attended, Wo);
}

function feedForward(x, W1, W2) {
  const hidden = matMul(x, W1).map(row => row.map(v => Math.max(0, v))); // ReLU
  return matMul(hidden, W2);
}

function transformerBlock(input, weights) {
  const { Wq, Wk, Wv, Wo, W1, W2, ln1_gamma, ln1_beta, ln2_gamma, ln2_beta } = weights;

  // Layer Norm → Self-Attention → Residual
  const normalized1 = input.map(row => layerNorm(row, ln1_gamma, ln1_beta));
  const attended = selfAttention(normalized1, Wq, Wk, Wv, Wo);
  const afterAttention = input.map((row, i) => row.map((val, j) => val + attended[i][j]));

  // Layer Norm → Feed-Forward → Residual
  const normalized2 = afterAttention.map(row => layerNorm(row, ln2_gamma, ln2_beta));
  const fed = feedForward(normalized2, W1, W2);
  return afterAttention.map((row, i) => row.map((val, j) => val + fed[i][j]));
}

module.exports = { transformerBlock };
