/**
 * Quest 24.2: PR Description Generator — test suite
 *
 * Run: node test.js
 */

const { generatePRDescription } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 24.2: PR Description Generator\n');

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

// Test 1: feature PR
const r1 = generatePRDescription('feat', 'Add user auth', ['Added login endpoint', 'Added JWT middleware'], false);
check('hasHowToTest is true', r1.hasHowToTest === true, `got ${r1.hasHowToTest}`);
check('description includes "How to Test"', /how to test/i.test(r1.description), `got "${r1.description.substring(0, 100)}..."`);
check('description includes type badge', /\[Feature\]/i.test(r1.description), `got "${r1.description.substring(0, 100)}..."`);
check('description includes title', r1.description.includes('Add user auth'), `got "${r1.description.substring(0, 100)}..."`);

// Test 2: changes listed in description
check('description includes changes', r1.description.includes('Added login endpoint'), `got "${r1.description.substring(0, 100)}..."`);

// Test 3: breaking change notice
const r2 = generatePRDescription('feat', 'New API', ['Changed response format'], true);
check('breaking change has notice', r2.hasBreakingNotice === true, `got ${r2.hasBreakingNotice}`);
check('description includes BREAKING CHANGE', /breaking change/i.test(r2.description), `got "${r2.description.substring(0, 100)}..."`);

// Test 4: non-breaking has no breaking notice
check('non-breaking has no notice', r1.hasBreakingNotice === false);

// Test 5: fix type badge
const r3 = generatePRDescription('fix', 'Fix null pointer', ['Added null check'], false);
check('fix type uses [Fix] badge', /\[Fix\]/i.test(r3.description), `got "${r3.description.substring(0, 100)}..."`);

// Test 6: refactor type badge
const r4 = generatePRDescription('refactor', 'Clean up auth', ['Extracted helper'], false);
check('refactor type uses [Refactor] badge', /\[Refactor\]/i.test(r4.description), `got "${r4.description.substring(0, 100)}..."`);

// Test 7: description is string
check('description is a string', typeof r1.description === 'string');

// Test 8: EDGE CASE — naive AI skips "How to Test" section
check('howToTest flag matches actual content', r1.hasHowToTest === /how to test/i.test(r1.description));

// Test 9: multiple changes included
check('all changes listed', r1.description.includes('Added JWT middleware'));

// Test 10: description has minimum length
check('description has substance', r1.description.length >= 50, `got ${r1.description.length} chars`);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 24.2 complete. You generate PR descriptions with testing instructions.');
  process.exit(0);
}
console.log('\nHint: naive AI skips "How to Test" — every PR needs testing instructions.');
process.exit(1);
