/**
 * Quest 3.3: Security Architecture — design-doc validator
 *
 * Tool skill: use AI to design security controls.
 * Engineering habit: THREAT-MODEL BEFORE BUILDING — threats first, then a
 * control for each, then the failure mode of each control.
 *
 * This is NOT a code test. It validates that `design.md` in THIS folder has
 * the required sections: a threat list, a control per threat, and a failure
 * mode per control.
 *
 * Run: node test.js
 */

const { existsSync, readFileSync } = require('fs');
const path = require('path');

const DOC = path.join(__dirname, 'design.md');

let passed = 0;
let failed = 0;

console.log('Quest 3.3: Security Architecture — design-doc validator\n');

function check(label, cond, detail) {
  if (cond) {
    console.log(`PASS ${label}`);
    passed++;
  } else {
    console.log(`FAIL ${label}`);
    if (detail) console.log(`   ${detail}`);
    failed++;
  }
}

check('design.md exists', existsSync(DOC));

if (!existsSync(DOC)) {
  console.log(`\nResults: ${passed} passed, ${failed} failed`);
  console.log('\nHint: create design.md covering threats, controls, and failure modes for an API auth flow (API key + rate limiting).');
  process.exit(1);
}

const content = readFileSync(DOC, 'utf-8');

check('has a Threats section', /threats?[:\s]/i.test(content));
check('lists at least 3 threats', (content.match(/threat[:\s]/gi) || []).length >= 3 || /threat/i.test(content) === false ? (content.match(/threat/gi) || []).length >= 3 : (content.match(/threat/gi) || []).length >= 3);
check('has a Controls section', /controls?[:\s]/i.test(content));
check('has the system being secured (API/auth)', /(api|auth|authentication|authorization)/i.test(content));
check('mentions API key (per #67 spec)', /api\s*key/i.test(content));
check('mentions rate limiting (per #67 spec)', /rate\s*limit/i.test(content));
check('has Failure Modes section', /failure\s*modes?[:\s]/i.test(content));
check('at least 400 characters of substance', content.length >= 400);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 3.3 complete. You threat-modeled before building.');
  process.exit(0);
}
console.log('\nHint: design.md must cover the system, ≥3 threats, a control per threat (incl. API key + rate limiting), and the failure mode of each control.');
process.exit(1);