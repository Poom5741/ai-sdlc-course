/**
 * Quest 5.10: Production Readiness Checker — test suite
 * Requires ./problem.js exporting { checkReadiness }. Run: node test.js
 */

const { checkReadiness } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 5.10: Production Readiness Checker\n');

function check(label, cond, detail) {
  if (cond) { console.log(`PASS ${label}`); passed++; } else { console.log(`FAIL ${label}`); if (detail) console.log(`   ${detail}`); failed++; }
}

// Test 1: Fully ready config
const readyConfig = {
  hasTests: true, hasCI: true, hasMonitoring: true, hasRollback: true,
  hasLogging: true, hasAuth: true, hasRateLimit: true, hasHealthCheck: true,
  documentation: 'complete', sla: '99.9%',
};
const r1 = checkReadiness(readyConfig);
check('fully ready config is ready', r1.ready === true, `ready: ${r1.ready}`);
check('score is high', r1.score >= 90, `score: ${r1.score}`);
check('checklist has items', r1.checklist.length > 0);

// Test 2: Missing critical item (THE EDGE CASE)
const noAuth = { ...readyConfig, hasAuth: false };
const r2 = checkReadiness(noAuth);
check('missing auth = not ready', r2.ready === false,
  `naive AI counts items but ignores severity — ready: ${r2.ready}`);
check('auth item is marked critical', r2.checklist.some(c => c.item.includes('auth') && c.severity === 'critical'));

// Test 3: Score calculation
check('score is a number 0-100', r1.score >= 0 && r1.score <= 100);

// Test 4: Partial readiness
const partial = { hasTests: true, hasCI: true, hasMonitoring: false, hasRollback: false,
  hasLogging: true, hasAuth: true, hasRateLimit: false, hasHealthCheck: true,
  documentation: 'partial', sla: null };
const r3 = checkReadiness(partial);
check('partial config not ready', r3.ready === false);
check('score reflects partial completion', r3.score > 0 && r3.score < 100);

// Test 5: Each checklist item has required fields
check('checklist items have item field', r1.checklist.every(c => c.item));
check('checklist items have passed field', r1.checklist.every(c => typeof c.passed === 'boolean'));
check('checklist items have severity field', r1.checklist.every(c => c.severity));

// Test 6: Empty config
const r4 = checkReadiness({});
check('empty config not ready', r4.ready === false);
check('empty config score is 0', r4.score === 0);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 5.10 complete. Production readiness weights critical failures — not just item count.');
  process.exit(0);
}
console.log('\nHint: check the no-auth test. Naive AI counts passing items but ignores severity.');
process.exit(1);
