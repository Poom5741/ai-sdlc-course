/**
 * Quest 4.16: Deployment Pipeline Designer — design-doc validator
 * Run: node test.js
 */

const { existsSync, readFileSync } = require('fs');
const path = require('path');

const DOC_PATH = path.join(__dirname, 'deploy-pipeline.md');

let passed = 0;
let failed = 0;

console.log('Quest 4.16: Deployment Pipeline Designer — design-doc validator\n');

function check(label, condition) {
  if (condition) { console.log(`PASS ${label}`); passed++; } else { console.log(`FAIL ${label}`); failed++; }
}

check('deploy-pipeline.md exists', existsSync(DOC_PATH));
if (!existsSync(DOC_PATH)) { console.log(`\nResults: ${passed} passed, ${failed} failed`); process.exit(1); }

const content = readFileSync(DOC_PATH, 'utf-8');

check('at least 5 pipeline stages', (content.match(/\d[\.\)]\s/g) || []).length >= 5);
check('gate criteria (gate|criteria|pass|fail)', /(gate|criteria|pass condition|must pass)/i.test(content));
check('rollback strategy (rollback|revert|roll back)', /(rollback|revert|roll back)/i.test(content));
check('environment progression (dev|staging|prod)', /(dev|staging|prod)/i.test(content));
check('monitoring (monitor|alert|notify)', /(monitor|alert|notify)/i.test(content));
check('at least 500 characters', content.length >= 500);

console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed === 0) { console.log('\nQuest 4.16 complete.'); process.exit(0); }
process.exit(1);
