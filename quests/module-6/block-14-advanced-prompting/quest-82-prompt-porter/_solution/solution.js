/**
 * Quest 6.10: Cross-Model Prompt Porter — REFERENCE solution (do NOT import or read during the exercise)
 */

function portPrompt(prompt, fromModel, toModel) {
  if (fromModel === toModel) return { adapted: prompt, changes: [], warnings: [] };

  let adapted = prompt;
  const changes = [];
  const warnings = [];

  const supportedModels = ['gpt-4', 'gpt-4-turbo', 'claude', 'claude-3', 'gemini'];

  if (!supportedModels.includes(toModel)) {
    warnings.push(`Unknown model "${toModel}" — using generic adaptation`);
  }

  // Claude adaptations
  if (toModel.startsWith('claude')) {
    if (/as an ai|i am an ai/i.test(adapted)) {
      adapted = adapted.replace(/\b(?:As an AI,?|I am an AI,?)\s*/gi, '');
      changes.push('Removed "as an AI" filler for Claude');
    }
    if (/json/i.test(adapted) && !/respond in json/i.test(adapted)) {
      adapted += '\n\nRespond in JSON format.';
      changes.push('Added explicit JSON instruction for Claude');
    }
  }

  // GPT-4 adaptations
  if (toModel.startsWith('gpt-4')) {
    if (/structured data|format/i.test(adapted) && !/json/i.test(adapted)) {
      adapted += '\n\nOutput valid JSON.';
      changes.push('Added JSON mode instruction for GPT-4');
    }
  }

  // Gemini adaptations
  if (toModel === 'gemini') {
    // Simplify for Gemini
    adapted = adapted.replace(/\bas an ai,?\s*/gi, '');
    adapted = adapted.replace(/\bplease\b/gi, '');
    changes.push('simplified prompt for Gemini');
    if (!/example/i.test(adapted)) {
      adapted += '\n\nExample: [provide input/output example]';
      changes.push('Added example for Gemini (learns better from examples)');
    }
  }

  return { adapted, changes, warnings };
}

module.exports = { portPrompt };
