/**
 * Quest 19.3: Ethical Decision Framework — design-doc validator
 */

const { existsSync, readFileSync } = require('fs');
const path = require('path');

const DOC_PATH = path.join(__dirname, 'ethical-framework.md');

let passed = 0;
let failed = 0;

console.log('Quest 19.3: Ethical Decision Framework — design-doc validator\n');

function check(label, condition) {
  if (condition) {
    console.log(`PASS ${label}`);
    passed++;
  } else {
    console.log(`FAIL ${label}`);
    failed++;
  }
}

check('ethical-framework.md exists', existsSync(DOC_PATH));

if (!existsSync(DOC_PATH)) {
  console.log(`\nResults: ${passed} passed, ${failed} failed`);
  console.log('\nHint: create ethical-framework.md with your ethical AI decision framework.');
  process.exit(1);
}

const content = readFileSync(DOC_PATH, 'utf-8');

check('stakeholder analysis (stakeholder|who is affected)', /stakeholder|who is affected/i.test(content));
check('fairness criteria (fairness|equity|bias)', /fairness|equity|bias/i.test(content));
check('transparency requirements (transparency|explainab|interpret)', /transparency|explainab|interpret/i.test(content));
check('accountability chain (accountability|responsible|ownership)', /accountability|responsible|ownership/i.test(content));
check('escalation process (escalation|escalate|concern)', /escalation|escalate|concern/i.test(content));
check('monitoring plan (monitor|ongoing|audit)', /monitor|ongoing|audit/i.test(content));
check('at least 500 characters of substance', content.length >= 500);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 19.3 complete. You designed an ethical AI decision framework.');
  process.exit(0);
}

console.log('\nHint: ethical-framework.md must cover stakeholders, fairness, transparency, accountability, escalation, and monitoring.');
process.exit(1);
