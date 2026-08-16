/**
 * Quest 23.5: REFERENCE solution (do NOT read during the exercise)
 *
 * Simulates interactive rebase: pick, squash, edit, reorder.
 */

function simulateRebase(commits, operations) {
  // Deep copy to avoid mutation
  let result = commits.map(c => ({ ...c }));
  const dropped = [];

  for (const op of operations) {
    const targetIdx = result.findIndex(c => c.hash === op.targetHash);
    if (targetIdx === -1) {
      dropped.push(op.targetHash);
      continue;
    }

    switch (op.action) {
      case 'pick':
        // Keep as-is, no change needed
        break;

      case 'squash': {
        // Combine into the previous commit
        if (targetIdx === 0) {
          // Can't squash first commit into nothing
          break;
        }
        const prev = result[targetIdx - 1];
        const target = result[targetIdx];
        prev.message = `${prev.message} + ${target.message}`;
        // Remove the squashed commit
        result.splice(targetIdx, 1);
        break;
      }

      case 'edit': {
        const target = result[targetIdx];
        target.message = `[edited] ${target.message}`;
        break;
      }

      case 'reorder': {
        const target = result[targetIdx];
        const beforeIdx = result.findIndex(c => c.hash === op.beforeHash);
        if (beforeIdx === -1 || beforeIdx === targetIdx) break;
        // Remove target from current position
        result.splice(targetIdx, 1);
        // Find new index (adjusted after removal)
        const newIdx = result.findIndex(c => c.hash === op.beforeHash);
        result.splice(newIdx, 0, target);
        break;
      }
    }
  }

  return {
    result,
    dropped,
    message: dropped.length === 0 ? 'rebase complete' : `rebase complete with ${dropped.length} dropped`,
  };
}

module.exports = { simulateRebase };
