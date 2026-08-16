/**
 * Quest 5.9: Rate Limiter for LLM APIs — REFERENCE solution (do NOT import or read during the exercise)
 */

function createRateLimiter({ maxTokens, refillRate }) {
  let tokens = maxTokens;
  let lastRefill = Date.now();

  function refill() {
    const now = Date.now();
    const elapsed = (now - lastRefill) / 1000;
    tokens = Math.min(maxTokens, tokens + elapsed * refillRate);
    lastRefill = now;
  }

  function consume(requested) {
    refill();
    if (tokens >= requested) {
      tokens -= requested;
      return { allowed: true, remaining: Math.floor(tokens), retryAfter: 0 };
    }
    const deficit = requested - tokens;
    const retryAfter = Math.ceil((deficit / refillRate) * 1000);
    return { allowed: false, remaining: Math.floor(tokens), retryAfter };
  }

  function available() {
    refill();
    return Math.floor(tokens);
  }

  function reset() {
    tokens = maxTokens;
    lastRefill = Date.now();
  }

  return { consume, available, reset };
}

module.exports = { createRateLimiter };
