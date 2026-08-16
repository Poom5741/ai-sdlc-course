/**
 * Quest 6.3: Chain-of-Density Optimizer — problem.js (learner edits this)
 *
 * Block: 13 - Prompt Patterns | Difficulty: 🟡 Medium | Time: 25 minutes
 *
 * Tool skill: reduce verbosity while keeping information density.
 * Engineering habit: DENSE > VERbose — every token costs money. Remove
 * filler words while preserving meaning.
 *
 * Goal: write `optimizeDensity(text, targetRatio)` that compresses text.
 *
 *   targetRatio: 0.5 means reduce to 50% of original length
 *
 * Returns: { optimized, originalTokens, optimizedTokens, ratio }
 *
 * Rules:
 *   - Remove filler words (very, really, basically, actually, etc.)
 *   - Remove redundant phrases ("in order to" → "to")
 *   - Preserve all unique information
 *   - Must not exceed target ratio
 *
 * Edge case: naive AI removes words randomly. Optimization MUST preserve
 * information density — removing synonyms while keeping key terms.
 */

// TODO: implement optimizeDensity(text, targetRatio) here.
function optimizeDensity(text, targetRatio = 0.5) {
  return { optimized: text, originalTokens: 0, optimizedTokens: 0, ratio: 1 };
}

module.exports = { optimizeDensity };
