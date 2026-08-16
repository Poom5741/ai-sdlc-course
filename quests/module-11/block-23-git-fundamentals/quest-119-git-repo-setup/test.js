/**
 * Quest 23.1: Git Repo Setup — test suite
 *
 * Requires ./problem.js (the learner's work), never ./_solution/solution.js.
 * Run: node test.js
 */

const { validateCommitSequence } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 23.1: Git Repo Setup\n');

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

// Valid commit sequence with proper config
const validCommits = [
  { hash: 'abc123', message: 'initial commit', parent: null },
  { hash: 'def456', message: 'add readme', parent: 'abc123' },
  { hash: 'ghi789', message: 'update readme', parent: 'def456' },
];
const validConfig = { name: 'Jane Doe', email: 'jane@example.com' };

// Test 1: valid sequence returns valid
const result1 = validateCommitSequence(validCommits, validConfig);
check('valid commit sequence returns valid: true', result1.valid === true, `got ${JSON.stringify(result1)}`);

// Test 2: valid sequence has no errors
check('valid sequence has empty errors array', Array.isArray(result1.errors) && result1.errors.length === 0, `got ${JSON.stringify(result1.errors)}`);

// Test 3: empty commits array is valid
const result2 = validateCommitSequence([], validConfig);
check('empty commits array is valid', result2.valid === true, `got ${JSON.stringify(result2)}`);

// Test 4: first commit must have parent null
const badParent = [
  { hash: 'abc123', message: 'initial', parent: 'xyz999' },
];
const result3 = validateCommitSequence(badParent, validConfig);
check('first commit with non-null parent is invalid', result3.valid === false, `got ${JSON.stringify(result3)}`);

// Test 5: subsequent commit with wrong parent hash is invalid
const wrongParent = [
  { hash: 'abc123', message: 'initial', parent: null },
  { hash: 'def456', message: 'add', parent: 'WRONG_HASH' },
];
const result4 = validateCommitSequence(wrongParent, validConfig);
check('commit with wrong parent hash is invalid', result4.valid === false, `got ${JSON.stringify(result4)}`);

// Test 6: missing config name is invalid (EDGE CASE — naive AI skips this)
const missingName = { name: '', email: 'jane@example.com' };
const result5 = validateCommitSequence(validCommits, missingName);
check('empty config name is invalid (edge case: naive AI misses this)', result5.valid === false, `got ${JSON.stringify(result5)}`);

// Test 7: missing config email is invalid (EDGE CASE)
const missingEmail = { name: 'Jane', email: '' };
const result6 = validateCommitSequence(validCommits, missingEmail);
check('empty config email is invalid (edge case: naive AI misses this)', result6.valid === false, `got ${JSON.stringify(result6)}`);

// Test 8: commit with empty hash is invalid
const emptyHash = [
  { hash: '', message: 'initial', parent: null },
];
const result7 = validateCommitSequence(emptyHash, validConfig);
check('commit with empty hash is invalid', result7.valid === false, `got ${JSON.stringify(result7)}`);

// Test 9: commit with empty message is invalid
const emptyMsg = [
  { hash: 'abc123', message: '', parent: null },
];
const result8 = validateCommitSequence(emptyMsg, validConfig);
check('commit with empty message is invalid', result8.valid === false, `got ${JSON.stringify(result8)}`);

// Test 10: errors array should contain descriptions
const result9 = validateCommitSequence(badParent, validConfig);
check('errors array contains descriptive messages', result9.errors && result9.errors.length > 0, `got ${JSON.stringify(result9.errors)}`);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 23.1 complete. You validated a proper git commit sequence with user config.');
  process.exit(0);
}
console.log('\nHint: check the edge case — naive AI validates commit hashes but forgets to check user config name/email.');
process.exit(1);
