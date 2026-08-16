/**
 * Quest 4.3: Input Validator — test suite
 *
 * Requires ./problem.js exporting { validateInput }. Run: node test.js
 */

const { validateInput } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 4.3: Input Validator\n');

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

// Test 1: Valid input passes
const r1 = validateInput(
  { name: 'Alice', age: 30 },
  { name: { type: 'string', required: true }, age: { type: 'number', required: true } }
);
check('valid input passes', r1.valid === true, `errors: ${JSON.stringify(r1.errors)}`);

// Test 2: Missing required field
const r2 = validateInput(
  { name: '' },
  { name: { type: 'string', required: true } }
);
check('empty required string fails', r2.valid === false);
check('reports missing required', r2.errors.length > 0);

// Test 3: Wrong type
const r3 = validateInput(
  { age: 'not-a-number' },
  { age: { type: 'number', required: true } }
);
check('wrong type fails', r3.valid === false);

// Test 4: Email format validation (the edge case!)
const r4 = validateInput(
  { email: 'not-an-email' },
  { email: { type: 'email', required: true } }
);
check('rejects invalid email format', r4.valid === false,
  `naive AI checks typeof only — "not-an-email" is typeof string`);

// Test 5: Valid email
const r5 = validateInput(
  { email: 'user@example.com' },
  { email: { type: 'email', required: true } }
);
check('accepts valid email', r5.valid === true);

// Test 6: Sanitize HTML entities
const r6 = validateInput(
  { bio: '<script>alert("xss")</script>' },
  { bio: { type: 'string', sanitize: true } }
);
check('sanitizes HTML entities', r6.sanitized && r6.sanitized.bio && r6.sanitized.bio.includes('&lt;'),
  `got: ${r6.sanitized && r6.sanitized.bio}`);

// Test 7: MinLength validation
const r7 = validateInput(
  { pass: 'ab' },
  { pass: { type: 'string', minLength: 8 } }
);
check('rejects below minLength', r7.valid === false);

// Test 8: Pattern matching
const r8 = validateInput(
  { code: 'ABC123' },
  { code: { type: 'string', pattern: '^[0-9]+$' } }
);
check('rejects pattern mismatch', r8.valid === false);

// Test 9: Optional field missing is OK
const r9 = validateInput(
  {},
  { nickname: { type: 'string', required: false } }
);
check('optional field missing is valid', r9.valid === true);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 4.3 complete. You validate everything — especially format, not just type.');
  process.exit(0);
}
console.log('\nHint: check the email format test. Naive AI checks typeof string but not email format.');
process.exit(1);
