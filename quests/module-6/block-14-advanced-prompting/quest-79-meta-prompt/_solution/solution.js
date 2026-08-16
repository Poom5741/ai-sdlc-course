/**
 * Quest 6.7: Meta-Prompt Generator — REFERENCE solution (do NOT import or read during the exercise)
 */

function createMetaPrompt(template) {
  function generate(taskDescription, context) {
    let prompt = `Role: ${template.role}\n\n`;
    prompt += `Task: ${taskDescription}\n\n`;
    if (context) prompt += `Context: ${context}\n\n`;
    if (template.constraints.length) {
      prompt += `Constraints:\n${template.constraints.map(c => `- ${c}`).join('\n')}\n\n`;
    }
    prompt += `Output format: ${template.outputFormat}\n`;
    if (template.examples.length) {
      prompt += `\nExamples:\n`;
      for (const ex of template.examples) {
        prompt += `Input: ${ex.input}\nOutput: ${ex.output}\n\n`;
      }
    }
    return prompt;
  }

  function validate(prompt) {
    const issues = [];
    if (!prompt.includes(template.role)) issues.push('Missing role');
    if (!template.constraints.every(c => prompt.includes(c))) issues.push('Missing constraints');
    if (!prompt.toLowerCase().includes(template.outputFormat.split(' ')[0].toLowerCase())) {
      issues.push('Missing output format');
    }
    return { valid: issues.length === 0, issues };
  }

  function improve(prompt, feedback) {
    return prompt + `\n\nAdditional instructions: ${feedback}`;
  }

  return { generate, validate, improve };
}

module.exports = { createMetaPrompt };
