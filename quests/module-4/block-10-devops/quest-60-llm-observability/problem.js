/**
 * Quest 4.18: LLM Observability System — problem.js (learner edits this)
 *
 * Block: 10 - DevOps & Deployment | Difficulty: 🔴 Hard | Time: 35 minutes
 *
 * Tool skill: build tracing and metrics for LLM calls.
 * Engineering habit: LLM OBSERVABILITY — LLM calls are expensive and
 * unpredictable. Trace every call: latency, tokens, cost, model, success.
 *
 * Goal: write `createTracer()` that returns a tracer object.
 *
 *   tracer.trace({ model, prompt, response, tokens, latency }) → traceId
 *   tracer.getTrace(traceId) → full trace object
 *   tracer.getMetrics() → { totalCalls, totalTokens, totalCost, avgLatency,
 *                           byModel: { [model]: { calls, tokens, cost } } }
 *   tracer.getSlowQueries(thresholdMs) → traces exceeding threshold
 *
 * Cost model: input $0.003/1K tokens, output $0.006/1K tokens (GPT-4 pricing)
 *
 * Edge case: naive AI sums tokens but doesn't compute COST. LLM observability
 * must track dollar cost, not just token count.
 */

// TODO: implement createTracer() here.
function createTracer() {
  return {
    trace: () => 'stub',
    getTrace: () => null,
    getMetrics: () => ({ totalCalls: 0, totalTokens: 0, totalCost: 0, avgLatency: 0, byModel: {} }),
    getSlowQueries: () => [],
  };
}

module.exports = { createTracer };
