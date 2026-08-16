/**
 * Quest 24.4: REFERENCE solution (do NOT read during the exercise)
 *
 * Reviews code diffs for bugs, style issues, and suggestions.
 */

function reviewDiff(diff) {
  const comments = [];
  const lines = diff.split('\n');

  lines.forEach((line, idx) => {
    // Only review added lines
    if (!line.startsWith('+') || line.startsWith('+++')) return;

    const content = line.substring(1);

    // Hardcoded secrets
    if (/["'](sk-|ak-|secret|password|api.?key|token)[\w-]*["']/i.test(content) ||
        /(?:API_KEY|SECRET|PASSWORD|TOKEN)\s*=\s*["']/i.test(content)) {
      comments.push({ line: idx, severity: 'error', message: 'Hardcoded secret detected — use environment variables' });
    }

    // Off-by-one: <= arr.length instead of < arr.length
    if (/<=\s*\w+\.length/.test(content)) {
      comments.push({ line: idx, severity: 'error', message: 'Possible off-by-one error: using <= instead of < with .length' });
    }

    // Missing null check — look for property access on variable without guard
    // Match patterns like: user.name, user.name.toUpperCase()
    const propAccess = content.match(/\b([a-zA-Z_]\w*)\.([a-zA-Z_]\w*)/);
    if (propAccess) {
      const varName = propAccess[1];
      // Skip if this is a declaration or import statement
      if (/^(const|let|var|function|class|import|export)\s/.test(content.trim())) {
        // skip
      } else {
        // Check ALL preceding lines for null guard
        const preceding = lines.slice(0, idx).join('\n');
        const hasGuard = preceding.includes(`if (${varName}`) ||
                         preceding.includes(`if (${varName} !`) ||
                         preceding.includes(`${varName} != null`) ||
                         preceding.includes(`${varName} !== null`) ||
                         preceding.includes(`${varName} !== undefined`) ||
                         preceding.includes(`!${varName}`) ||
                         preceding.includes(`${varName} &&`);

        if (!hasGuard) {
          comments.push({ line: idx, severity: 'error', message: `Missing null check for ${varName} before accessing .${propAccess[2]}` });
        }
      }
    }

    // Console.log left in
    if (/console\.log/.test(content)) {
      comments.push({ line: idx, severity: 'warning', message: 'console.log left in code — remove before merging' });
    }

    // TODO/FIXME
    if (/TODO|FIXME|HACK|XXX/.test(content)) {
      comments.push({ line: idx, severity: 'info', message: 'TODO/FIXME comment found — address before merging' });
    }

    // Missing error handling in async
    if (/await\s+\w+/.test(content)) {
      const surrounding = lines.slice(Math.max(0, idx - 3), idx + 4).join('\n');
      if (!/try|catch|\.catch/.test(surrounding)) {
        comments.push({ line: idx, severity: 'warning', message: 'Async call without error handling — add try/catch or .catch()' });
      }
    }
  });

  const approved = !comments.some(c => c.severity === 'error');

  return { comments, approved };
}

module.exports = { reviewDiff };
