/**
 * Quest 5.1: Agent Loop Builder — test suite
 * Requires ./problem.js exporting { agentLoop }. Run: node test.js
 */

const { agentLoop } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 5.1: Agent Loop Builder\n');

function check(label, cond, detail) {
  if (cond) { console.log(`PASS ${label}`); passed++; } else { console.log(`FAIL ${label}`); if (detail) console.log(`   ${detail}`); failed++; }
}

// Test 1: Approves on first try
const gen1 = (task) => `draft for ${task}`;
const rev1 = (draft) => ({ approved: true, feedback: '' });
const r1 = agentLoop(gen1, rev1, 5);
check('approves on first iteration', r1.iterations === 1);
check('returns result', r1.result && r1.result.includes('draft'));

// Test 2: Approves after feedback
let callCount = 0;
const gen2 = (task) => { callCount++; return `draft ${callCount}`; };
const rev2 = (draft) => draft.includes('3') ? { approved: true, feedback: '' } : { approved: false, feedback: 'improve' };
const r2 = agentLoop(gen2, rev2, 5);
check('loops until approved', r2.iterations >= 2);
check('history tracks iterations', r2.history.length >= 2);

// Test 3: Max iterations termination (THE EDGE CASE)
const neverApprove = (draft) => ({ approved: false, feedback: 'never good enough' });
const gen3 = (task) => 'bad draft';
const r3 = agentLoop(gen3, neverApprove, 3);
check('terminates at max iterations', r3.iterations === 3,
  `naive AI loops forever — got ${r3.iterations} iterations`);
check('result is last draft when max reached', r3.result === 'bad draft');

// Test 4: Default max iterations
const r4 = agentLoop(gen3, neverApprove);
check('default max is reasonable', r4.iterations <= 10);

// Test 5: History contains feedback
check('history entries have feedback', r2.history.every(h => h.feedback !== undefined));

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 5.1 complete. Your agent loops TERMINATE — max iterations guard included.');
  process.exit(0);
}
console.log('\nHint: check the never-approve test. Naive AI loops forever without a max guard.');
process.exit(1);
