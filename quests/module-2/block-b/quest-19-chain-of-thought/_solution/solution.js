/**
 * Quest 2.7: Chain-of-Thought Prompter — REFERENCE solution
 */
function buildCoTPrompt(problem, steps) {
  let prompt = `Problem: ${problem}\n\n`;
  prompt += `Let's think step by step:\n\n`;
  
  if (steps.length === 0) {
    prompt += `1. Break down the problem into smaller parts.\n`;
    prompt += `2. Solve each part systematically.\n`;
    prompt += `3. Combine the results.\n`;
  } else {
    steps.forEach((step, i) => {
      prompt += `${i + 1}. ${step}\n`;
    });
  }
  
  prompt += `\nNow, provide the final answer based on the reasoning above.`;
  return prompt;
}
module.exports = { buildCoTPrompt };
