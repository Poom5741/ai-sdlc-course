/**
 * Quest 24.3: GitHub Project Board Builder — design-doc validator
 *
 * Validates that project-board-design.md exists and has required sections.
 */

const { existsSync, readFileSync } = require('fs');
const path = require('path');

const DOC_PATH = path.join(__dirname, 'project-board-design.md');

let passed = 0;
let failed = 0;

console.log('Quest 24.3: GitHub Project Board Builder — design-doc validator\n');

function check(label, condition) {
  if (condition) {
    console.log(`PASS ${label}`);
    passed++;
  } else {
    console.log(`FAIL ${label}`);
    failed++;
  }
}

check('project-board-design.md exists', existsSync(DOC_PATH));

if (!existsSync(DOC_PATH)) {
  console.log(`\nResults: ${passed} passed, ${failed} failed`);
  process.exit(1);
}

const content = readFileSync(DOC_PATH, 'utf-8');

check('project overview', /project.*overview|purpose|team/i.test(content));
check('columns or statuses', /column|status|todo|in.?progress|done/i.test(content));
check('custom fields', /custom.*field|dropdown|number.*field|date.*field/i.test(content));
check('views (board, table, roadmap)', /view|board.*view|table.*view|roadmap/i.test(content));
check('automation rules', /automat|auto.?move|auto.?assign|workflow/i.test(content));
check('swimlanes', /swimlane|by.*priority|by.*assignee|by.*iteration/i.test(content));
check('at least 500 characters', content.length >= 500);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 24.3 complete. You designed a GitHub Projects board.');
  process.exit(0);
}
process.exit(1);
