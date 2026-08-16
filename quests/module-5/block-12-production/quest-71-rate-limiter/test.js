/**
 * Quest 5.9: Rate Limiter for LLM APIs — test suite
 * Requires ./problem.js exporting { createRateLimiter }. Run: node test.js
 */

const { createRateLimiter } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 5.9: Rate Limiter for LLM APIs\n');

function check(label, cond, detail) {
  if (cond) { console.log(`PASS ${label}`); passed++; } else { console.log(`FAIL ${label}`); if (detail) console.log(`   ${detail}`); failed++; }
}

const limiter = createRateLimiter({ maxTokens: 10, refillRate: 5 });

// Test 1: Consume within limit
const r1 = limiter.consume(3);
check('consume returns allowed=true', r1.allowed === true);
check('remaining decreases', r1.remaining === 7, `got ${r1.remaining}`);

// Test 2: Available tokens
check('available returns remaining', limiter.available() === 7);

// Test 3: Exhaust tokens
limiter.consume(5); // 2 remaining
limiter.consume(2); // 0 remaining
check('tokens exhausted', limiter.available() === 0);

// Test 4: Deny when exhausted (THE EDGE CASE)
const r2 = limiter.consume(1);
check('denies when exhausted', r2.allowed === false,
  `naive AI always allows — got ${r2.allowed}`);
check('retryAfter is positive', r2.retryAfter > 0,
  `retryAfter: ${r2.retryAfter}`);

// Test 5: Refill over time
limiter.reset();
limiter.consume(8); // 2 remaining
// Simulate time passing (refill)
const start = Date.now();
// Wait for refill
while (Date.now() - start < 500) {} // wait 500ms → ~2.5 tokens refilled at 5/sec
const r3 = limiter.consume(3);
check('refill allows continued use', r3.allowed === true,
  `naive counter doesn't refill — got ${r3.allowed}`);

// Test 6: Reset
limiter.reset();
check('reset restores tokens', limiter.available() === 10);

// Test 7: Partial consumption
const limiter2 = createRateLimiter({ maxTokens: 5, refillRate: 1 });
const r4 = limiter2.consume(3);
check('partial consume tracks remaining', r4.remaining === 2);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 5.9 complete. Token bucket refills over time — not fixed windows.');
  process.exit(0);
}
console.log('\nHint: check the refill test. Naive AI uses fixed window counters that reset at intervals.');
process.exit(1);
