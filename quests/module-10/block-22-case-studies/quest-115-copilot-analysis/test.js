/**
 * Quest 22.1: GitHub Copilot Workflow Analysis — design-doc validator
 */

const { existsSync, readFileSync } = require('fs');
const path = require('path');

const DOC_PATH = path.join(__dirname, 'copilot-analysis.md');

let passed = 0;
let failed = 0;

console.log('Quest 22.1: Copilot Workflow Analysis — design-doc validator\n');

function check(label, condition) {
  if (condition) {
    console.log(`PASS ${label}`);
    passed++;
  } else {
    console.log(`FAIL ${label}`);
    failed++;
  }
}

check('copilot-analysis.md exists', existsSync(DOC_PATH));

if (!existsSync(DOC_PATH)) {
  console.log(`\nResults: ${passed} passed, ${failed} failed`);
  process.exit(1);
}

const content = readFileSync(DOC_PATH, 'utf-8');

check('current usage patterns', /current.*usage|usage.*pattern|how.*used/i.test(content));
check('acceptance rate analysis', /accept.*rate|acceptance|suggestion.*accepted/i.test(content));
check('productivity metrics', /productiv|metric|lines.*written|time.*saved/i.test(content));
check('optimization strategies', /optimi|improve|strateg/i.test(content));
check('anti-patterns', /anti.?pattern|over.?reli|avoid/i.test(content));
check('team guidelines', /team.*guideline|best.*practice|guideline/i.test(content));
check('at least 500 characters', content.length >= 500);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 22.1 complete. You analyzed Copilot usage patterns.');
  process.exit(0);
}
process.exit(1);
