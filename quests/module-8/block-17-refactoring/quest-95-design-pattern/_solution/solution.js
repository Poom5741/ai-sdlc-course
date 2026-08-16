/**
 * Quest 17.3: Design Pattern Applicator — REFERENCE solution
 */

function suggestPattern(code) {
  if (!code || code.trim().length === 0) {
    return { pattern: 'none', reason: 'Empty code', confidence: 0 };
  }

  // Strategy: multiple if/else on same variable
  const strategyMatch = code.match(/if\s*\(\w+\s*===?\s*["'][^"']+["']\)\s*\{[^}]*\}\s*(?:else\s+if)/);
  if (strategyMatch) {
    return { pattern: 'strategy', reason: 'Multiple conditional branches on same variable', confidence: 85 };
  }

  // Observer: on/emit pattern
  if (/\bon\s*\(/.test(code) && /\bemit\s*\(/.test(code)) {
    return { pattern: 'observer', reason: 'Event listener registration and emission pattern', confidence: 90 };
  }

  // Factory: create function returning different types based on input
  const factoryMatch = code.match(/function\s+create\w*\s*\([^)]*\)\s*\{[\s\S]*if\s*\(\w+\s*===?\s*["'][^"']+["']\)\s*return\s+new\s+\w+/);
  if (factoryMatch) {
    return { pattern: 'factory', reason: 'Create function returns different types based on input', confidence: 88 };
  }

  // Singleton: lazy-initialized getInstance
  if (/getInstance\s*\(/.test(code) && /static\s+instance/.test(code)) {
    return { pattern: 'singleton', reason: 'Lazy-initialized static instance pattern', confidence: 92 };
  }

  return { pattern: 'none', reason: 'No recognized pattern', confidence: 10 };
}

module.exports = { suggestPattern };
