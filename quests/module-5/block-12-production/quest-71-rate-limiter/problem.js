/**
 * Quest 5.9: Rate Limiter for LLM APIs — problem.js (learner edits this)
 *
 * Block: 12 - Production Patterns | Difficulty: 🟡 Medium | Time: 25 minutes
 *
 * Tool skill: implement token bucket rate limiter.
 * Engineering habit: PROTECT YOUR BUDGET — LLM APIs have rate limits.
 * A rate limiter prevents your app from getting throttled or banned.
 *
 * Goal: write `createRateLimiter(config)` with token bucket algorithm.
 *
 *   config: { maxTokens, refillRate (tokens/sec) }
 *
 *   limiter.consume(tokens) → { allowed, remaining, retryAfter }
 *   limiter.available() → number of tokens available
 *   limiter.reset() → void
 *
 * Token bucket: tokens refill over time up to maxTokens.
 * Each consume deducts tokens. If not enough, request is denied.
 *
 * Edge case: naive AI implements a simple counter (fixed window).
 * Token bucket must REFILL over time — not reset at fixed intervals.
 */

// TODO: implement createRateLimiter(config) here.
function createRateLimiter(config) {
  return {
    consume: () => ({ allowed: true, remaining: 0, retryAfter: 0 }),
    available: () => 0,
    reset: () => {},
  };
}

module.exports = { createRateLimiter };
