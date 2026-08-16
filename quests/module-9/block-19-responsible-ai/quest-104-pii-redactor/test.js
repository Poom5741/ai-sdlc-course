/**
 * Quest 19.2: PII Redactor — test suite
 */

const { redactPII } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 19.2: PII Redactor\n');

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

// Test 1: Redacts email
const r1 = redactPII('Contact me at john@example.com');
check('redacts email', r1.redacted.includes('[EMAIL REDACTED]'),
  `got: ${r1.redacted}`);

// Test 2: Redacts phone
const r2 = redactPII('Call me at 555-123-4567');
check('redacts phone', r2.redacted.includes('[PHONE REDACTED]'),
  `got: ${r2.redacted}`);

// Test 3: Redacts SSN
const r3 = redactPII('SSN: 123-45-6789');
check('redacts SSN', r3.redacted.includes('[SSN REDACTED]'),
  `got: ${r3.redacted}`);

// Test 4: Returns found counts
check('found object has counts', typeof r1.found === 'object' && r1.found.email >= 1,
  `got: ${JSON.stringify(r1.found)}`);

// Test 5: EDGE CASE — example emails NOT redacted
const r5 = redactPII('Use test@example.com for testing');
check('does NOT redact example emails',
  !r5.redacted.includes('[EMAIL REDACTED]'),
  `got: ${r5.redacted} — example emails should be kept`);

// Test 6: Redacts name after "My name is"
const r6 = redactPII('My name is Alice Smith');
check('redacts name after "My name is"', r6.redacted.includes('[NAME REDACTED]'),
  `got: ${r6.redacted}`);

// Test 7: Clean text unchanged
const r7 = redactPII('No PII here');
check('clean text unchanged', r7.redacted === 'No PII here');

// Test 8: Empty input
const r8 = redactPII('');
check('empty input returns empty', r8.redacted === '');

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 19.2 complete. You redact PII while preserving documentation.');
  process.exit(0);
}
console.log('\nHint: check if test@example.com is NOT redacted — it is example data, not real PII.');
process.exit(1);
