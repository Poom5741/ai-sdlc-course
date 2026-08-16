/**
 * Quest 15.4: Performance Review Analyzer — REFERENCE solution
 */

function analyzePerformance(code) {
  if (!code) return [];
  const results = [];
  const lines = code.split('\n');

  // N+1 detection: loop containing DB query
  const inLoop = (lineIdx) => {
    let depth = 0;
    for (let i = lineIdx - 1; i >= 0; i--) {
      if (lines[i].match(/\b(for|while)\s*\(/)) return true;
    }
    return false;
  };

  lines.forEach((line, i) => {
    // N+1: DB query inside loop
    if (/\.(query|find|findOne)\s*\(/.test(line) && inLoop(i)) {
      results.push({ type: 'n-plus-one', line: i + 1, severity: 'high', suggestion: 'Batch queries outside the loop' });
    }

    // Sync blocking — only inside functions
    if (/readFileSync|writeFileSync/.test(line)) {
      // Check if inside a function (rough heuristic: previous lines have function keyword)
      let insideFunc = false;
      for (let j = i - 1; j >= 0 && j > i - 20; j--) {
        if (/function\s|=>\s*\{/.test(lines[j])) { insideFunc = true; break; }
        if (lines[j].match(/^\S/) && j < i - 1) break; // top-level
      }
      if (insideFunc) {
        results.push({ type: 'sync-blocking', line: i + 1, severity: 'high', suggestion: 'Use fs.promises or async alternatives' });
      }
    }

    // Memory leak: addEventListener without corresponding remove
    if (/addEventListener/.test(line)) {
      results.push({ type: 'memory-leak', line: i + 1, severity: 'medium', suggestion: 'Ensure removeEventListener is called on cleanup' });
    }

    // Large payload: JSON.parse(JSON.stringify())
    if (/JSON\.parse\(JSON\.stringify\(/.test(line)) {
      results.push({ type: 'large-payload', line: i + 1, severity: 'medium', suggestion: 'Use structuredClone() or a deep clone library' });
    }
  });

  return results;
}

module.exports = { analyzePerformance };
