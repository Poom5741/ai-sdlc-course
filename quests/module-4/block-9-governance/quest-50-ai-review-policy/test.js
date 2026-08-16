/**
 * Quest 4.8: AI Code Review Policy Writer — design-doc validator
 * Run: node test.js
 */

const { existsSync, readFileSync } = require('fs');
const path = require('path');

const DOC_PATH = path.join(__dirname, 'ai-review-policy.md');

let passed = 0;
let failed = 0;

console.log('Quest 4.8: AI Code Review Policy Writer — design-doc validator\n');

function check(label, condition) {
  if (condition) { console.log(`PASS ${label}`); passed++; } else { console.log(`FAIL ${label}`); failed++; }
}

check('ai-review-policy.md exists', existsSync(DOC_PATH));
if (!existsSync(DOC_PATH)) { console.log(`\nResults: ${passed} passed, ${failed} failed`); process.exit(1); }

const content = readFileSync(DOC_PATH, 'utf-8');

check('scope section (scope|when to review)', /(scope|when to review|applicable)/i.test(content));
check('at least 5 review criteria', (content.match(/\d[\.\)]\s/g) || []).length >= 5);
check('human override (override|exception|discretion)', /(override|exception|discretion)/i.test(content));
check('escalation path (escalat|triage|assign)', /(escalat|triage|assign)/i.test(content));
check('metrics (metric|measure|track)', /(metric|measure|track)/i.test(content));
check('does NOT replace human judgment', /(does not replace|not a substitute|human judgment)/i.test(content));
check('at least 500 characters', content.length >= 500);

console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed === 0) { console.log('\nQuest 4.8 complete.'); process.exit(0); }
process.exit(1);
