/**
 * Quest 4.6: Security Architecture Design — design-doc validator
 *
 * Validates that security-arch.md exists and contains required sections.
 * Run: node test.js
 */

const { existsSync, readFileSync } = require('fs');
const path = require('path');

const DOC_PATH = path.join(__dirname, 'security-arch.md');

let passed = 0;
let failed = 0;

console.log('Quest 4.6: Security Architecture Design — design-doc validator\n');

function check(label, condition) {
  if (condition) {
    console.log(`PASS ${label}`);
    passed++;
  } else {
    console.log(`FAIL ${label}`);
    failed++;
  }
}

check('security-arch.md exists', existsSync(DOC_PATH));

if (!existsSync(DOC_PATH)) {
  console.log(`\nResults: ${passed} passed, ${failed} failed`);
  console.log('\nHint: create security-arch.md with your security architecture design.');
  process.exit(1);
}

const content = readFileSync(DOC_PATH, 'utf-8');

check('threat model section (threat|STRIDE|attack)', /(threat|stride|attack)/i.test(content));
check('at least 4 specific threats mentioned', (content.match(/\b(threat|risk|attack|vulnerability)\b/gi) || []).length >= 4);
check('authentication/authorization (auth)', /auth/i.test(content));
check('input validation (sanitiz|validat)', /(sanitiz|validat)/i.test(content));
check('output guardrails (guardrail|output|restrict)', /(guardrail|output restrict|must not)/i.test(content));
check('audit logging (audit|log)', /(audit|log)/i.test(content));
check('incident response (incident|response|breach)', /(incident|response|breach)/i.test(content));
check('at least 500 characters of substance', content.length >= 500);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 4.6 complete. You designed security by design — before writing code.');
  process.exit(0);
}

console.log('\nHint: security-arch.md must cover threat model, auth, input validation, output guardrails, audit logging, and incident response.');
process.exit(1);
