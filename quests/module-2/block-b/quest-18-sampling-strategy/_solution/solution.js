/**
 * Quest 2.6: Sampling Strategy Explorer — REFERENCE solution
 */
function softmax(logits) {
  const max = Math.max(...logits);
  const exps = logits.map(x => Math.exp(x - max));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map(x => x / sum);
}

function sampleNext(logits, strategy) {
  if (strategy.type === 'greedy') {
    return logits.indexOf(Math.max(...logits));
  }

  let adjustedLogits = [...logits];

  if (strategy.type === 'temperature' && strategy.temperature !== undefined) {
    if (strategy.temperature === 0) return logits.indexOf(Math.max(...logits));
    adjustedLogits = logits.map(x => x / strategy.temperature);
  }

  if (strategy.type === 'top-k' && strategy.k !== undefined) {
    const sorted = [...logits].map((v, i) => [v, i]).sort((a, b) => b[0] - a[0]);
    const topK = sorted.slice(0, strategy.k).map(x => x[1]);
    const topKLogits = topK.map(i => logits[i]);
    const probs = softmax(topKLogits);
    const r = Math.random();
    let cum = 0;
    for (let i = 0; i < probs.length; i++) {
      cum += probs[i];
      if (r < cum) return topK[i];
    }
    return topK[topK.length - 1];
  }

  if (strategy.type === 'top-p' && strategy.p !== undefined) {
    const probs = softmax(adjustedLogits);
    const sorted = probs.map((v, i) => [v, i]).sort((a, b) => b[0] - a[0]);
    let cum = 0;
    for (const [prob, idx] of sorted) {
      cum += prob;
      if (cum >= strategy.p) return idx;
    }
    return sorted[sorted.length - 1][1];
  }

  // Default: temperature sampling
  const probs = softmax(adjustedLogits);
  const r = Math.random();
  let cum = 0;
  for (let i = 0; i < probs.length; i++) {
    cum += probs[i];
    if (r < cum) return i;
  }
  return probs.length - 1;
}

module.exports = { sampleNext };
