/**
 * Quest 24.1: Issue Creator — test suite
 *
 * Run: node test.js
 */

const { createIssue } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 24.1: Issue Creator\n');

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

// Test 1: basic bug issue
const r1 = createIssue('Login fails', 'Users cannot login with valid credentials', 'bug', 'high');
check('title matches input', r1.title === 'Login fails');
check('state is open', r1.state === 'open');
check('labels include bug', r1.labels.includes('bug'), `got ${JSON.stringify(r1.labels)}`);
check('labels include P0 for high priority', r1.labels.includes('P0'), `got ${JSON.stringify(r1.labels)}`);

// Test 2: body has reproduction steps (EDGE CASE — naive AI skips this)
check('body contains "Reproduction Steps"', /reproduction steps/i.test(r1.body), `got "${r1.body.substring(0, 100)}..."`);

// Test 3: body has expected behavior
check('body contains "Expected Behavior"', /expected behavior/i.test(r1.body));

// Test 4: feature type
const r2 = createIssue('Add dark mode', 'Users want dark mode', 'feature', 'medium');
check('feature maps to enhancement label', r2.labels.includes('enhancement'), `got ${JSON.stringify(r2.labels)}`);
check('medium priority maps to P1', r2.labels.includes('P1'), `got ${JSON.stringify(r2.labels)}`);

// Test 5: task type
const r3 = createIssue('Update docs', 'Docs are outdated', 'task', 'low');
check('task maps to chore label', r3.labels.includes('chore'), `got ${JSON.stringify(r3.labels)}`);
check('low priority maps to P2', r3.labels.includes('P2'), `got ${JSON.stringify(r3.labels)}`);

// Test 6: assignees is an array
check('assignees is an array', Array.isArray(r1.assignees));

// Test 7: description appears in body
check('body includes the description', r1.body.includes('Users cannot login'), `got "${r1.body.substring(0, 100)}..."`);

// Test 8: EDGE CASE — naive AI generates valid JSON but body is too sparse
check('body is at least 50 characters', r1.body.length >= 50, `got ${r1.body.length} chars`);

// Test 9: unknown type still produces valid issue
const r4 = createIssue('Test', 'Test issue', 'unknown', 'medium');
check('unknown type produces valid issue', r4.title === 'Test' && r4.state === 'open');

// Test 10: labels array contains at least one label
check('labels array is non-empty', r1.labels.length > 0, `got ${JSON.stringify(r1.labels)}`);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 24.1 complete. You create well-structured GitHub issues.');
  process.exit(0);
}
console.log('\nHint: naive AI skips "Reproduction Steps" in the body — every issue needs them.');
process.exit(1);
