/**
 * Quest 2.2: Scaling Laws Calculator — REFERENCE solution
 */
function computeOptimal(computeBudget) {
  const parameters = Math.round(0.3 * Math.pow(computeBudget, 0.5));
  const tokens = Math.round(0.3 * Math.pow(computeBudget, 0.5));
  const ratio = parameters === tokens ? 'compute-optimal' :
    parameters > tokens ? 'over-parameterized' : 'under-trained';
  return { parameters, tokens, ratio };
}
module.exports = { computeOptimal };
