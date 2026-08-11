/**
 * Quest 4.3: Multi-Agent Pipeline — test suite
 *
 * Tool skill: orchestrate multi-role agents.
 * Engineering habit: ANTI-BAMBOOZLE ARCHITECTURE — the agent that writes the
 * tests must NOT be the same agent that runs them. If they are the same
 * reference, the "tests" are not independent and a sloppy implementation can
 * pass its own tests (bamboozling itself).
 *
 * Contract:
 *   problem.js exports { buildPipeline }.
 *
 *   buildPipeline({ codeWriter, testWriter, testRunner }) returns a pipeline
 *   object with three stages: writeCode, writeTests, runTests — each wired to
 *   the role functions passed in. Crucially, the testWriter and testRunner
 *   must be the DISTINCT objects passed in (reference inequality), proving the
 *   pipeline did not silently collapse them into the same agent.
 *
 * Determinism: pure functions, no AI/network. The assertion is a reference
 * inequality plus a wiring check.
 *
 * The stub's buildPipeline returns a pipeline where testWriter === testRunner
 * (bamboozled) and/or the stages aren't wired — that's the learner's red.
 *
 * Run: node test.js
 */

const { buildPipeline } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 4.3: Multi-Agent Pipeline\n');

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

check('buildPipeline is a function', typeof buildPipeline === 'function');

// Three DISTINCT function objects (simulating three distinct agents).
const codeWriter = (task) => ({ kind: 'code', task, src: `// code for ${task}` });
const testWriter = (code) => ({ kind: 'tests', cases: [`${code.task} works`] });
const testRunner = (tests) => ({ kind: 'report', ran: tests.cases.length, allPassed: true });

check('testWriter and testRunner are distinct objects', testWriter !== testRunner);

const pipeline = buildPipeline({ codeWriter, testWriter, testRunner });

check('buildPipeline returns a pipeline object', pipeline && typeof pipeline === 'object');

// ANTI-BAMBOOZLE: the pipeline must keep testWriter and testRunner separate.
check(
  'pipeline.testWriter !== pipeline.testRunner (anti-bamboozle)',
  pipeline && pipeline.testWriter !== pipeline.testRunner,
  'pipeline collapsed testWriter and testRunner into the same reference',
);

// Wiring: the three stages must be bound to the role functions we passed in.
check(
  'pipeline.writeCode is a function',
  pipeline && typeof pipeline.writeCode === 'function',
  `got ${typeof (pipeline && pipeline.writeCode)}`,
);
check(
  'pipeline.writeTests is a function',
  pipeline && typeof pipeline.writeTests === 'function',
  `got ${typeof (pipeline && pipeline.writeTests)}`,
);
check(
  'pipeline.runTests is a function',
  pipeline && typeof pipeline.runTests === 'function',
  `got ${typeof (pipeline && pipeline.runTests)}`,
);

// End-to-end run exercises all three stages with the real role functions.
let code = null;
let tests = null;
let report = null;
try {
  code = pipeline.writeCode('sum');
  tests = pipeline.writeTests(code);
  report = pipeline.runTests(tests);
} catch (err) {
  check('pipeline stages run without throwing', false, `threw: ${err.message}`);
}

check('writeCode returns code object with kind "code"', code && code.kind === 'code', `got ${JSON.stringify(code)}`);
check('writeTests returns tests object with kind "tests"', tests && tests.kind === 'tests', `got ${JSON.stringify(tests)}`);
check('runTests returns report object with kind "report"', report && report.kind === 'report', `got ${JSON.stringify(report)}`);
check('runTests executed the test cases', report && report.ran >= 1, `got ${JSON.stringify(report)}`);

// The role functions wired into the pipeline must be the SAME references the
// caller passed in — proving the pipeline didn't swap in its own agents.
check(
  'pipeline.codeWriter is the caller\'s codeWriter (not a substitute)',
  pipeline && pipeline.codeWriter === codeWriter,
  'pipeline substituted a different codeWriter than the one passed in',
);
check(
  'pipeline.testWriter is the caller\'s testWriter (not a substitute)',
  pipeline && pipeline.testWriter === testWriter,
  'pipeline substituted a different testWriter than the one passed in',
);
check(
  'pipeline.testRunner is the caller\'s testRunner (not a substitute)',
  pipeline && pipeline.testRunner === testRunner,
  'pipeline substituted a different testRunner than the one passed in',
);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 4.3 complete. testWriter and testRunner remain independent — anti-bamboozle.');
  process.exit(0);
}
console.log('\nHint: the stub returns a pipeline where testWriter===testRunner, or the stages aren\'t wired to the passed-in functions. The test caught that.');
process.exit(1);