/**
 * Quest 4.4: Auth System Hardener — test suite
 *
 * Requires ./problem.js exporting { hashPassword, verifyPassword, createToken, verifyToken }.
 * Run: node test.js
 */

const { hashPassword, verifyPassword, createToken, verifyToken } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 4.4: Auth System Hardener\n');

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

// === Password hashing ===
// Test 1: Short password rejected
try {
  hashPassword('ab');
  check('rejects short password', false, 'should have thrown');
} catch (e) {
  check('rejects short password', true);
}

// Test 2: Weak password (no uppercase, no digit) rejected
try {
  hashPassword('alllowercase');
  check('rejects weak password (no upper/digit)', false, 'should have thrown');
} catch (e) {
  check('rejects weak password (no upper/digit)', true);
}

// Test 3: Strong password hashes successfully
const result = hashPassword('Strong1Pass');
check('hashPassword returns {hash, salt}', result && typeof result.hash === 'string' && typeof result.salt === 'string');
check('hash is not plaintext', result.hash !== 'Strong1Pass');

// Test 4: Same password, different salt (entropy)
const r2 = hashPassword('Strong1Pass');
check('different calls produce different salts', result.salt !== r2.salt,
  `salt1=${result.salt}, salt2=${r2.salt} — salts must be random`);

// Test 5: verifyPassword works
const verified = verifyPassword('Strong1Pass', result.hash, result.salt);
check('verifyPassword returns true for correct password', verified === true);

// Test 6: Wrong password fails verification
const wrong = verifyPassword('Wrong1Pass', result.hash, result.salt);
check('verifyPassword returns false for wrong password', wrong === false);

// === Token system ===
const secret = 'test-secret-key';
// Test 7: Create and verify valid token
const token = createToken('user-123', secret, 60000);
check('createToken returns a string', typeof token === 'string' && token.length > 0);

const decoded = verifyToken(token, secret);
check('verifyToken returns valid:true for fresh token', decoded.valid === true);
check('verifyToken returns correct userId', decoded.userId === 'user-123');

// Test 8: Expired token (THE EDGE CASE)
const expiredToken = createToken('user-456', secret, -1); // already expired
const expiredResult = verifyToken(expiredToken, secret);
check('expired token returns valid:false', expiredResult.valid === false,
  `naive AI forgets expiration check — got valid:${expiredResult.valid}`);
check('expired token has reason', expiredResult.reason && expiredResult.reason.length > 0);

// Test 9: Wrong secret
const wrongSecretResult = verifyToken(token, 'wrong-secret');
check('wrong secret returns valid:false', wrongSecretResult.valid === false);

// Test 10: Tampered token
const tampered = token.slice(0, -5) + 'XXXXX';
const tamperedResult = verifyToken(tampered, secret);
check('tampered token returns valid:false', tamperedResult.valid === false);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 4.4 complete. You built auth with defense in depth — hashing + expiration + integrity.');
  process.exit(0);
}
console.log('\nHint: check the expiration test. Naive AI creates tokens without expiry checks.');
process.exit(1);
