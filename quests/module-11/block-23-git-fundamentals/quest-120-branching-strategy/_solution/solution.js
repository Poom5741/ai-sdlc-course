/**
 * Quest 23.2: REFERENCE solution (do NOT read during the exercise)
 *
 * Determines merge strategy: fast-forward, merge, or rebase.
 */

function planMergeStrategy(source, target, history) {
  const sourceSet = new Set(source.commits);
  const targetSet = new Set(target.commits);

  // Check if source base (first commit) is the tip of target
  const sourceBase = source.commits[0];
  const targetTip = target.commits[target.commits.length - 1];

  if (sourceBase === targetTip) {
    return { strategy: 'fast-forward', reason: 'source base is target tip — can fast-forward' };
  }

  // Check if target is ahead (source is behind)
  const sourceTip = source.commits[source.commits.length - 1];
  if (targetSet.has(sourceTip) && !sourceSet.has(targetTip)) {
    return { strategy: 'up-to-date', reason: 'target is already ahead of source' };
  }

  // Branches diverged — need merge
  // Check for conflicts: both modify same file
  const conflicts = [];
  const sourceFiles = new Set();
  const targetFiles = new Set();

  for (const hash of source.commits) {
    const commit = history[hash];
    if (commit && commit.files) {
      commit.files.forEach(f => sourceFiles.add(f));
    }
  }
  for (const hash of target.commits) {
    const commit = history[hash];
    if (commit && commit.files) {
      commit.files.forEach(f => targetFiles.add(f));
    }
  }

  for (const file of sourceFiles) {
    if (targetFiles.has(file)) {
      conflicts.push(file);
    }
  }

  if (conflicts.length > 0) {
    return { strategy: 'merge', reason: 'branches diverged with conflicting changes', conflicts };
  }

  return { strategy: 'merge', reason: 'branches diverged — merge required', conflicts: [] };
}

module.exports = { planMergeStrategy };
