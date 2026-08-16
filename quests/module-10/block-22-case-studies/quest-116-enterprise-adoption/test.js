/**
 * Quest 22.2: Enterprise AI Adoption Plan — design-doc validator
 */

const { existsSync, readFileSync } = require('fs');
const path = require('path');

const DOC_PATH = path.join(__dirname, 'adoption-plan.md');

let passed = 0;
let failed = 0;

console.log('Quest 22.2: Enterprise AI Adoption Plan — design-doc validator\n');

function check(label, condition) {
  if (condition) {
    console.log(`PASS ${label}`);
    passed++;
  } else {
    console.log(`FAIL ${label}`);
    failed++;
  }
}

check('adoption-plan.md exists', existsSync(DOC_PATH));

if (!existsSync(DOC_PATH)) {
  console.log(`\nResults: ${passed} passed, ${failed} failed`);
  process.exit(1);
}

const content = readFileSync(DOC_PATH, 'utf-8');

check('executive summary', /executive.*summary|why.*AI|expected.*ROI/i.test(content));
check('current state assessment', /current.*state|assessment|existing.*tool/i.test(content));
check('tool selection criteria', /selection.*criteria|evaluat|criteria/i.test(content));
check('pilot program', /pilot|trial|small.?scale/i.test(content));
check('rollout strategy', /rollout|deploy|phase/i.test(content));
check('training program', /train|upskill|learn/i.test(content));
check('governance framework', /govern|polic|security/i.test(content));
check('success metrics', /success.*metric|KPI|measure/i.test(content));
check('at least 600 characters', content.length >= 600);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 22.2 complete. You wrote an enterprise AI adoption plan.');
  process.exit(0);
}
process.exit(1);
