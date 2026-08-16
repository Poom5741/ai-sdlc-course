/**
 * Quest 20.2: Multimodal Input Processor — REFERENCE solution
 */

const IMAGE_TOKEN_COST = 1000;
const CHARS_PER_TOKEN = 4;
const MAX_TOKENS = 4000;

function processMultimodal(inputs) {
  if (!inputs || inputs.length === 0) {
    return { textParts: [], imageRefs: [], combined: '', tokens: 0 };
  }

  const textParts = [];
  const imageRefs = [];
  const combinedParts = [];
  let tokens = 0;

  for (const input of inputs) {
    if (input.type === 'text') {
      textParts.push(input.content);
      const textTokens = Math.ceil(input.content.length / CHARS_PER_TOKEN);
      tokens += textTokens;
      combinedParts.push(input.content);
    } else if (input.type === 'image') {
      imageRefs.push({ content: input.content, metadata: input.metadata || {} });
      tokens += IMAGE_TOKEN_COST;
      combinedParts.push('[IMAGE]');
    }
  }

  return {
    textParts,
    imageRefs,
    combined: combinedParts.join(' '),
    tokens: Math.min(tokens, MAX_TOKENS),
  };
}

module.exports = { processMultimodal };
