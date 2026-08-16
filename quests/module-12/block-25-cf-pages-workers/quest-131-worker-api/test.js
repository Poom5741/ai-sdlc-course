/**
 * Quest 25.3: Worker API Builder — test suite
 *
 * Run: node test.js
 */

const { buildWorkerRoute } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 25.3: Worker API Builder\n');

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

// Test 1: KV route
const r1 = buildWorkerRoute('GET', '/kv/mykey', { hasKV: true, hasD1: false, isPreview: false });
check('KV route uses kv storage', r1.storage === 'kv', `got "${r1.storage}"`);
check('KV route has handler', r1.handler.length > 0, `got "${r1.handler}"`);

// Test 2: D1 route
const r2 = buildWorkerRoute('GET', '/d1/users', { hasKV: false, hasD1: true, isPreview: false });
check('D1 route uses d1 storage', r2.storage === 'd1', `got "${r2.storage}"`);

// Test 3: D1 in preview needs error handling (EDGE CASE)
const r3 = buildWorkerRoute('GET', '/d1/users', { hasKV: false, hasD1: true, isPreview: true });
check('D1 preview has error handling', r3.errorHandling.length > 0, `got ${JSON.stringify(r3.errorHandling)}`);
check('D1 preview error mentions "database not ready"', r3.errorHandling.some(e => /database|not.?ready|preview/i.test(e)), `got ${JSON.stringify(r3.errorHandling)}`);

// Test 4: non-storage route
const r4 = buildWorkerRoute('GET', '/api/health', { hasKV: false, hasD1: false, isPreview: false });
check('non-storage route uses none', r4.storage === 'none', `got "${r4.storage}"`);

// Test 5: all methods supported
const r5 = buildWorkerRoute('POST', '/d1/users', { hasD1: true, isPreview: false });
check('POST D1 route works', r5.storage === 'd1', `got "${r5.storage}"`);

// Test 6: error handling array is present
check('error handling is array', Array.isArray(r1.errorHandling));

// Test 7: status code is valid
check('status code is 200', r1.status === 200, `got ${r1.status}`);

// Test 8: EDGE CASE — naive AI doesn't handle D1 preview errors
const r6 = buildWorkerRoute('POST', '/d1/orders', { hasD1: true, isPreview: true });
check('D1 preview POST also has error handling', r6.errorHandling.length > 0, `got ${JSON.stringify(r6.errorHandling)}`);

// Test 9: KV with hasKV=false should still work
const r7 = buildWorkerRoute('GET', '/kv/mykey', { hasKV: false, hasD1: false, isPreview: false });
check('KV route without hasKV still routes correctly', r7.handler.length > 0);

// Test 10: D1 with hasD1=false should still route
const r8 = buildWorkerRoute('GET', '/d1/users', { hasKV: false, hasD1: false, isPreview: false });
check('D1 route without hasD1 still routes correctly', r8.handler.length > 0);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 25.3 complete. You handle D1 preview errors correctly.');
  process.exit(0);
}
console.log('\nHint: naive AI doesn\'t handle "database not ready" in D1 preview environments.');
process.exit(1);
