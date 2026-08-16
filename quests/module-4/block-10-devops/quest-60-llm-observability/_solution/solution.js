/**
 * Quest 4.18: LLM Observability System — REFERENCE solution (do NOT import or read during the exercise)
 */

function createTracer() {
  const traces = [];
  const pricing = {
    'gpt-4': { input: 0.003, output: 0.006 },
    'gpt-3.5': { input: 0.00015, output: 0.0006 },
  };

  function trace({ model, prompt, response, tokens, latency }) {
    const id = `trace-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const price = pricing[model] || { input: 0.003, output: 0.006 };
    const cost = (tokens.input / 1000) * price.input + (tokens.output / 1000) * price.output;

    traces.push({
      id, model, prompt, response,
      tokens: tokens.input + tokens.output,
      inputTokens: tokens.input,
      outputTokens: tokens.output,
      latency,
      cost: Math.round(cost * 1000000) / 1000000,
      timestamp: Date.now(),
    });
    return id;
  }

  function getTrace(id) {
    return traces.find(t => t.id === id) || null;
  }

  function getMetrics() {
    const totalCalls = traces.length;
    const totalTokens = traces.reduce((s, t) => s + t.tokens, 0);
    const totalCost = traces.reduce((s, t) => s + t.cost, 0);
    const avgLatency = totalCalls > 0 ? traces.reduce((s, t) => s + t.latency, 0) / totalCalls : 0;

    const byModel = {};
    for (const t of traces) {
      if (!byModel[t.model]) byModel[t.model] = { calls: 0, tokens: 0, cost: 0 };
      byModel[t.model].calls++;
      byModel[t.model].tokens += t.tokens;
      byModel[t.model].cost += t.cost;
    }

    return {
      totalCalls,
      totalTokens,
      totalCost: Math.round(totalCost * 1000000) / 1000000,
      avgLatency: Math.round(avgLatency),
      byModel,
    };
  }

  function getSlowQueries(thresholdMs) {
    return traces.filter(t => t.latency > thresholdMs);
  }

  return { trace, getTrace, getMetrics, getSlowQueries };
}

module.exports = { createTracer };
