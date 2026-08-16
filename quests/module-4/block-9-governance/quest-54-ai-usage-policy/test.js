/**
 * Quest 4.12: AI Usage Policy Generator — design-doc validator
 * Run: node test.js
 */

const { existsSync, readFileSync } = require('fs');
const path = require('path');

const DOC_PATH = path.join(__dirname, 'ai-usage-policy.md');

let passed = 0;
let failed = 0;

console.log('Quest 4.12: AI Usage Policy Generator — design-doc validator\n');

function check(label, condition) {
  if (condition) { console.log(`PASS ${label}`); passed++; } else { console.log(`FAIL ${label}`); failed++; }
}

check('ai-usage-policy.md exists', existsSync(DOC_PATH));
if (!existsSync(DOC_PATH)) { console.log(`\nResults: ${passed} passed, ${failed} failed`); process.exit(1); }

const content = readFileSync(DOC_PATH, 'utf-8');

check('approved tools (approved|permitted|allowed)', /(approved|permitted|allowed)/i.test(content));
check('at least 5 prohibitions', (content.match(/\d[\.\)]\s/g) || []).length >= 5);
check('data handling (data|confidential|secret|pii)', /(data|confidential|secret|pii)/i.test(content));
check('attribution (attribution|disclosure|disclose)', /(attribution|disclosure|disclose)/i.test(content));
check('consequences (consequence|violation|penalty|disciplinary)', /(consequence|violation|penalty|disciplinary)/i.test(content));
check('review cadence (review|update|cadence|annually|quarterly)', /(review|update|cadence|annually|quarterly)/i.test(content));
check('at least 500 characters', content.length >= 500);

console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed === 0) { console.log('\nQuest 4.12 complete.'); process.exit(0); }
process.exit(1);
