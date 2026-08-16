/**
 * Quest 6.5: Prompt Chainer — test suite
 * Requires ./problem.js exporting { createChain }. Run: node test.js
 */

const { createChain } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 6.5: Prompt Chainer\n');

function check(label, cond, detail) {
  if (cond) { console.log(`PASS ${label}`); passed++; } else { console.log(`FAIL ${label}`); if (detail) console.log(`   ${detail}`); failed++; }
}

// Test 1: Simple chain
const chain1 = createChain([
  { name: 'step1', prompt: (input) => `Process: ${input}`, parse: (out) => out.toUpperCase() },
  { name: 'step2', prompt: (input) => `Analyze: ${input}`, parse: (out) => out.length },
]);
const r1 = chain1.run('hello');
check('chain runs', r1.finalOutput !== null);
check('step 1 output is uppercase', r1.steps[0].output === 'HELLO');
check('step 2 output is length', r1.finalOutput === 5);

// Test 2: Steps see previous output
check('step 2 input is step 1 output', r1.steps[1].input === 'HELLO');

// Test 3: History recorded
check('history has all steps', r1.steps.length === 2);
check('history has step names', r1.steps[0].name === 'step1' && r1.steps[1].name === 'step2');

// Test 4: Failure stops chain (THE EDGE CASE)
const failChain = createChain([
  { name: 'ok', prompt: () => 'ok', parse: (o) => o },
  { name: 'fail', prompt: () => { throw new Error('boom'); }, parse: (o) => o },
  { name: 'never', prompt: () => 'never', parse: (o) => o },
]);
const r2 = failChain.run('start');
check('failure stops chain', r2.steps.length === 2,
  `naive AI runs all steps — got ${r2.steps.length} steps`);
check('reports failed step', r2.failedStep === 'fail' || r2.error,
  `failedStep: ${r2.failedStep}, error: ${r2.error}`);
check('never-run step not in history', !r2.steps.some(s => s.name === 'never'));

// Test 5: Chain creates correctly
check('createChain returns object with run', typeof createChain([]).run === 'function');

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 6.5 complete. Prompt chains stop on failure — not blindly continue.');
  process.exit(0);
}
console.log('\nHint: check the failure test. Naive AI runs all steps even when one fails.');
process.exit(1);
