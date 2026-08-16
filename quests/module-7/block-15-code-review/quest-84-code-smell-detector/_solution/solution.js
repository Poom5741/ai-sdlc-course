/**
 * Quest 15.2: Code Smell Detector — REFERENCE solution
 */

function detectSmells(code) {
  if (!code) return [];
  const results = [];
  const lines = code.split('\n');

  // Track function ranges to avoid double-flagging nested helpers
  const funcRanges = [];

  // Detect long functions (>30 lines)
  const funcRegex = /function\s+\w*\s*\([^)]*\)\s*\{/g;
  let match;
  while ((match = funcRegex.exec(code)) !== null) {
    const startIdx = match.index;
    const startLine = code.substring(0, startIdx).split('\n').length;
    let depth = 0;
    let endLine = startLine;
    for (let i = startIdx; i < code.length; i++) {
      if (code[i] === '{') depth++;
      if (code[i] === '}') {
        depth--;
        if (depth === 0) {
          endLine = code.substring(0, i + 1).split('\n').length;
          break;
        }
      }
    }
    funcRanges.push({ start: startLine, end: endLine });
    if (endLine - startLine > 30) {
      results.push({ type: 'long-function', line: startLine, message: `Function is ${endLine - startLine} lines long (>30)` });
    }
  }

  // Detect deep nesting (>3 levels = 8+ spaces indent)
  lines.forEach((line, i) => {
    const indent = line.search(/\S/);
    if (indent >= 8) {
      // Skip if inside a long function that's already flagged
      const inFlaggedFunc = funcRanges.some(r => r.end - r.start > 30 && i + 1 >= r.start && i + 1 <= r.end);
      if (!inFlaggedFunc) {
        results.push({ type: 'deep-nesting', line: i + 1, message: `Nesting depth >3 at line ${i + 1}` });
      }
    }
  });

  // Detect god objects (objects with >10 methods)
  const objMethods = (code.match(/\w+\s*\([^)]*\)\s*[{]|\(\)\s*[{]/g) || []).length;
  if (objMethods > 10) {
    results.push({ type: 'god-object', line: 1, message: `Object has ${objMethods} methods (>10)` });
  }

  // Detect magic strings in conditionals
  lines.forEach((line, i) => {
    if (/if\s*\(|else\s+if\s*\(/.test(line)) {
      const strMatches = line.match(/["']([^"']+)["']/g);
      if (strMatches && strMatches.length > 0) {
        results.push({ type: 'magic-string', line: i + 1, message: `Magic string ${strMatches[0]} in conditional` });
      }
    }
  });

  return results;
}

module.exports = { detectSmells };
