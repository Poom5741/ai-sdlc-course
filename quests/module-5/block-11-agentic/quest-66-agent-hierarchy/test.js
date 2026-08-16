/**
 * Quest 5.4: Hierarchical Agent Team — test suite
 * Requires ./problem.js exporting { createTeam }. Run: node test.js
 */

const { createTeam } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 5.4: Hierarchical Agent Team\n');

function check(label, cond, detail) {
  if (cond) { console.log(`PASS ${label}`); passed++; } else { console.log(`FAIL ${label}`); if (detail) console.log(`   ${detail}`); failed++; }
}

const manager = {
  decompose: (task) => [{ id: 'sub1', desc: `part A of ${task}` }, { id: 'sub2', desc: `part B of ${task}` }],
  assign: (subtasks, workers) => subtasks.map((st, i) => ({ subtask: st, worker: workers[i % workers.length].name })),
  validate: (results) => ({
    accepted: results.filter(r => r.output && !r.output.includes('error')),
    rejected: results.filter(r => r.output && r.output.includes('error')),
  }),
};

const workers = [
  { name: 'worker-1', execute: (subtask) => ({ output: `done: ${subtask.desc}` }) },
  { name: 'worker-2', execute: (subtask) => ({ output: `done: ${subtask.desc}` }) },
];

const team = createTeam(manager, workers);

// Test 1: Execute returns results
const result = team.execute('build feature X');
check('returns results array', Array.isArray(result.results));
check('returns summary', typeof result.summary === 'string');
check('has results from workers', result.results.length >= 2);

// Test 2: Results include worker assignment
check('results have worker info', result.results.every(r => r.worker));

// Test 3: Manager validates results (THE EDGE CASE)
const failManager = {
  decompose: (task) => [{ id: 's1', desc: 'subtask' }],
  assign: (subtasks, workers) => subtasks.map(st => ({ subtask: st, worker: workers[0].name })),
  validate: (results) => ({
    accepted: results.filter(r => !r.output.includes('error')),
    rejected: results.filter(r => r.output.includes('error')),
  }),
};

const failWorker = {
  name: 'fail-worker',
  execute: () => ({ output: 'error: failed to process' }),
};

const failTeam = createTeam(failManager, [failWorker]);
const failResult = failTeam.execute('task');
check('manager rejects bad results', failResult.results.some(r => r.status === 'rejected'),
  `naive AI doesn't validate — got ${JSON.stringify(failResult.results)}`);

// Test 4: Team structure
check('team has execute method', typeof team.execute === 'function');

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 5.4 complete. Hierarchy enables scale — and the manager validates results.');
  process.exit(0);
}
console.log('\nHint: check the reject test. Naive AI assigns work but never validates output.');
process.exit(1);
