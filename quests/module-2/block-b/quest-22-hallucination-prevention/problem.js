/**
 * Quest 2.10: Hallucination Prevention System — problem.js (learner edits this)
 *
 * Block: 2 - Advanced Capabilities | Difficulty: 🔴 Hard | Time: 35 minutes
 *
 * Tool skill: implement multi-layer hallucination prevention.
 * Engineering habit: DEFENSE IN DEPTH — no single technique prevents all
 * hallucinations; layer multiple strategies for robustness.
 *
 * Goal: write `preventHallucination(prompt, context, options)` that
 * applies multiple prevention strategies.
 *
 * Parameters:
 *   - prompt: string — user's query
 *   - context: string[] — retrieved context chunks
 *   - options: { temperature?: number, maxTokens?: number,
 *                requireCitation?: boolean, confidenceThreshold?: number }
 *
 * Return: { safe: boolean, warnings: string[], enhancedPrompt: string }
 *
 * Strategies:
 *   1. Temperature reduction (lower temp = less creative/hallucinatory)
 *   2. Context injection (ground response in provided context)
 *   3. Citation requirement (force citations when enabled)
 *   4. Confidence check (warn if context is sparse)
 *
 * Edge case: naive AI only applies one strategy. A robust system layers all.
 */

// TODO: implement preventHallucination(prompt, context, options).
function preventHallucination(prompt, context, options) {
  return { safe: true, warnings: [], enhancedPrompt: prompt };
}

module.exports = { preventHallucination };
