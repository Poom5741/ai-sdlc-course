/**
 * Quest 24.2: REFERENCE solution (do NOT read during the exercise)
 *
 * Generates PR descriptions with type badges, changes, and testing instructions.
 */

const TYPE_BADGES = {
  feat: '[Feature]',
  fix: '[Fix]',
  refactor: '[Refactor]',
  docs: '[Docs]',
  test: '[Test]',
  chore: '[Chore]',
};

function generatePRDescription(type, title, changes, breaking) {
  const badge = TYPE_BADGES[type] || `[${type}]`;
  const changesList = changes.map(c => `- ${c}`).join('\n');
  const breakingNotice = breaking ? '\n\n⚠️ **BREAKING CHANGE**: This PR introduces breaking changes that may require migration.\n' : '';

  const description = `## ${badge} ${title}

### Changes
${changesList}
${breakingNotice}
### How to Test

1. Pull this branch
2. Run \`npm install\` and \`npm test\`
3. Verify the changes work as expected
4. Test edge cases mentioned in the changes above
`;

  return {
    description,
    hasHowToTest: /how to test/i.test(description),
    hasBreakingNotice: breaking,
  };
}

module.exports = { generatePRDescription };
