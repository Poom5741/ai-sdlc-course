/**
 * Quest 4.1: Set Up a Loop — test suite
 *
 * Tool skill: configure an automated dev loop.
 * Engineering habit: AUTOMATE THE VERIFY STEP — the loop must call a
 * deterministic `verify()` (the test) every iteration, not eyeball results.
 *
 * Contract:
 *   problem.js exports { runLoop, generate }.
 *   `generate(iteration)` returns a draft (a number). The working impl returns
 *   the correct answer (42) starting at iteration 3; before that it returns a
 *   wrong value.
 *   `runLoop({ maxIterations })` repeatedly calls generate + verify until the
 *   draft converges, then returns { converged, iterations }.
 *
 * Deterministic + hermetic: no AI calls, no network, no fs.
 * Run: node test.js  (prints PASS/FAIL lines, exits 0 on green / 1 on red)
 */

const { runLoop, generate } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 4.1: Set Up a Loop\n');

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

// generate must be a function that varies by iteration (the loop's whole point).
check('generate is a function', typeof generate === 'function');
const g1 = generate(1);
const g2 = generate(2);
const g3 = generate(3);
check('generate(1) returns a number', typeof g1 === 'number', `got ${typeof g1}`);
check('generate(2) returns a number', typeof g2 === 'number', `got ${typeof g2}`);
check('generate(3) returns a number', typeof g3 === 'number', `got ${typeof g3}`);

// Core: loop converges within maxIterations when generate() eventually passes.
const converged = runLoop({ maxIterations: 5 });
check(
  'runLoop({maxIterations:5}) converges',
  converged && converged.converged === true,
  `got ${JSON.stringify(converged)}`,
);
check(
  'converged result has iterations field',
  converged && typeof converged.iterations === 'number',
  `got ${JSON.stringify(converged)}`,
);

// Must converge by iteration 3 (the solution's generate passes at iteration 3).
check(
  'loop converges in <= 3 iterations',
  converged && converged.iterations <= 3,
  `got iterations=${converged && converged.iterations}`,
);

// Edge: maxIterations too small to reach convergence → must NOT converge.
const tooSmall = runLoop({ maxIterations: 2 });
check(
  'runLoop({maxIterations:2}) does not converge',
  tooSmall && tooSmall.converged === false,
  `got ${JSON.stringify(tooSmall)}`,
);
check(
  'too-small loop reports iterations run',
  tooSmall && typeof tooSmall.iterations === 'number',
  `got ${JSON.stringify(tooSmall)}`,
);

// Edge: maxIterations < 1 must be rejected (converged:false, no crash).
const zero = runLoop({ maxIterations: 0 });
check(
  'runLoop({maxIterations:0}) rejects (converged:false)',
  zero && zero.converged === false,
  `got ${JSON.stringify(zero)}`,
);

const negative = runLoop({ maxIterations: -1 });
check(
  'runLoop({maxIterations:-1}) rejects (converged:false)',
  negative && negative.converged === false,
  `got ${JSON.stringify(negative)}`,
);

// Convergence threshold semantics: a generous budget must still converge exactly
// when generate first passes (not "always iterate to the max").
check(
  'loop does not over-iterate (iterations reflects first pass)',
  converged && converged.iterations === 3,
  `got iterations=${converged && converged.iterations} (expected exactly 3)`,
);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 4.1 complete. The loop auto-verifies until convergence.');
  process.exit(0);
}
console.log('\nHint: runLoop must call generate + verify each iteration and stop as soon as verify passes; maxIterations < 1 must not crash.');
process.exit(1);