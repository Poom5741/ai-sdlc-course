/**
 * Quest 2.7: Chain-of-Thought Prompter — problem.js (learner edits this)
 *
 * Block: 2 - Advanced Capabilities | Difficulty: 🟡 Medium | Time: 25 minutes
 *
 * Tool skill: structure prompts to elicit step-by-step reasoning.
 * Engineering habit: REASONING CHAINS — break complex problems into
 * verifiable steps that can be checked independently.
 *
 * Goal: write `buildCoTPrompt(problem, steps)` that constructs a
 * chain-of-thought prompt template.
 *
 * Parameters:
 *   - problem: string — the problem to solve
 *   - steps: string[] — reasoning steps to follow
 *
 * Return: string — formatted prompt with "Let's think step by step" pattern
 *
 * Edge case: naive AI returns the problem as-is without structured steps.
 */

// TODO: implement buildCoTPrompt(problem, steps).
function buildCoTPrompt(problem, steps) {
  return problem;
}

module.exports = { buildCoTPrompt };
