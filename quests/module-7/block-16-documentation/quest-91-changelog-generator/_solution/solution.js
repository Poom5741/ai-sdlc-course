/**
 * Quest 16.4: Changelog Generator — REFERENCE solution
 */

function generateChangelog(commits) {
  if (!commits || commits.length === 0) {
    return '# Changelog\n\nNo changes recorded.\n';
  }

  const sections = {
    breaking: [],
    feat: [],
    fix: [],
    docs: [],
    refactor: [],
    chore: [],
    other: [],
  };

  for (const commit of commits) {
    const msg = commit.message;
    const entry = `- ${msg} (${commit.hash}) ${commit.date}`;

    if (/^feat!:/i.test(msg)) {
      sections.breaking.push(entry);
    } else if (/^feat:/i.test(msg)) {
      sections.feat.push(entry);
    } else if (/^fix:/i.test(msg)) {
      sections.fix.push(entry);
    } else if (/^docs:/i.test(msg)) {
      sections.docs.push(entry);
    } else if (/^refactor:/i.test(msg)) {
      sections.refactor.push(entry);
    } else if (/^chore:/i.test(msg)) {
      sections.chore.push(entry);
    } else {
      sections.other.push(entry);
    }
  }

  const lines = ['# Changelog\n'];

  if (sections.breaking.length) {
    lines.push('## ⚠ Breaking Changes\n');
    lines.push(...sections.breaking, '');
  }
  if (sections.feat.length) {
    lines.push('## Features\n');
    lines.push(...sections.feat, '');
  }
  if (sections.fix.length) {
    lines.push('## Bug Fixes\n');
    lines.push(...sections.fix, '');
  }
  if (sections.docs.length) {
    lines.push('## Documentation\n');
    lines.push(...sections.docs, '');
  }
  if (sections.refactor.length) {
    lines.push('## Refactors\n');
    lines.push(...sections.refactor, '');
  }
  if (sections.chore.length) {
    lines.push('## Chores\n');
    lines.push(...sections.chore, '');
  }
  if (sections.other.length) {
    lines.push('## Other Changes\n');
    lines.push(...sections.other, '');
  }

  return lines.join('\n');
}

module.exports = { generateChangelog };
