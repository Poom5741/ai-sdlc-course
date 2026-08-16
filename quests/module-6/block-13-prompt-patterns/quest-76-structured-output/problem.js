/**
 * Quest 6.4: Structured Output Parser — problem.js (learner edits this)
 *
 * Block: 13 - Prompt Patterns | Difficulty: 🟡 Medium | Time: 25 minutes
 *
 * Tool skill: parse JSON from LLM responses.
 * Engineering habit: STRUCTURED OUTPUT IS RELIABLE — LLMs return freeform text.
 * Wrapping output in a schema ensures downstream code can consume it.
 *
 * Goal: write `parseStructuredOutput(text, schema)` that extracts structured
 * data from LLM response text.
 *
 *   schema: { [field]: { type: 'string'|'number'|'boolean', required: boolean } }
 *
 * Returns: { parsed, errors, valid }
 *
 * Must handle:
 *   - JSON embedded in markdown code blocks (```json ... ```)
 *   - Partial/malformed JSON (try to recover)
 *   - Missing required fields
 *   - Type coercion (string "42" → number 42)
 *
 * Edge case: naive AI fails on JSON inside code blocks. LLMs often wrap
 * JSON in ```json fences — the parser MUST extract it.
 */

// TODO: implement parseStructuredOutput(text, schema) here.
function parseStructuredOutput(text, schema) {
  return { parsed: null, errors: ['stub'], valid: false };
}

module.exports = { parseStructuredOutput };
