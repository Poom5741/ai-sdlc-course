const { existsSync, readFileSync } = require('fs');
const path = require('path');
const DOC_PATH = path.join(__dirname, 'prd.md');
let passed = 0, failed = 0;
console.log('Quest 3.2: PRD Writer — design-doc validator\n');
function check(label, c) { if (c) { console.log(`PASS ${label}`); passed++; } else { console.log(`FAIL ${label}`); failed++; } }
check('prd.md exists', existsSync(DOC_PATH));
if (!existsSync(DOC_PATH)) { process.exit(1); }
const c = readFileSync(DOC_PATH, 'utf-8');
check('problem statement', /problem|goal|objective/i.test(c));
check('solution overview', /solution|approach|feature/i.test(c));
check('success metrics', /metric|success|kpi/i.test(c));
check('timeline', /timeline|milestone|schedule/i.test(c));
check('at least 400 chars', c.length >= 400);
console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed === 0) { console.log('\nQuest 3.2 complete.'); process.exit(0); }
process.exit(1);
