/**
 * Quest 15.1: Automated PR Reviewer — REFERENCE solution (do NOT import during exercise)
 */

function reviewDiff(diff) {
  if (!diff) return [];
  const results = [];
  const lines = diff.split('\n');

  lines.forEach((line, i) => {
    const content = line.replace(/^[+-]\s?/, '');

    // console.log detection
    if (/console\.log/.test(content)) {
      results.push({ line: i + 1, severity: 'warning', message: 'Remove console.log before merging' });
    }

    // TODO/FIXME/HACK
    if (/\b(TODO|FIXME|HACK)\b/.test(content)) {
      const match = content.match(/\b(TODO|FIXME|HACK)\b/)[1];
      results.push({ line: i + 1, severity: 'info', message: `Found ${match} comment — consider resolving` });
    }

    // Magic numbers (not 0, 1, -1)
    const numMatches = content.match(/(?<![a-zA-Z_])\b(-?\d+)\b/g);
    if (numMatches) {
      for (const num of numMatches) {
        const val = parseInt(num, 10);
        if (val !== 0 && val !== 1 && val !== -1 && Math.abs(val) > 1) {
          results.push({ line: i + 1, severity: 'warning', message: `Magic number ${num} — consider extracting to a constant` });
        }
      }
    }

    // Long line
    if (line.length > 120) {
      results.push({ line: i + 1, severity: 'info', message: `Line exceeds 120 chars (${line.length})` });
    }
  });

  return results;
}

module.exports = { reviewDiff };
