/**
 * Quest 23.4: REFERENCE solution (do NOT read during the exercise)
 *
 * Analyzes git history for bad patterns: force pushes, reverts, squashes.
 */

function analyzeGitHistory(logs) {
  const warnings = [];
  const contributors = {};

  if (logs.length === 0) {
    return {
      contributors,
      warnings,
      stats: { totalCommits: 0, uniqueAuthors: 0, dateRange: '' },
    };
  }

  // Track contributors
  for (const log of logs) {
    contributors[log.author] = (contributors[log.author] || 0) + 1;
  }

  // Track parent chains per author to detect force pushes
  const authorLastHash = {};

  for (let i = 0; i < logs.length; i++) {
    const log = logs[i];

    // Check for force push: parent doesn't match previous commit by same author
    if (log.parent && authorLastHash[log.author]) {
      if (log.parent !== authorLastHash[log.author]) {
        warnings.push(`force push detected: ${log.author} commit ${log.hash} has parent ${log.parent} but previous was ${authorLastHash[log.author]}`);
      }
    }
    authorLastHash[log.author] = log.hash;

    // Check message patterns
    const msg = log.message || '';
    if (/revert/i.test(msg)) {
      warnings.push(`revert detected in commit ${log.hash}: "${msg}"`);
    }
    if (/squash|fixup/i.test(msg)) {
      warnings.push(`squash detected in commit ${log.hash}: "${msg}"`);
    }
    if (/^merge/i.test(msg)) {
      warnings.push(`merge commit detected: ${log.hash}`);
    }
  }

  // Compute date range
  const dates = logs.map(l => l.date).filter(Boolean).sort();
  const dateRange = dates.length > 0 ? `${dates[0]} to ${dates[dates.length - 1]}` : '';

  return {
    contributors,
    warnings,
    stats: {
      totalCommits: logs.length,
      uniqueAuthors: Object.keys(contributors).length,
      dateRange,
    },
  };
}

module.exports = { analyzeGitHistory };
