/**
 * Quest 2.3: Domain-Specific Prompting — test suite (Thai ID / phone)
 *
 * Tool skill: write prompts with domain rules.
 * Engineering habit: ENCODE DOMAIN KNOWLEDGE — the AI will not guess Thai
 * format rules; you must put the rules in the prompt.
 *
 * Thai format rules (the learner must encode these in their prompt):
 *   - Thai phone (mobile): 10 digits, starts with 06, 08, or 09. Often
 *     written as 0X-XXXX-XXXX or 0X-XXX-XXXX. Must normalize first.
 *   - Thai national ID: exactly 13 digits. The 13th digit is a checksum
 *     computed from the first 12: sum_{i=1..12} (digit_i * (14-i)) mod 11;
 *     check = (11 - sum) mod 10; that MUST equal digit_13.
 *
 * Requires ./problem.js exporting { isValidThaiPhone, isValidThaiId }.
 * Run: node test.js
 */

const { isValidThaiPhone, isValidThaiId } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 2.3: Domain-Specific Prompting (Thai formats)\n');

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

// ── Thai phone ────────────────────────────────────────────────────────────
check('valid mobile 0812345678', isValidThaiPhone('0812345678') === true);
check('valid mobile 0612345678', isValidThaiPhone('0612345678') === true);
check('valid mobile 0912345678', isValidThaiPhone('0912345678') === true);
check('valid formatted 08-1234-5678', isValidThaiPhone('08-1234-5678') === true);
check('valid formatted 06-123-4567  wait — 10 digits required', isValidThaiPhone('06-1234-5678') === true);

// Edge cases the AI won't guess without the domain rule:
check('reject 9-digit 081234567', isValidThaiPhone('081234567') === false, 'got true');
check('reject wrong-prefix 0512345678', isValidThaiPhone('0512345678') === false, 'must start with 06/08/09');
check('reject letters 08abcdefgh', isValidThaiPhone('08abcdefgh') === false);
check('reject empty', isValidThaiPhone('') === false);

// ── Thai national ID ──────────────────────────────────────────────────────
// Real valid 13-digit IDs (use 1-2-3-4-5-6-7-8-9-0-1-3-? with computed check).
// Compute a known-valid ID: digits 1..12 = 1,2,3,4,5,6,7,8,9,0,1,2
// sum = 1*13 + 2*12 + 3*11 + 4*10 + 5*9 + 6*8 + 7*7 + 8*6 + 9*5 + 0*4 + 1*3 + 2*2
//     = 13+24+33+40+45+48+49+48+45+0+3+4 = 352
// check = (11 - (352 % 11)) % 10 = (11 - 0) % 10 = 1
const validId = '1234567890121';
check(`valid ID ${validId} (checksum=1)`, isValidThaiId(validId) === true);

// Edge cases: bad length, non-numeric, bad checksum.
check('reject 12-digit ID', isValidThaiId('123456789012') === false);
check('reject 14-digit ID', isValidThaiId('12345678901234') === false);
check('reject letters', isValidThaiId('123456789012x') === false);
check('reject bad checksum (last digit wrong)', isValidThaiId('1234567890122') === false);
check('reject empty', isValidThaiId('') === false);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 2.3 complete. You encoded Thai domain rules in the prompt.');
  process.exit(0);
}
console.log('\nHint: the AI will not guess these rules. Put the Thai format (prefixes, length, checksum) in the prompt.');
process.exit(1);