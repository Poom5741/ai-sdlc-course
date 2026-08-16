/**
 * Quest 4.19: Cost Optimizer — REFERENCE solution (do NOT import or read during the exercise)
 */

const MODELS = {
  'gpt-3.5-turbo': { costPer1kTokens: 0.00015, qualityScore: 0.6, maxContext: 4096 },
  'gpt-4-turbo': { costPer1kTokens: 0.003, qualityScore: 0.85, maxContext: 128000 },
  'gpt-4o-mini': { costPer1kTokens: 0.00015, qualityScore: 0.7, maxContext: 128000 },
  'gpt-4o': { costPer1kTokens: 0.005, qualityScore: 0.95, maxContext: 128000 },
  'claude-3-haiku': { costPer1kTokens: 0.00025, qualityScore: 0.65, maxContext: 200000 },
};

function routeRequest(request, budget) {
  const { complexity, maxTokens } = request;
  const remaining = budget.dailyLimit - budget.spentToday;
  const minQuality = complexity === 'high' ? 0.8 : complexity === 'medium' ? 0.6 : 0;

  const candidates = Object.entries(MODELS)
    .filter(([_, m]) => m.qualityScore >= minQuality && m.maxContext >= maxTokens)
    .map(([name, m]) => ({
      name,
      ...m,
      cost: (maxTokens / 1000) * m.costPer1kTokens,
    }))
    .sort((a, b) => a.cost - b.cost);

  if (candidates.length === 0) {
    const cheapest = Object.entries(MODELS).sort((a, b) => a[1].costPer1kTokens - b[1].costPer1kTokens)[0];
    const cost = (maxTokens / 1000) * cheapest[1].costPer1kTokens;
    return { model: cheapest[0], estimatedCost: cost, withinBudget: cost <= remaining, reason: 'No model meets quality requirement; selected cheapest' };
  }

  const best = candidates[0];
  return {
    model: best.name,
    estimatedCost: Math.round(best.cost * 1000000) / 1000000,
    withinBudget: best.cost <= remaining,
    reason: `Selected ${best.name} (quality ${best.qualityScore}) for ${complexity} task`,
  };
}

module.exports = { routeRequest };
