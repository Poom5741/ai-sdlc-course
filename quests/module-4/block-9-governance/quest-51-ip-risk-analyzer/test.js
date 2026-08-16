/**
 * Quest 4.9: IP Risk Analyzer — design-doc validator
 * Run: node test.js
 */

const { existsSync, readFileSync } = require('fs');
const path = require('path');

const DOC_PATH = path.join(__dirname, 'ip-risk-analysis.md');

let passed = 0;
let failed = 0;

console.log('Quest 4.9: IP Risk Analyzer — design-doc validator\n');

function check(label, condition) {
  if (condition) { console.log(`PASS ${label}`); passed++; } else { console.log(`FAIL ${label}`); failed++; }
}

check('ip-risk-analysis.md exists', existsSync(DOC_PATH));
if (!existsSync(DOC_PATH)) { console.log(`\nResults: ${passed} passed, ${failed} failed`); process.exit(1); }

const content = readFileSync(DOC_PATH, 'utf-8');

check('license compatibility (license|MIT|Apache|GPL)', /(license|mit|apache|gpl)/i.test(content));
check('at least 3 licenses mentioned', (content.match(/(MIT|Apache|GPL|BSD|ISC|LGPL|AGPL)/gi) || []).length >= 3);
check('copyright risk (copyright|ip|intellectual)', /(copyright|ip|intellectual)/i.test(content));
check('attribution (attribution|credit|notice)', /(attribution|credit|notice)/i.test(content));
check('mitigation strategies (mitigat|reduc|prevent)', /(mitigat|reduc|prevent)/i.test(content));
check('decision framework (decision|framework|when to)', /(decision|framework|when to)/i.test(content));
check('at least 400 characters', content.length >= 400);

console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed === 0) { console.log('\nQuest 4.9 complete.'); process.exit(0); }
process.exit(1);
