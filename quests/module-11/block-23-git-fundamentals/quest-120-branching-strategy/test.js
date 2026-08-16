/**
 * Quest 23.2: Branching Strategy — test suite
 *
 * Run: node test.js
 */

const { planMergeStrategy } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 23.2: Branching Strategy\n');

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

// Test 1: fast-forward — source base is target tip
const history1 = {
  'a1': { message: 'init', parent: null },
  'a2': { message: 'feat', parent: 'a1' },
};
const source1 = { name: 'feature', commits: ['a1', 'a2'] };
const target1 = { name: 'main', commits: ['a1'] };
const result1 = planMergeStrategy(source1, target1, history1);
check('fast-forward when source base is target tip', result1.strategy === 'fast-forward', `got ${result1.strategy}`);

// Test 2: merge — branches diverged
const history2 = {
  'b1': { message: 'init', parent: null },
  'b2': { message: 'main change', parent: 'b1' },
  'b3': { message: 'feat change', parent: 'b1' },
};
const source2 = { name: 'feature', commits: ['b1', 'b3'] };
const target2 = { name: 'main', commits: ['b1', 'b2'] };
const result2 = planMergeStrategy(source2, target2, history2);
check('merge when branches diverged', result2.strategy === 'merge', `got ${result2.strategy}`);

// Test 3: reason should explain the decision
check('result includes reason string', typeof result1.reason === 'string' && result1.reason.length > 0, `got ${JSON.stringify(result1.reason)}`);

// Test 4: naive AI edge case — always returns merge even for fast-forward
// This test ensures fast-forward is detected
const history4 = {
  'c1': { message: 'init', parent: null },
  'c2': { message: 'feat', parent: 'c1' },
  'c3': { message: 'feat2', parent: 'c2' },
};
const source4 = { name: 'feature', commits: ['c1', 'c2', 'c3'] };
const target4 = { name: 'main', commits: ['c1'] };
const result4 = planMergeStrategy(source4, target4, history4);
check('fast-forward when source has multiple commits ahead of target tip', result4.strategy === 'fast-forward', `got ${result4.strategy}`);

// Test 5: conflicts detected when both modify same file
const history5 = {
  'd1': { message: 'init', parent: null },
  'd2': { message: 'edit index.js', parent: 'd1', files: ['index.js'] },
  'd3': { message: 'edit index.js', parent: 'd1', files: ['index.js'] },
};
const source5 = { name: 'feature', commits: ['d1', 'd3'] };
const target5 = { name: 'main', commits: ['d1', 'd2'] };
const result5 = planMergeStrategy(source5, target5, history5);
check('conflicts array present when both branches modify same file', Array.isArray(result5.conflicts) && result5.conflicts.length > 0, `got ${JSON.stringify(result5.conflicts)}`);

// Test 6: no conflicts when different files changed
const history6 = {
  'e1': { message: 'init', parent: null },
  'e2': { message: 'edit a.js', parent: 'e1', files: ['a.js'] },
  'e3': { message: 'edit b.js', parent: 'e1', files: ['b.js'] },
};
const source6 = { name: 'feature', commits: ['e1', 'e3'] };
const target6 = { name: 'main', commits: ['e1', 'e2'] };
const result6 = planMergeStrategy(source6, target6, history6);
check('no conflicts when different files changed', !result6.conflicts || result6.conflicts.length === 0, `got ${JSON.stringify(result6.conflicts)}`);

// Test 7: target is ahead of source (nothing to merge)
const history7 = {
  'f1': { message: 'init', parent: null },
  'f2': { message: 'main work', parent: 'f1' },
};
const source7 = { name: 'feature', commits: ['f1'] };
const target7 = { name: 'main', commits: ['f1', 'f2'] };
const result7 = planMergeStrategy(source7, target7, history7);
check('target ahead returns a valid strategy', ['fast-forward', 'merge', 'rebase', 'up-to-date'].includes(result7.strategy), `got ${result7.strategy}`);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 23.2 complete. You understand branching and merge strategies.');
  process.exit(0);
}
console.log('\nHint: naive AI always returns merge — check if fast-forward is possible when source base matches target tip.');
process.exit(1);
