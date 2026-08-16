/**
 * Quest 16.2: README Generator — REFERENCE solution
 */

function generateReadme(files) {
  const lines = [];
  lines.push('# Project\n');
  lines.push('## Overview\n');
  lines.push('A project generated from codebase analysis.\n');

  lines.push('## Project Structure\n');
  lines.push('```');

  if (files.length === 0) {
    lines.push('(empty project)');
  } else {
    // Build tree with hierarchy
    const sorted = [...files].sort((a, b) => a.path.localeCompare(b.path));
    for (const file of sorted) {
      const depth = file.path.split('/').length - 1;
      const indent = '  '.repeat(depth);
      const prefix = file.type === 'dir' ? '📁 ' : '📄 ';
      const desc = file.description ? ` — ${file.description}` : '';
      lines.push(`${indent}${prefix}${file.name}${desc}`);
    }
  }

  lines.push('```\n');

  lines.push('## Getting Started\n');
  lines.push('1. Clone the repository');
  lines.push('2. Install dependencies: `npm install`');
  lines.push('3. Run: `npm start`\n');

  lines.push('## License\n');
  lines.push('MIT\n');

  return lines.join('\n');
}

module.exports = { generateReadme };
