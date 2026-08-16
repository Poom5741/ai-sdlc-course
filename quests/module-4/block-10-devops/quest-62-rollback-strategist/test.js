/**
 * Quest 4.20: Rollback Strategist — test suite
 * Requires ./problem.js exporting { deploymentManager }. Run: node test.js
 */

const { deploymentManager } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 4.20: Rollback Strategist\n');

function check(label, cond, detail) {
  if (cond) { console.log(`PASS ${label}`); passed++; } else { console.log(`FAIL ${label}`); if (detail) console.log(`   ${detail}`); failed++; }
}

const mgr = deploymentManager();

// Test 1: Deploy
const id1 = mgr.deploy('v1.0.0', ['feat: login', 'fix: typo']);
check('deploy returns ID', typeof id1 === 'string' && id1.length > 0);

// Test 2: Status
const status1 = mgr.getStatus(id1);
check('getStatus returns status', status1 && status1.version === 'v1.0.0');
check('initial environment is dev', status1.environment === 'dev');

// Test 3: Promote to staging
const promoted = mgr.promote(id1, 'staging');
check('promote returns boolean', typeof promoted === 'boolean');
check('first promote succeeds', promoted === true);

// Test 4: Check status after promote
const status2 = mgr.getStatus(id1);
check('environment updated to staging', status2.environment === 'staging');

// Test 5: Rollback
const rollback = mgr.rollback(id1);
check('rollback returns object with success', rollback.success === true);
check('rollback has previousVersion', rollback.previousVersion === 'v1.0.0');

// Test 6: Status after rollback
const status3 = mgr.getStatus(id1);
check('environment returned to dev after rollback', status3.environment === 'dev');

// Test 7: Deploy new version and test promote without health (THE EDGE CASE)
const id2 = mgr.deploy('v1.1.0', ['feat: dashboard']);
// Try to promote directly to prod without going through staging health
const badPromote = mgr.promote(id2, 'prod');
check('promote to prod without staging fails', badPromote === false,
  `naive AI allows skipping stages — got ${badPromote}`);

// Test 8: History tracks transitions
const status4 = mgr.getStatus(id1);
check('history tracks transitions', status4.history && status4.history.length >= 2,
  `history: ${JSON.stringify(status4.history)}`);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 4.20 complete. You always have a rollback plan — and you check health before promoting.');
  process.exit(0);
}
console.log('\nHint: check the promote-to-prod test. Naive AI allows skipping environment stages.');
process.exit(1);
