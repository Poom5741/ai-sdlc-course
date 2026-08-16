/**
 * Quest 6.2: Few-Shot Template Builder — REFERENCE solution (do NOT import or read during the exercise)
 */

function buildFewShotTemplate(examples, task, input) {
  let prompt = `Task: ${task}\n\nExamples:\n`;

  for (let i = 0; i < examples.length; i++) {
    prompt += `Input: ${examples[i].input}\nOutput: ${examples[i].output}\n\n`;
  }

  prompt += `Now:\nInput: ${input}\nOutput:`;

  return prompt;
}

module.exports = { buildFewShotTemplate };
