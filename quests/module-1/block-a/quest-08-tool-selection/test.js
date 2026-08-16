/**
 * Quest 1.8: AI Tool Selection Matrix — design-doc validator
 *
 * Validates that tool-matrix.md exists and contains required sections.
 *
 * Required in tool-matrix.md:
 *   1. at least 3 tools compared
 *   2. comparison criteria
 *   3. scoring system
 *   4. use case recommendations
 *   5. limitations
 *   6. at least 400 characters
 *
 * Run: node test.js
 */

const { existsSync, readFileSync } = require('fs');
const path = require('path');

const DOC_PATH = path.join(__dirname, 'tool-matrix.md');

let passed = 0;
let failed = 0;

console.log('Quest 1.8: AI Tool Selection Matrix — design-doc validator\n');

function check(label, condition) {
  if (condition) {
    console.log(`PASS ${label}`);
    passed++;
  } else {
    console.log(`FAIL ${label}`);
    failed++;
  }
}

check('tool-matrix.md exists', existsSync(DOC_PATH));

if (!existsSync(DOC_PATH)) {
  console.log(`\nResults: ${passed} passed, ${failed} failed`);
  console.log('\nHint: create tool-matrix.md comparing AI coding tools.');
  process.exit(1);
}

const content = readFileSync(DOC_PATH, 'utf-8');

// Count tool names mentioned (at least 3 distinct tools)
const toolNames = ['copilot', 'claude', 'cursor', 'codewhisperer', 'codeium', 'tabnine', 'chatgpt', 'gpt'];
const toolsFound = toolNames.filter(t => content.toLowerCase().includes(t));
check(`at least 3 AI tools compared (found ${toolsFound.length})`, toolsFound.length >= 3);

check('comparison criteria', /criteria|comparison|metric|evaluate/i.test(content));
check('scoring system', /score|rating|1-5|rating scale|points/i.test(content));
check('use case recommendations', /use case|recommend|best for|when to use/i.test(content));
check('limitations', /limitation|weakness|drawback|cons|not good/i.test(content));
check('at least 400 characters', content.length >= 400);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 1.8 complete. You built a tool selection matrix.');
  process.exit(0);
}

console.log('\nHint: tool-matrix.md must compare 3+ tools with criteria, scoring, recommendations, and limitations.');
process.exit(1);
