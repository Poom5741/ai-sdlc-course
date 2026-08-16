/**
 * Quest 1.4: Token Counter — REFERENCE solution (do NOT import or read during the exercise)
 *
 * This file exists so a stuck learner can peek at ONE way to solve the quest.
 * It is not imported by test.js. It is not meant to be copied.
 */

function countTokens(text) {
  if (text === '') return 0;

  const tokens = [];
  let current = '';
  let currentIsPunct = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const isPunct = /[.,!?;:'"()[\]{}]/.test(ch);
    const isSpace = ch === ' ' || ch === '\t' || ch === '\n';
    const isWordChar = /[a-zA-Z0-9]/.test(ch);

    if (isSpace) {
      if (current) {
        tokens.push(current);
        current = '';
        currentIsPunct = false;
      }
      // Count space as token only if surrounded by spaces or string boundaries
      // (not adjacent to any word or punctuation character)
      const prevIsContent = i > 0 && !/[\s]/.test(text[i - 1]);
      const nextIsContent = i < text.length - 1 && !/[\s]/.test(text[i + 1]);
      if (!prevIsContent && !nextIsContent) {
        tokens.push(ch);
      }
    } else if (isPunct) {
      if (currentIsPunct) {
        // Group consecutive punctuation into one token
        current += ch;
      } else {
        if (current) {
          tokens.push(current);
          current = '';
        }
        current = ch;
        currentIsPunct = true;
      }
    } else {
      if (currentIsPunct) {
        tokens.push(current);
        current = '';
        currentIsPunct = false;
      }
      current += ch;
    }
  }

  if (current) {
    tokens.push(current);
  }

  return tokens.length;
}

module.exports = { countTokens };
