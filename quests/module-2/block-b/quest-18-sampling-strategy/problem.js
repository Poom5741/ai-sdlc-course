/**
 * Quest 2.6: Sampling Strategy Explorer — problem.js (learner edits this)
 *
 * Block: 2 - Advanced Capabilities | Difficulty: 🟢 Easy | Time: 20 minutes
 *
 * Tool skill: implement different sampling strategies (temperature, top-k, top-p).
 * Engineering habit: CONTROL THE CHAOS — sampling parameters control the
 * randomness/creativity of LLM output.
 *
 * Goal: write `sampleNext(logits, strategy)` that samples from logits.
 *
 * Parameters:
 *   - logits: number[] — raw model outputs (before softmax)
 *   - strategy: { type: 'greedy' | 'temperature' | 'top-k' | 'top-p',
 *                  temperature?: number, k?: number, p?: number }
 *
 * Return: number — index of selected token
 *
 * Edge case: naive AI applies temperature AFTER softmax. Temperature must
 * be applied to logits BEFORE softmax.
 */

// TODO: implement sampleNext(logits, strategy).
function sampleNext(logits, strategy) {
  return 0;
}

module.exports = { sampleNext };
