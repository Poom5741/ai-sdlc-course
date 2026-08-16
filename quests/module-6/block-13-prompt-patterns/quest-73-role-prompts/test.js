/**
 * Quest 6.1: Role Prompt Library — test suite
 * Requires ./problem.js exporting { createRolePrompt }. Run: node test.js
 */

const { createRolePrompt } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 6.1: Role Prompt Library\n');

function check(label, cond, detail) {
  if (cond) { console.log(`PASS ${label}`); passed++; } else { console.log(`FAIL ${label}`); if (detail) console.log(`   ${detail}`); failed++; }
}

// Test 1: Each role returns a string
const roles = ['code-reviewer', 'security-auditor', 'doc-writer', 'test-generator'];
for (const role of roles) {
  const prompt = createRolePrompt(role);
  check(`${role} returns a string`, typeof prompt === 'string' && prompt.length > 10);
}

// Test 2: Roles are DISTINCT (THE EDGE CASE)
const reviewer = createRolePrompt('code-reviewer');
const auditor = createRolePrompt('security-auditor');
check('code-reviewer ≠ security-auditor',
  reviewer !== auditor,
  `naive AI returns same prompt for all roles`);

// Test 3: Each role has output format
check('code-reviewer specifies format', /format|output|structure/i.test(reviewer));
const docWriter = createRolePrompt('doc-writer');
check('doc-writer specifies format', /format|output|markdown/i.test(docWriter));

// Test 4: Each role has constraints
check('code-reviewer has constraints', /not|never|don'?t|avoid|refrain/i.test(reviewer));
check('security-auditor has constraints', /not|never|don'?t|avoid|refrain/i.test(auditor));

// Test 5: Unknown role throws
try {
  createRolePrompt('unknown-role');
  check('unknown role throws', false, 'should have thrown');
} catch (e) {
  check('unknown role throws', true);
}

// Test 6: Each role has persona
check('code-reviewer has persona', /you are|your role|as a/i.test(reviewer));

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 6.1 complete. Roles shape behavior — each prompt is distinct.');
  process.exit(0);
}
console.log('\nHint: check if each role has a DISTINCT prompt. Naive AI returns the same one for all.');
process.exit(1);
