/**
 * Quest 23.1: REFERENCE solution (do NOT read during the exercise)
 *
 * Validates a commit sequence with proper user config.
 */

function validateCommitSequence(commits, config) {
  const errors = [];

  // Validate user config — naive AI skips this check
  if (!config || typeof config.name !== 'string' || config.name.trim() === '') {
    errors.push('user config name must be a non-empty string');
  }
  if (!config || typeof config.email !== 'string' || config.email.trim() === '') {
    errors.push('user config email must be a non-empty string');
  }

  if (commits.length === 0) {
    return { valid: errors.length === 0, errors };
  }

  // First commit must have parent === null
  if (commits[0].parent !== null) {
    errors.push('first commit must have parent null (root commit)');
  }

  // Validate each commit
  for (let i = 0; i < commits.length; i++) {
    const commit = commits[i];

    if (!commit.hash || typeof commit.hash !== 'string' || commit.hash.trim() === '') {
      errors.push(`commit ${i} has empty or invalid hash`);
    }
    if (!commit.message || typeof commit.message !== 'string' || commit.message.trim() === '') {
      errors.push(`commit ${i} has empty or invalid message`);
    }

    // Subsequent commits must reference parent
    if (i > 0) {
      if (commit.parent !== commits[i - 1].hash) {
        errors.push(`commit ${i} parent "${commit.parent}" does not match previous commit hash "${commits[i - 1].hash}"`);
      }
    }
  }

  return { valid: errors.length === 0, errors };
}

module.exports = { validateCommitSequence };
