/**
 * Quest 23.5: Interactive Rebase Simulator — test suite
 *
 * Run: node test.js
 */

const { simulateRebase } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 23.5: Interactive Rebase Simulator\n');

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

const commits = [
  { hash: 'c1', message: 'init', author: 'Alice' },
  { hash: 'c2', message: 'add feature A', author: 'Alice' },
  { hash: 'c3', message: 'fix bug in A', author: 'Bob' },
  { hash: 'c4', message: 'add feature B', author: 'Alice' },
];

// Test 1: no operations — result equals input
const r1 = simulateRebase(commits, []);
check('no operations returns original commits', r1.result.length === 4, `got ${r1.result.length}`);
check('no operations has no drops', r1.dropped.length === 0);

// Test 2: pick — commit stays
const r2 = simulateRebase(commits, [{ action: 'pick', targetHash: 'c2' }]);
check('pick keeps commit in result', r2.result.some(c => c.hash === 'c2'), `got ${JSON.stringify(r2.result.map(c => c.hash))}`);

// Test 3: squash — combines two commits
const squashOps = [
  { action: 'squash', targetHash: 'c3' }, // squash c3 into c2
];
const r3 = simulateRebase(commits, squashOps);
check('squash reduces commit count by 1', r3.result.length === 3, `got ${r3.result.length}`);
const squashed = r3.result.find(c => c.hash === 'c2');
check('squashed commit has combined message', squashed && squashed.message.includes('fix bug'), `got ${squashed && squashed.message}`);

// Test 4: edit — marks commit as edited
const r4 = simulateRebase(commits, [{ action: 'edit', targetHash: 'c2' }]);
const edited = r4.result.find(c => c.hash === 'c2');
check('edit marks commit with [edited] prefix', edited && edited.message.startsWith('[edited]'), `got ${edited && edited.message}`);

// Test 5: reorder — moves commit
const reorderOps = [
  { action: 'reorder', targetHash: 'c4', beforeHash: 'c2' }, // move c4 before c2
];
const r5 = simulateRebase(commits, reorderOps);
const c4Index = r5.result.findIndex(c => c.hash === 'c4');
const c2Index = r5.result.findIndex(c => c.hash === 'c2');
check('reorder moves commit to new position', c4Index < c2Index, `c4 at ${c4Index}, c2 at ${c2Index}`);

// Test 6: EDGE CASE — naive AI drops commits during rebase
// After reorder, total count must still be 4
check('reorder preserves total commit count (edge case: naive AI drops commits)', r5.result.length === 4, `got ${r5.result.length}`);

// Test 7: squash + pick combination
const comboOps = [
  { action: 'squash', targetHash: 'c3' }, // squash into c2
  { action: 'pick', targetHash: 'c4' },
];
const r6 = simulateRebase(commits, comboOps);
check('squash+pick preserves remaining commits', r6.result.length === 3, `got ${r6.result.length}`);

// Test 8: dropped array should be empty for valid operations
check('valid operations produce empty dropped array', r6.dropped.length === 0, `got ${JSON.stringify(r6.dropped)}`);

// Test 9: result message indicates completion
check('result has message string', typeof r6.message === 'string' && r6.message.length > 0, `got "${r6.message}"`);

// Test 10: multiple squashes
const multiSquash = [
  { action: 'squash', targetHash: 'c3' },
  { action: 'squash', targetHash: 'c4' },
];
const r7 = simulateRebase(commits, multiSquash);
check('multiple squashes reduce count correctly', r7.result.length === 2, `got ${r7.result.length}`);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 23.5 complete. You can simulate interactive rebase without losing commits.');
  process.exit(0);
}
console.log('\nHint: naive AI drops commits during rebase — check that result.length matches expected count.');
process.exit(1);
