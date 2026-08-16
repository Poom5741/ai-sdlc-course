/**
 * Quest 25.2: Pages Function Router — test suite
 *
 * Run: node test.js
 */

const { routeRequest } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 25.2: Pages Function Router\n');

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

// Test 1: GET request
const r1 = routeRequest('GET', '/api/users', false);
check('GET maps to list/get handler', /list|get/i.test(r1.handler), `got "${r1.handler}"`);
check('GET returns 200', r1.status === 200, `got ${r1.status}`);

// Test 2: POST request
const r2 = routeRequest('POST', '/api/users', false);
check('POST maps to create handler', /create/i.test(r2.handler), `got "${r2.handler}"`);

// Test 3: PUT request
const r3 = routeRequest('PUT', '/api/users/123', false);
check('PUT maps to update handler', /update/i.test(r3.handler), `got "${r3.handler}"`);

// Test 4: DELETE request
const r4 = routeRequest('DELETE', '/api/users/123', false);
check('DELETE maps to delete handler', /delete/i.test(r4.handler), `got "${r4.handler}"`);

// Test 5: OPTIONS request (EDGE CASE — naive AI forgets this)
const r5 = routeRequest('OPTIONS', '/api/users', true);
check('OPTIONS maps to preflight handler', /preflight/i.test(r5.handler), `got "${r5.handler}"`);
check('OPTIONS returns 204', r5.status === 204 || r5.status === 200, `got ${r5.status}`);

// Test 6: CORS headers present when corsEnabled
const r6 = routeRequest('GET', '/api/users', true);
check('CORS headers present when enabled', r6.corsHeaders !== null && typeof r6.corsHeaders === 'object', `got ${JSON.stringify(r6.corsHeaders)}`);
check('CORS has Access-Control-Allow-Origin', r6.corsHeaders && /Access-Control-Allow-Origin/i.test(Object.keys(r6.corsHeaders).join(' ')), `got ${JSON.stringify(r6.corsHeaders)}`);

// Test 7: CORS headers null when disabled
const r7 = routeRequest('GET', '/api/users', false);
check('CORS headers null when disabled', r7.corsHeaders === null, `got ${JSON.stringify(r7.corsHeaders)}`);

// Test 8: OPTIONS with CORS returns proper headers
check('OPTIONS CORS includes Allow-Methods', r5.corsHeaders && /Allow-Methods/i.test(Object.keys(r5.corsHeaders).join(' ')), `got ${JSON.stringify(r5.corsHeaders)}`);

// Test 9: invalid method
const r8 = routeRequest('PATCH', '/api/users', false);
check('invalid method returns error', r8.error !== undefined, `got ${JSON.stringify(r8)}`);

// Test 10: EDGE CASE — naive AI handles GET/POST but forgets OPTIONS preflight
check('OPTIONS with corsEnabled has preflight handler AND CORS headers', r5.handler && r5.corsHeaders, `got handler="${r5.handler}", headers=${JSON.stringify(r5.corsHeaders)}`);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 25.2 complete. You handle CORS preflight correctly.');
  process.exit(0);
}
console.log('\nHint: naive AI forgets OPTIONS for CORS preflight — browsers block cross-origin requests without it.');
process.exit(1);
