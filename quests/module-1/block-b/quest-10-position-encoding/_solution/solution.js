/**
 * Quest 1.10: Position Encoding Explorer — REFERENCE solution
 */

function positionalEncoding(maxLen, dModel) {
  const pe = [];
  for (let pos = 0; pos < maxLen; pos++) {
    pe[pos] = [];
    for (let i = 0; i < dModel; i++) {
      const angle = pos / Math.pow(10000, (2 * Math.floor(i / 2)) / dModel);
      pe[pos][i] = i % 2 === 0 ? Math.sin(angle) : Math.cos(angle);
    }
  }
  return pe;
}

module.exports = { positionalEncoding };
