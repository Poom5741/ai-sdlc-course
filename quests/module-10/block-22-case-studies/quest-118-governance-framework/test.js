/**
 * Quest 22.4: Team AI Governance Framework — design-doc validator
 */

const { existsSync, readFileSync } = require('fs');
const path = require('path');

const DOC_PATH = path.join(__dirname, 'governance-framework.md');

let passed = 0;
let failed = 0;

console.log('Quest 22.4: Team AI Governance Framework — design-doc validator\n');

function check(label, condition) {
  if (condition) {
    console.log(`PASS ${label}`);
    passed++;
  } else {
    console.log(`FAIL ${label}`);
    failed++;
  }
}

check('governance-framework.md exists', existsSync(DOC_PATH));

if (!existsSync(DOC_PATH)) {
  console.log(`\nResults: ${passed} passed, ${failed} failed`);
  process.exit(1);
}

const content = readFileSync(DOC_PATH, 'utf-8');

check('purpose and scope', /purpose|scope|why.*govern/i.test(content));
check('approved AI tools', /approved.*tool|allowed.*tool|tool.*list/i.test(content));
check('usage guidelines', /usage.*guideline|guideline|how.*use/i.test(content));
check('code review standards', /code.*review|review.*standard|AI.*generat.*code/i.test(content));
check('security and privacy', /security|privacy|confidential|secret/i.test(content));
check('IP and attribution', /IP|attribut|copyright|ownership|licens/i.test(content));
check('monitoring and compliance', /monitor|compliance|audit|adherence/i.test(content));
check('incident response for AI', /incident.*response|AI.*issue|when.*AI.*caus/i.test(content));
check('at least 600 characters', content.length >= 600);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 22.4 complete. You designed a team AI governance framework.');
  process.exit(0);
}
process.exit(1);
