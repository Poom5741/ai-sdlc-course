/**
 * Quest 24.1: REFERENCE solution (do NOT read during the exercise)
 *
 * Creates GitHub issue JSON with proper structure and templates.
 */

const TYPE_LABELS = {
  bug: 'bug',
  feature: 'enhancement',
  task: 'chore',
};

const PRIORITY_LABELS = {
  high: 'P0',
  medium: 'P1',
  low: 'P2',
};

function createIssue(title, description, type, priority) {
  const labels = [];

  if (TYPE_LABELS[type]) {
    labels.push(TYPE_LABELS[type]);
  }
  if (PRIORITY_LABELS[priority]) {
    labels.push(PRIORITY_LABELS[priority]);
  }

  const body = `## Description

${description}

## Reproduction Steps

1. (Describe the steps to reproduce)
2. (Include environment details)
3. (Include any error messages)

## Expected Behavior

(What should happen instead)

## Actual Behavior

(What actually happens)
`;

  return {
    title,
    body,
    labels,
    assignees: [],
    state: 'open',
  };
}

module.exports = { createIssue };
