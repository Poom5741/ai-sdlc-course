/**
 * Quest 15.1: Automated PR Reviewer — test suite
 *
 * Requires ./problem.js exporting { reviewDiff }. Run: node test.js
 */

const { reviewDiff } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 15.1: Automated PR Reviewer\n');

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

// Test 1: Detects console.log
const diff1 = '+ console.log("debug");';
const r1 = reviewDiff(diff1);
check('detects console.log', r1.some(c => c.message.toLowerCase().includes('console.log')),
  `got ${JSON.stringify(r1)}`);

// Test 2: Detects TODO comment
const diff2 = '+ // TODO: fix this later';
const r2 = reviewDiff(diff2);
check('detects TODO comment', r2.some(c => c.message.toLowerCase().includes('todo')),
  `got ${JSON.stringify(r2)}`);

// Test 3: Detects FIXME
const diff3 = '+ /* FIXME: broken */';
const r3 = reviewDiff(diff3);
check('detects FIXME comment', r3.some(c => c.message.toLowerCase().includes('fixme')),
  `got ${JSON.stringify(r3)}`);

// Test 4: Detects magic number (not 0, 1, -1)
const diff4 = '+   if (count > 42) {';
const r4 = reviewDiff(diff4);
check('detects magic number 42', r4.some(c => c.message.toLowerCase().includes('magic') || c.message.includes('42')),
  `got ${JSON.stringify(r4)}`);

// Test 5: EDGE CASE — does NOT flag 0, 1, -1 as magic numbers
const diff5 = '+   for (let i = 0; i < 1; i++) {';
const r5 = reviewDiff(diff5);
check('does NOT flag 0 or 1 as magic', r5.filter(c => c.message.toLowerCase().includes('magic')).length === 0,
  `got ${r5.filter(c => c.message.toLowerCase().includes('magic')).length} false positives for 0/1`);

// Test 6: Detects long line (>120 chars)
const diff6 = '+ const result = someFunction("this is a very long string that definitely exceeds one hundred and twenty characters in total length for testing purposes ok");';
const r6 = reviewDiff(diff6);
check('detects long line', r6.some(c => c.message.toLowerCase().includes('long') || c.message.toLowerCase().includes('120')),
  `got ${JSON.stringify(r6)}`);

// Test 7: No issues in clean code
const diff7 = '+ const x = 1;\n+ return x;';
const r7 = reviewDiff(diff7);
check('clean code has no issues', r7.length === 0, `got ${r7.length} false positives`);

// Test 8: Empty diff
const r8 = reviewDiff('');
check('empty diff returns empty', r8.length === 0);

// Test 9: Severity levels present
const r9 = reviewDiff('+ console.log("test");\n+ // TODO: fix');
check('severity levels are valid', r9.every(c => c.severity === 'warning' || c.severity === 'info'),
  `got ${JSON.stringify(r9.map(c => c.severity))}`);

// Test 10: Line numbers are present and numeric
check('all comments have numeric line', r9.every(c => typeof c.line === 'number' && c.line > 0),
  `got ${JSON.stringify(r9.map(c => c.line))}`);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 15.1 complete. You automated the boring parts of code review.');
  process.exit(0);
}
console.log('\nHint: check if magic numbers only flag values except 0, 1, -1.');
process.exit(1);
