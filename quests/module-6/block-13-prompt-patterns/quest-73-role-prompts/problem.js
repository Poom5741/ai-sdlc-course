/**
 * Quest 6.1: Role Prompt Library — problem.js (learner edits this)
 *
 * Block: 13 - Prompt Patterns | Difficulty: 🟢 Easy | Time: 15 minutes
 *
 * Tool skill: system prompts for different roles.
 * Engineering habit: ROLES SHAPE BEHAVIOR — a well-crafted system prompt
 * defines the agent's personality, constraints, and output format.
 *
 * Goal: write `createRolePrompt(role)` that returns a system prompt string.
 *
 * Roles: 'code-reviewer', 'security-auditor', 'doc-writer', 'test-generator'
 *
 * Requirements:
 *   - Each role must have a clear persona
 *   - Each must specify output format
 *   - Each must include constraints (what NOT to do)
 *   - Must throw for unknown roles
 *
 * Edge case: naive AI returns the SAME generic prompt for all roles.
 * Each role must have DISTINCT persona and constraints.
 */

// TODO: implement createRolePrompt(role) here.
function createRolePrompt(role) {
  return 'You are a helpful assistant.'; // stub — same for all roles
}

module.exports = { createRolePrompt };
