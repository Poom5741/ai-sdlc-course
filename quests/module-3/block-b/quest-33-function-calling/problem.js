/**
 * Quest 3.11: Function Calling Implementer — problem.js (learner edits this)
 *
 * Block: 3 - Development with AI | Difficulty: 🟡 Medium | Time: 25 minutes
 *
 * Tool skill: implement function calling for LLM tool use.
 * Engineering habit: STRUCTURED OUTPUTS — function calling enables LLMs
 * to return structured data instead of free-form text.
 *
 * Goal: write `defineFunction(name, description, parameters)` that creates
 * a function schema for LLM tool use.
 *
 * Return: { name, description, parameters, validate(args) }
 */
function defineFunction(name, description, parameters) {
  return { name, description, parameters, validate: () => false };
}
module.exports = { defineFunction };
