/**
 * Quest 21.2: Multi-Tool Workflow Orchestrator — test suite
 */

const { orchestrateWorkflow } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 21.2: Multi-Tool Workflow Orchestrator\n');

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

const tools = [
  { name: 'uppercase', process: (s) => s.toUpperCase() },
  { name: 'addPrefix', process: (s) => `RESULT: ${s}` },
  { name: 'addSuffix', process: (s) => `${s}!` },
];

const result = orchestrateWorkflow(tools, 'hello');

// Test 1: Chains tools correctly
check('chains tools', result.result === 'RESULT: HELLO!',
  `got: ${result.result}`);

// Test 2: Records steps
check('records steps', result.steps.length === 3,
  `got ${result.steps.length} steps`);

// Test 3: Each step has tool, input, output
check('steps have correct fields', result.steps.every(s => s.tool && 'input' in s && 'output' in s));

// Test 4: Step inputs/outputs chain
check('step chaining works', result.steps[0].output === 'HELLO' && result.steps[1].input === 'HELLO');

// Test 5: EDGE CASE — fail-fast on error
const errorTool = { name: 'fail', process: () => { throw new Error('boom'); } };
const toolsWithError = [tools[0], errorTool, tools[2]];
const errorResult = orchestrateWorkflow(toolsWithError, 'hello');
check('stops on error (fail-fast)', errorResult.steps.length < toolsWithError.length,
  `got ${errorResult.steps.length} steps — should stop after error`);

// Test 6: Error recorded
check('error is recorded', errorResult.error || errorResult.steps.some(s => s.error),
  `no error recorded in result`);

// Test 7: Empty tools
const empty = orchestrateWorkflow([], 'hello');
check('empty tools returns input', empty.result === 'hello');

// Test 8: Single tool
const single = orchestrateWorkflow([tools[0]], 'hello');
check('single tool works', single.result === 'HELLO');

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 21.2 complete. You orchestrate multiple AI tools correctly.');
  process.exit(0);
}
console.log('\nHint: check if workflow stops on first error (fail-fast).');
process.exit(1);
