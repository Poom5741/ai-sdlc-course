/**
 * Solution for Cost Optimizer quest
 */

const MODELS = {
  'gpt-4o': { inputCost: 2.50, outputCost: 10.00, capability: 'high' },
  'gpt-4o-mini': { inputCost: 0.15, outputCost: 0.60, capability: 'medium' },
  'claude-3-5-sonnet': { inputCost: 3.00, outputCost: 15.00, capability: 'high' },
  'claude-3-5-haiku': { inputCost: 0.25, outputCost: 1.25, capability: 'medium' }
};

/**
 * Selects the most cost-effective model for a task
 * @param {object} task - Task requirements
 * @param {string} task.description - What the task does
 * @param {boolean} task.needsAccuracy - High accuracy required
 * @param {boolean} task.needsSpeed - Fast response required
 * @param {string} task.domain - Domain (code, writing, analysis, etc.)
 * @returns {{ model: string, estimatedCost: number, reasoning: string }}
 */
function selectModel(task) {
  const { description, needsAccuracy, needsSpeed, domain } = task;
  
  // Estimate complexity based on keywords
  const complexKeywords = ['complex', 'algorithm', 'security', 'critical', 'financial', 'medical', 'legal'];
  const simpleKeywords = ['format', 'simple', 'quick', 'draft', 'convert', 'basic'];
  
  const isComplex = complexKeywords.some(kw => description.toLowerCase().includes(kw));
  const isSimple = simpleKeywords.some(kw => description.toLowerCase().includes(kw));
  
  // Decision matrix
  let selectedModel;
  let reasoning;
  
  // High accuracy requirement → use capable model
  if (needsAccuracy) {
    if (domain === 'code') {
      selectedModel = 'gpt-4o';
      reasoning = 'Code task with accuracy requirement - using GPT-4o for reliable code generation';
    } else {
      selectedModel = 'claude-3-5-sonnet';
      reasoning = 'High accuracy task - using Claude 3.5 Sonnet for superior reasoning';
    }
  }
  // Speed requirement + simple task → use cheapest model
  else if (needsSpeed && (isSimple || !isComplex)) {
    if (domain === 'code') {
      selectedModel = 'gpt-4o-mini';
      reasoning = 'Quick code task - using GPT-4o-mini for fast, cost-effective output';
    } else {
      selectedModel = 'claude-3-5-haiku';
      reasoning = 'Speed-optimized task - using Claude 3.5 Haiku for fastest response';
    }
  }
  // Complex task without explicit accuracy requirement → still use capable model
  else if (isComplex) {
    selectedModel = 'gpt-4o';
    reasoning = 'Complex task detected - using GPT-4o for better reasoning capabilities';
  }
  // Default: balanced choice
  else if (domain === 'code') {
      selectedModel = 'gpt-4o-mini';
      reasoning = 'General code task - using GPT-4o-mini for good balance of cost and quality';
    } else {
      selectedModel = 'claude-3-5-haiku';
      reasoning = 'General task - using Claude 3.5 Haiku for cost-effective output';
    }
  
  // Estimate cost (assuming ~1000 input tokens, ~500 output tokens)
  const model = MODELS[selectedModel];
  const estimatedCost = (model.inputCost * 1000 + model.outputCost * 500) / 1000000;
  
  return {
    model: selectedModel,
    estimatedCost,
    reasoning
  };
}

module.exports = { selectModel, MODELS };
