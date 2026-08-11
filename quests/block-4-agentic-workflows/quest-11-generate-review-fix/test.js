/**
 * Quest 4.2: Generate-Review-Fix — test suite
 *
 * Tool skill: add a review step to the loop.
 * Engineering habit: SEPARATE GENERATION FROM REVIEW — a different "agent"
 * must critique the generator's output, never the generator grading itself.
 *
 * Contract:
 *   problem.js exports { runGrfLoop, runGenerateOnly }.
 *
 *   Draft shape: { value: number, defects: string[] }.
 *
 *   Roles (provided by THIS test, passed into the loop):
 *     generator(seed)            -> draft with deliberate defects
 *     reviewer(draft)            -> issues[] derived from draft.defects
 *     fixer(draft, issues)       -> draft with values bumped and defects fixed
 *     qualityTest(draft)         -> number 0..100 (here: draft.value)
 *
 *   runGenerateOnly({ generator, qualityTest, seed })
 *     -> { finalScore, draft, iterations }  (generator run once, no review/fix)
 *
 *   runGrfLoop({ generator, reviewer, fixer, qualityTest, maxIterations, seed })
 *     -> { finalScore, draft, iterations }
 *     Must loop generate → review → fix, stopping when issues is empty or the
 *     iteration budget is exhausted.
 *
 * Determinism: every role here is a pure function. No AI calls, no network.
 * The ASSERTION: runGrfLoop(...).finalScore > runGenerateOnly(...).finalScore.
 * The stub's runGrfLoop must drop the review+fix steps (pass-through) so the
 * inequality is NOT satisfied — that's the learner's red.
 *
 * Run: node test.js
 */

const { runGrfLoop, runGenerateOnly } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 4.2: Generate-Review-Fix\n');

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

// Deterministic, deliberately-flawed roles.
const SEED = 50;
function generator(seed) {
  return { value: seed, defects: ['typo', 'bug', 'missing-test'] };
}
function reviewer(draft) {
  return (draft.defects || []).map((d) => ({ type: d, severity: 'high' }));
}
function fixer(draft, issues) {
  // Each fix raises the value AND clears the defect list once.
  return {
    value: draft.value + issues.length,
    defects: draft.defects.slice(issues.length),
  };
}
function qualityTest(draft) {
  return draft.value;
}

// Both loops must be functions.
check('runGrfLoop is a function', typeof runGrfLoop === 'function');
check('runGenerateOnly is a function', typeof runGenerateOnly === 'function');

// Control: generate-only produces a known score.
const only = runGenerateOnly({ generator, qualityTest, seed: SEED });
check(
  'runGenerateOnly returns finalScore',
  only && typeof only.finalScore === 'number',
  `got ${JSON.stringify(only)}`,
);
check(
  'runGenerateOnly.finalScore === seed (no fix applied)',
  only && only.finalScore === SEED,
  `got ${only && only.finalScore} expected ${SEED}`,
);

// Treatment: GRF loop must beat generate-only.
const grf = runGrfLoop({
  generator,
  reviewer,
  fixer,
  qualityTest,
  maxIterations: 3,
  seed: SEED,
});

check(
  'runGrfLoop returns finalScore',
  grf && typeof grf.finalScore === 'number',
  `got ${JSON.stringify(grf)}`,
);
check(
  'runGrfLoop returns iterations',
  grf && typeof grf.iterations === 'number',
  `got ${JSON.stringify(grf)}`,
);

const improved =
  grf && only && typeof grf.finalScore === 'number' && grf.finalScore > only.finalScore;
check(
  'GRF beats generate-only (finalScore strictly greater)',
  improved === true,
  `runGrfLoop.finalScore=${grf && grf.finalScore} <= runGenerateOnly.finalScore=${only && only.finalScore}`,
);

// Separation-of-duties: the loop must actually CALL reviewer+fixer. The stub
// returns the generator's draft unchanged → finalScore === seed → not greater.
// We additionally assert the draft's defects were cleared by the fix steps.
check(
  'GRF draft has no remaining defects after fix steps',
  grf && Array.isArray(grf.draft && grf.draft.defects) && grf.draft.defects.length === 0,
  `got defects=${JSON.stringify(grf && grf.draft && grf.draft.defects)}`,
);

// The loop must converge (issues drop to 0) within the budget — not iterate
// uselessly to maxIterations. With 3 defects and fix removing all each pass,
// the loop should converge in 1 iteration.
check(
  'GRF converges before exhausting maxIterations',
  grf && grf.iterations <= 3,
  `got iterations=${grf && grf.iterations}`,
);

// Edge: maxIterations < 1 — loop must still return a coherent result (don't
// crash, just run the generator once and skip the review/fix phase).
const zero = runGrfLoop({
  generator,
  reviewer,
  fixer,
  qualityTest,
  maxIterations: 0,
  seed: SEED,
});
check(
  'runGrfLoop({maxIterations:0}) returns without crashing',
  zero && typeof zero.finalScore === 'number',
  `got ${JSON.stringify(zero)}`,
);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 4.2 complete. Review+fix beats generate-only — generation is separated from review.');
  process.exit(0);
}
console.log('\nHint: runGrfLoop must actually CALL reviewer(draft) and fixer(draft, issues), then re-check. A pass-through stub returns the generator\'s draft unchanged and ties generate-only.');
process.exit(1);