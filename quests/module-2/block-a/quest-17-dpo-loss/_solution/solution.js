/**
 * Quest 2.5: DPO Loss — REFERENCE solution
 */
function dpoLoss(policyLogps, refLogps, beta) {
  const logRatioChosen = policyLogps.chosen - refLogps.chosen;
  const logRatioRejected = policyLogps.rejected - refLogps.rejected;
  const logits = beta * (logRatioChosen - logRatioRejected);
  // Numerically stable sigmoid loss: -log(sigmoid(x)) = softplus(-x)
  return Math.log(1 + Math.exp(-logits));
}
module.exports = { dpoLoss };
