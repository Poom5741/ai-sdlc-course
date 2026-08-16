/**
 * Quest 23.3: REFERENCE solution (do NOT read during the exercise)
 *
 * Formats conventional commit messages with proper validation.
 */

const VALID_TYPES = ['feat', 'fix', 'chore', 'docs', 'style', 'refactor', 'test', 'perf', 'ci', 'build'];

// Past tense patterns that naive AI uses
const PAST_TENSE = /^(added|updated|fixed|changed|removed|deleted|modified|implemented|created|made|did|had|was|were|got|went|ran|wrote|set)\b/i;

function formatConventionalCommit(type, scope, description, body) {
  const errors = [];

  // Validate type
  if (!VALID_TYPES.includes(type)) {
    errors.push(`invalid type "${type}" — must be one of: ${VALID_TYPES.join(', ')}`);
  }

  // Validate description
  if (!description || description.trim() === '') {
    errors.push('description must not be empty');
  } else {
    if (description.length > 72) {
      errors.push(`description must be 72 chars or less (got ${description.length})`);
    }
    if (description[0] !== description[0].toLowerCase()) {
      errors.push('description must start with lowercase');
    }
    if (description.endsWith('.')) {
      errors.push('description must not end with a period');
    }
    // Check for past tense — edge case naive AI gets wrong
    if (PAST_TENSE.test(description)) {
      errors.push('description must use imperative mood, not past tense (e.g. "add" not "added")');
    }
  }

  const subject = scope ? `${type}(${scope}): ${description}` : `${type}: ${description}`;

  return {
    subject,
    body: body || '',
    isValid: errors.length === 0,
    errors,
  };
}

module.exports = { formatConventionalCommit };
