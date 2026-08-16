/**
 * Quest 15.5: Review Quality Scorer — test suite
 */

const { scoreReview } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 15.5: Review Quality Scorer\n');

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

// Test 1: High-quality comment
const comments1 = [{ text: 'Please replace this magic number with a named constant per our style guide.', file: 'auth.js', line: 42 }];
const r1 = scoreReview(comments1);
check('high-quality comment scores high', r1.score >= 60, `got score ${r1.score}`);

// Test 2: Low-quality comment
const comments2 = [{ text: 'this is bad', file: 'utils.js', line: 1 }];
const r2 = scoreReview(comments2);
check('vague comment scores low', r2.score <= 30, `got score ${r2.score}`);

// Test 3: Edge case — "lol what" should score very low
const comments3 = [{ text: 'lol what', file: 'x.js', line: 1 }];
const r3 = scoreReview(comments3);
check('"lol what" scores near zero', r3.score <= 20, `got score ${r3.score}`);

// Test 4: Actionable verb bonus
const comments4 = [{ text: 'Remove this unused import.', file: 'a.js', line: 1 }];
const r4 = scoreReview(comments4);
check('actionable verb adds points', r4.breakdown.actionable >= 20, `got ${r4.breakdown.actionable}`);

// Test 5: Specific reference bonus
const comments5 = [{ text: 'The calculateTotal function has a bug on line 15.', file: 'math.js', line: 15 }];
const r5 = scoreReview(comments5);
check('specific reference adds points', r5.breakdown.specific >= 20, `got ${r5.breakdown.specific}`);

// Test 6: Terse bonus (< 80 chars)
const comments6 = [{ text: 'Use const instead of let here.', file: 'x.js', line: 1 }];
const r6 = scoreReview(comments6);
check('terse comment adds points', r6.breakdown.terse >= 20, `got ${r6.breakdown.terse}`);

// Test 7: Empty reviews
const r7 = scoreReview([]);
check('empty reviews score 0', r7.score === 0, `got ${r7.score}`);

// Test 8: Multiple comments averaged or summed
const r8 = scoreReview([
  { text: 'Please refactor this.', file: 'a.js', line: 1 },
  { text: 'Add error handling per RFC 7231.', file: 'b.js', line: 5 },
]);
check('multiple comments produce valid score', r8.score > 0 && r8.score <= 100, `got ${r8.score}`);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 15.5 complete. You can score review quality — separating signal from noise.');
  process.exit(0);
}
console.log('\nHint: vague comments like "this is bad" should score LOW. Check if you penalize vague text.');
process.exit(1);
