/**
 * Quest 4.19: Cost Optimizer — problem.js (learner edits this)
 *
 * Block: 10 - DevOps & Deployment | Difficulty: 🔴 Hard | Time: 30 minutes
 *
 * Tool skill: implement token budget routing between models.
 * Engineering habit: OPTIMIZE COST WITHOUT SACRIFICING QUALITY — route
 * simple tasks to cheap models, complex tasks to powerful ones.
 *
 * Goal: write `routeRequest(request, budget)` that picks the best model
 * for a request given a cost budget.
 *
 *   request: { task, complexity: 'low'|'medium'|'high', maxTokens: number }
 *   budget: { dailyLimit, spentToday }
 *
 *   models: { [name]: { costPer1kTokens, qualityScore, maxContext } }
 *
 * Returns: { model, estimatedCost, withinBudget, reason }
 *
 * Rules:
 *   - High complexity → must use quality >= 0.8
 *   - Low complexity → prefer cheapest model that fits
 *   - Must stay within remaining budget
 *   - If no model fits budget, return cheapest with withinBudget: false
 *
 * Edge case: naive AI always picks the cheapest model. The optimizer MUST
 * respect complexity requirements — a complex task needs a quality model.
 */

// TODO: implement routeRequest(request, budget) here.
function routeRequest(request, budget) {
  return { model: 'stub', estimatedCost: 0, withinBudget: false, reason: 'stub' };
}

module.exports = { routeRequest };
