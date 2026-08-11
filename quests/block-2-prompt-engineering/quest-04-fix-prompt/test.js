/**
 * Quest 2.1: Fix the Vague Prompt — test suite
 *
 * Tool skill: rewrite a bad prompt. Engineering habit: SPECIFY BEFORE
 * GENERATING — write the constraints, then ask the AI.
 *
 * Requires ./problem.js. Run: node test.js
 */

const createUser = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 2.1: Fix the Vague Prompt\n');

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

// Constraint 1: valid input returns success shape with id, name, email.
const ok = createUser({ name: 'Ada', email: 'ada@example.com' });
check('valid input returns success:true', ok && ok.success === true, `got ${JSON.stringify(ok)}`);
check('valid input returns an id', ok && typeof ok.id === 'string' && ok.id.length > 0);
check('valid input echoes name', ok && ok.name === 'Ada');
check('valid input echoes email', ok && ok.email === 'ada@example.com');

// Constraint 2: empty/missing input is handled (not thrown, not silently ok).
try {
  const empty = createUser({});
  check('empty input does not throw', true);
  check('empty input returns success:false', empty && empty.success === false, `got ${JSON.stringify(empty)}`);
  check('empty input returns an error message', empty && typeof empty.error === 'string' && empty.error.length > 0);
} catch (e) {
  check('empty input does not throw', false, `threw: ${e.message}`);
  failed++;
  check('empty input returns success:false', false);
  check('empty input returns an error message', false);
}

// Constraint 3: null input handled (error, not crash).
try {
  const n = createUser(null);
  check('null input handled with error', n && n.success === false, `got ${JSON.stringify(n)}`);
} catch (e) {
  check('null input handled with error', false, `threw: ${e.message}`);
}

// Constraint 4: invalid email is rejected.
const bad = createUser({ name: 'Ada', email: 'not-an-email' });
check('invalid email rejected', bad && bad.success === false, `got ${JSON.stringify(bad)}`);
check('invalid email has error message', bad && typeof bad.error === 'string' && bad.error.length > 0);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 2.1 complete. You specified the constraints before generating.');
  process.exit(0);
}
console.log('\nHint: write the constraints (empty input, error handling, id, shape) BEFORE asking the AI.');
process.exit(1);