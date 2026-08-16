/**
 * Quest 23.3: Commit Message Writer — test suite
 *
 * Run: node test.js
 */

const { formatConventionalCommit } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 23.3: Commit Message Writer\n');

function check(label, condition, detail) {
  if (condition) {
    console.log(`PASS ${label}`);
    passed++;
  } else {
    console.log(`FAIL ${label}`);
    if (detail) console.log(`   ${detail}`);
    failed++;
  }
}

// Test 1: valid feat commit
const r1 = formatConventionalCommit('feat', 'auth', 'add login endpoint');
check('valid feat commit is valid', r1.isValid === true, `got ${JSON.stringify(r1)}`);
check('subject matches conventional format', r1.subject === 'feat(auth): add login endpoint', `got "${r1.subject}"`);

// Test 2: valid fix commit without scope
const r2 = formatConventionalCommit('fix', null, 'resolve null pointer in parser');
check('fix commit without scope is valid', r2.isValid === true);
check('subject without scope omits parentheses', r2.subject === 'fix: resolve null pointer in parser', `got "${r2.subject}"`);

// Test 3: invalid type
const r3 = formatConventionalCommit('updated', 'api', 'add endpoint');
check('invalid type is not valid', r3.isValid === false, `got ${JSON.stringify(r3)}`);

// Test 4: description too long (over 72 chars)
const longDesc = 'a'.repeat(73);
const r4 = formatConventionalCommit('feat', 'ui', longDesc);
check('description over 72 chars is not valid', r4.isValid === false, `got ${JSON.stringify(r4)}`);

// Test 5: description starts with uppercase (should be lowercase)
const r5 = formatConventionalCommit('feat', 'auth', 'Add login endpoint');
check('description starting with uppercase is not valid', r5.isValid === false, `got ${JSON.stringify(r5)}`);

// Test 6: description ends with period
const r6 = formatConventionalCommit('feat', 'auth', 'add login endpoint.');
check('description ending with period is not valid', r6.isValid === false, `got ${JSON.stringify(r6)}`);

// Test 7: body included
const r7 = formatConventionalCommit('feat', 'auth', 'add login endpoint', 'Implemented JWT auth');
check('body is included', r7.body === 'Implemented JWT auth', `got "${r7.body}"`);

// Test 8: EDGE CASE — past tense description (naive AI writes "added" instead of "add")
const r8 = formatConventionalCommit('feat', 'api', 'added new endpoint');
check('past tense "added" is not valid (edge case: naive AI writes this)', r8.isValid === false, `got ${JSON.stringify(r8)}`);

// Test 9: description is empty
const r9 = formatConventionalCommit('feat', 'api', '');
check('empty description is not valid', r9.isValid === false);

// Test 10: errors array contains descriptive messages
check('errors array has content when invalid', r3.errors && r3.errors.length > 0, `got ${JSON.stringify(r3.errors)}`);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 23.3 complete. You write proper conventional commits.');
  process.exit(0);
}
console.log('\nHint: naive AI writes past tense ("added") instead of imperative ("add"). Check your validation.');
process.exit(1);
