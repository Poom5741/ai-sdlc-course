/**
 * Quest 5.2: Tool Registry System — problem.js (learner edits this)
 *
 * Block: 11 - Agentic Workflows | Difficulty: 🟡 Medium | Time: 25 minutes
 *
 * Tool skill: dynamic tool loading and dispatch.
 * Engineering habit: TOOLS ARE PLUGGABLE — agents should discover and
 * use tools at runtime, not have them hardcoded. A registry enables this.
 *
 * Goal: write `createToolRegistry()` that manages tool registration and dispatch.
 *
 *   registry.register(tool) → boolean
 *   registry.execute(toolName, args) → result
 *   registry.listTools() → [{ name, description, parameters }]
 *   registry.findTools(query) → matching tools by keyword
 *
 * Edge case: naive AI registers tools but doesn't validate arguments
 * against the tool's parameter schema. The registry MUST validate args.
 */

// TODO: implement createToolRegistry() here.
function createToolRegistry() {
  return {
    register: () => false,
    execute: () => null,
    listTools: () => [],
    findTools: () => [],
  };
}

module.exports = { createToolRegistry };
