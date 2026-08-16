/**
 * Quest 6.7: Meta-Prompt Generator — problem.js (learner edits this)
 *
 * Block: 14 - Advanced Prompting | Difficulty: 🔴 Hard | Time: 30 minutes
 *
 * Tool skill: prompts that write prompts.
 * Engineering habit: AUTOMATE PROMPT CREATION — for recurring tasks,
 * a meta-prompt generates task-specific prompts from a template.
 *
 * Goal: write `createMetaPrompt(template)` that returns a prompt generator.
 *
 *   template: { role, constraints, outputFormat, examples }
 *
 *   generator.generate(taskDescription, context) → string (ready-to-use prompt)
 *   generator.validate(prompt) → { valid, issues }
 *   generator.improve(prompt, feedback) → improved prompt
 *
 * Edge case: naive AI generates prompts but doesn't validate them.
 * The generator MUST check for completeness (role, constraints, format).
 */

// TODO: implement createMetaPrompt(template) here.
function createMetaPrompt(template) {
  return {
    generate: () => 'stub',
    validate: () => ({ valid: false, issues: ['stub'] }),
    improve: (prompt) => prompt,
  };
}

module.exports = { createMetaPrompt };
