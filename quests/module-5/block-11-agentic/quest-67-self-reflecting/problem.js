/**
 * Quest 5.5: Self-Reflecting Agent — problem.js (learner edits this)
 *
 * Block: 11 - Agentic Workflows | Difficulty: 🔴 Hard | Time: 35 minutes
 *
 * Tool skill: agent that scores its own output quality.
 * Engineering habit: SELF-ASSESSMENT prevents overconfidence — an agent
 * that can't evaluate its own output doesn't know when to ask for help.
 *
 * Goal: write `createSelfReflectingAgent(generateFn, evaluateFn)` that
 * generates output and self-assesses quality.
 *
 * Returns: { generate(task) → { output, selfScore, confidence, needsHelp } }
 *
 * Rules:
 *   - selfScore: 0-100 based on evaluateFn
 *   - confidence: 'high' if score > 80, 'medium' if 50-80, 'low' if < 50
 *   - needsHelp: true if confidence is 'low'
 *   - Retries once if selfScore < 60 before reporting
 *
 * Edge case: naive AI generates once and returns. Self-reflecting agents
 * must RETRY when quality is low — not just report low quality.
 */

// TODO: implement createSelfReflectingAgent(generateFn, evaluateFn) here.
function createSelfReflectingAgent(generateFn, evaluateFn) {
  return {
    generate: (task) => ({ output: 'stub', selfScore: 0, confidence: 'low', needsHelp: true }),
  };
}

module.exports = { createSelfReflectingAgent };
