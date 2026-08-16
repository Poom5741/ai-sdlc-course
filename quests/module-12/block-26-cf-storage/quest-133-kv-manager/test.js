/**
 * Quest 26.1: KV Store Manager — test suite
 *
 * Run: node test.js
 */

const { buildKVKey } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 26.1: KV Store Manager\n');

function check(label, condition, detail) {
  if (condition) {
    console.log(`PASS ${label}`);
    passed++;
  } else {
    console.log(`FAIL ${label}`);
    if (detail) console.log(`   ${detail}`);
    failed++;
  }
}

// Test 1: basic key generation
const r1 = buildKVKey('users', 'user', '123', 'read');
check('key has correct format', r1.key === 'users:user:123', `got "${r1.key}"`);

// Test 2: TTL for read is 0
check('read TTL is 0', r1.ttl === 0, `got ${r1.ttl}`);

// Test 3: TTL for write is 3600
const r2 = buildKVKey('users', 'user', '123', 'write');
check('write TTL is 3600', r2.ttl === 3600, `got ${r2.ttl}`);

// Test 4: TTL for delete is 0
const r3 = buildKVKey('users', 'user', '123', 'delete');
check('delete TTL is 0', r3.ttl === 0, `got ${r3.ttl}`);

// Test 5: EDGE CASE — naive AI doesn't namespace keys
// Different namespaces should produce different keys
const r4 = buildKVKey('sessions', 'session', 'abc', 'read');
check('different namespace produces different key', r4.key !== r1.key, `got "${r4.key}" vs "${r1.key}"`);
check('session key includes namespace', r4.key.startsWith('sessions:'), `got "${r4.key}"`);

// Test 6: invalid namespace
const r5 = buildKVKey('', 'user', '123', 'read');
check('empty namespace returns error', r5.error !== undefined, `got ${JSON.stringify(r5)}`);

// Test 7: invalid entity
const r6 = buildKVKey('users', '', '123', 'read');
check('empty entity returns error', r6.error !== undefined);

// Test 8: invalid action
const r7 = buildKVKey('users', 'user', '123', 'invalid');
check('invalid action returns error', r7.error !== undefined);

// Test 9: key with special characters in id
const r8 = buildKVKey('users', 'user', 'abc-def-123', 'read');
check('key handles hyphens in id', r8.key === 'users:user:abc-def-123', `got "${r8.key}"`);

// Test 10: no collision between user:123 and session:123
const userKey = buildKVKey('users', 'user', '123', 'read');
const sessionKey = buildKVKey('sessions', 'session', '123', 'read');
check('no collision between user and session keys', userKey.key !== sessionKey.key, `user="${userKey.key}", session="${sessionKey.key}"`);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 26.1 complete. You namespace KV keys correctly.');
  process.exit(0);
}
console.log('\nHint: naive AI doesn\'t namespace keys — use namespace:entity:id format.');
process.exit(1);
