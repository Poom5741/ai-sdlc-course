/**
 * Quest 2.5: Preference Optimization Implementer — problem.js (learner edits this)
 *
 * Block: 2 - LLM Training | Difficulty: 🔴 Hard | Time: 30 minutes
 *
 * Tool skill: implement DPO (Direct Preference Optimization) loss function.
 * Engineering habit: UNDERSTAND THE LOSS — DPO simplifies RLHF by directly
 * optimizing on preferences without a reward model.
 *
 * Goal: write `dpoLoss(policyLogps, refLogps, beta, chosenLogps, rejectedLogps)`
 * that computes the DPO loss.
 *
 * Formula: L = -log(σ(β * (log π(y_w|x)/π_ref(y_w|x) - log π(y_l|x)/π_ref(y_l|x))))
 *
 * Parameters:
 *   - policyLogps: { chosen: number, rejected: number }
 *   - refLogps: { chosen: number, rejected: number }
 *   - beta: number — temperature parameter
 *
 * Return: number — the DPO loss (scalar)
 *
 * Edge case: naive AI uses log probabilities directly instead of computing
 * the ratio. The loss should use log-space arithmetic for numerical stability.
 */

// TODO: implement dpoLoss(policyLogps, refLogps, beta).
function dpoLoss(policyLogps, refLogps, beta) {
  return 0;
}

module.exports = { dpoLoss };
