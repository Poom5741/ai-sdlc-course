/**
 * Quest 16.5: Onboarding Doc Writer — REFERENCE solution
 */

function generateOnboarding(info) {
  const lines = [];

  lines.push(`# Welcome to ${info.name}\n`);
  lines.push(`## What is this project?\n`);
  lines.push(`${info.description}\n`);

  lines.push(`## Tech Stack\n`);
  for (const item of (info.stack || [])) {
    // Ensure each item has detail (version/tool info)
    if (/\d|v\d/.test(item)) {
      lines.push(`- ${item}`);
    } else {
      lines.push(`- ${item} — development tool`);
    }
  }
  lines.push('');

  lines.push(`## Quick Start\n`);
  lines.push('```bash');
  for (const step of (info.setup || [])) {
    lines.push(step);
  }
  lines.push('```\n');

  lines.push(`## Code Conventions\n`);
  for (const conv of (info.conventions || [])) {
    lines.push(`- ${conv}`);
  }
  lines.push('');

  lines.push(`## Key Files\n`);
  lines.push('| Path | Purpose |');
  lines.push('|------|---------|');
  for (const file of (info.keyFiles || [])) {
    lines.push(`| \`${file.path}\` | ${file.purpose} |`);
  }
  lines.push('');

  lines.push(`## First Task Suggestions\n`);
  lines.push('1. Fix a "good first issue" from the issue tracker');
  lines.push('2. Add a test for an untested function');
  lines.push('3. Improve documentation for a confusing function');
  lines.push('');

  lines.push(`## Who to Ask\n`);
  lines.push('- **Architecture questions**: Ask the tech lead');
  lines.push('- **Process questions**: Ask the team lead');
  lines.push('- **Tooling questions**: Ask DevOps');
  lines.push('');

  return lines.join('\n');
}

module.exports = { generateOnboarding };
