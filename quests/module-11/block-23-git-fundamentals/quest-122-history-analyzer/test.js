/**
 * Quest 23.4: Git History Analyzer — test suite
 *
 * Run: node test.js
 */

const { analyzeGitHistory } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 23.4: Git History Analyzer\n');

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

// Test 1: normal history — no warnings
const normalLogs = [
  { hash: 'a1', author: 'Alice', message: 'init', date: '2024-01-01' },
  { hash: 'a2', author: 'Alice', message: 'add feature', date: '2024-01-02', parent: 'a1' },
  { hash: 'a3', author: 'Bob', message: 'fix bug', date: '2024-01-03', parent: 'a2' },
];
const r1 = analyzeGitHistory(normalLogs);
check('normal history has no warnings', r1.warnings.length === 0, `got ${JSON.stringify(r1.warnings)}`);
check('stats.totalCommits is correct', r1.stats.totalCommits === 3, `got ${r1.stats.totalCommits}`);
check('stats.uniqueAuthors is correct', r1.stats.uniqueAuthors === 2, `got ${r1.stats.uniqueAuthors}`);

// Test 2: contributors object tracks commits per author
check('contributors tracks Alice', r1.contributors['Alice'] === 2, `got ${r1.contributors['Alice']}`);
check('contributors tracks Bob', r1.contributors['Bob'] === 1, `got ${r1.contributors['Bob']}`);

// Test 3: force push detected (parent mismatch)
const forcePushLogs = [
  { hash: 'a1', author: 'Alice', message: 'init', date: '2024-01-01' },
  { hash: 'a2', author: 'Alice', message: 'add feature', date: '2024-01-02', parent: 'a1' },
  { hash: 'b1', author: 'Alice', message: 'secret commit', date: '2024-01-03', parent: 'a1' }, // parent is a1, not a2!
];
const r2 = analyzeGitHistory(forcePushLogs);
check('force push detected via parent mismatch', r2.warnings.some(w => /force.?push/i.test(w)), `got ${JSON.stringify(r2.warnings)}`);

// Test 4: revert detected
const revertLogs = [
  { hash: 'a1', author: 'Alice', message: 'init', date: '2024-01-01' },
  { hash: 'a2', author: 'Alice', message: 'Revert "add feature" a1b2c3', date: '2024-01-02', parent: 'a1' },
];
const r3 = analyzeGitHistory(revertLogs);
check('revert detected in message', r3.warnings.some(w => /revert/i.test(w)), `got ${JSON.stringify(r3.warnings)}`);

// Test 5: squash detected
const squashLogs = [
  { hash: 'a1', author: 'Alice', message: 'init', date: '2024-01-01' },
  { hash: 'a2', author: 'Alice', message: 'squash commits together', date: '2024-01-02', parent: 'a1' },
];
const r4 = analyzeGitHistory(squashLogs);
check('squash detected in message', r4.warnings.some(w => /squash/i.test(w)), `got ${JSON.stringify(r4.warnings)}`);

// Test 6: date range computed
check('date range is computed', r1.stats.dateRange.length > 0, `got "${r1.stats.dateRange}"`);

// Test 7: merge commit detected
const mergeLogs = [
  { hash: 'a1', author: 'Alice', message: 'init', date: '2024-01-01' },
  { hash: 'a2', author: 'Alice', message: 'Merge branch feature into main', date: '2024-01-02', parent: 'a1' },
];
const r5 = analyzeGitHistory(mergeLogs);
check('merge commit detected', r5.warnings.some(w => /merge/i.test(w)), `got ${JSON.stringify(r5.warnings)}`);

// Test 8: empty logs
const r6 = analyzeGitHistory([]);
check('empty logs returns valid stats', r6.stats.totalCommits === 0);

// Test 9: EDGE CASE — naive AI checks message for force push but misses parent mismatch
// The force push in test 3 has parent 'a1' when previous was 'a2' — this is the real indicator
const subtleForce = [
  { hash: 'x1', author: 'Dev', message: 'normal commit', date: '2024-01-01' },
  { hash: 'x2', author: 'Dev', message: 'another normal', date: '2024-01-02', parent: 'x1' },
  { hash: 'x3', author: 'Dev', message: 'stealth rewrite', date: '2024-01-03', parent: 'x1' }, // parent mismatch
];
const r7 = analyzeGitHistory(subtleForce);
check('subtle force push detected (parent mismatch, no keywords in message)', r7.warnings.some(w => /force.?push/i.test(w)), `got ${JSON.stringify(r7.warnings)}`);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 23.4 complete. You can analyze git history for bad patterns.');
  process.exit(0);
}
console.log('\nHint: naive AI checks message text for "force push" but misses parent hash mismatches — that\'s the real indicator.');
process.exit(1);
