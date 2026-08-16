/**
 * Quest 6.3: Chain-of-Density Optimizer — REFERENCE solution (do NOT import or read during the exercise)
 */

const FILLERS = /\b(very|really|basically|actually|just|quite|simply|literally|definitely|absolutely|certainly|honestly|obviously|essentially|fundamentally|importantly)\b/gi;
const REDUNDANT = [
  [/\bin order to\b/gi, 'to'],
  [/\bdue to the fact that\b/gi, 'because'],
  [/\bat this point in time\b/gi, 'now'],
  [/\bfor the purpose of\b/gi, 'to'],
  [/\bin the event that\b/gi, 'if'],
  [/\bwith regard to\b/gi, 'about'],
  [/\bprior to\b/gi, 'before'],
];

function tokenize(text) {
  return text.split(/\s+/).filter(w => w.length > 0);
}

function optimizeDensity(text, targetRatio = 0.5) {
  if (!text) return { optimized: '', originalTokens: 0, optimizedTokens: 0, ratio: 0 };

  const originalTokens = tokenize(text).length;
  let optimized = text;

  // Remove filler words
  optimized = optimized.replace(FILLERS, '');

  // Replace redundant phrases
  for (const [pattern, replacement] of REDUNDANT) {
    optimized = optimized.replace(pattern, replacement);
  }

  // Clean up multiple spaces
  optimized = optimized.replace(/\s{2,}/g, ' ').trim();

  const optimizedTokens = tokenize(optimized).length;
  const ratio = optimizedTokens / originalTokens;

  // If still over target, truncate (simple approach)
  if (ratio > targetRatio && optimizedTokens > 0) {
    const words = tokenize(optimized);
    const targetCount = Math.ceil(originalTokens * targetRatio);
    optimized = words.slice(0, targetCount).join(' ');
  }

  return {
    optimized,
    originalTokens,
    optimizedTokens: tokenize(optimized).length,
    ratio: Math.round((tokenize(optimized).length / originalTokens) * 100) / 100,
  };
}

module.exports = { optimizeDensity };
