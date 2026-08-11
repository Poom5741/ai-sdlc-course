/**
 * Quest 3.2: Fix and Harden — test suite
 *
 * Tool skill: ask AI to fix + harden. Engineering habit: FIX THE CLASS, NOT
 * THE INSTANCE — patch the vulnerability pattern, not just one example.
 *
 * Requires ./problem.js exporting safeQuery(id), validateUserId(s).
 * Run: node test.js
 */

const { safeQuery, validateUserId } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 3.2: Fix and Harden\n');

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

// The injection from Quest 3.1 must be BLOCKED — the query must use a
// parameterized form (a query string with a placeholder + a params array),
// never string concatenation of user input.
const r1 = safeQuery("1 OR 1=1");
check('injection blocked — returns parameterized shape', r1 && typeof r1.query === 'string' && Array.isArray(r1.params), `got ${JSON.stringify(r1)}`);
check('placeholder used (no raw concatenation)', r1 && !String(r1.query).includes('1 OR 1=1'), `query leaked input: ${r1 && r1.query}`);
check('params carry the input (not in query text)', r1 && r1.params.includes("1 OR 1=1"));

// Validation rejects bad input (fix the class, not the instance).
check('valid numeric id accepted', validateUserId('42') === true);
check('non-numeric id rejected', validateUserId('abc') === false);
check('empty rejected', validateUserId('') === false);
check('null rejected', validateUserId(null) === false);
check('injection payload rejected', validateUserId("1 OR 1=1") === false);
check('negative id rejected', validateUserId('-1') === false);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 3.2 complete. You fixed the class, not the instance.');
  process.exit(0);
}
console.log('\nHint: safeQuery must use ? + params array; validateUserId must reject non-numeric, empty, null, negative, injection payloads.');
process.exit(1);