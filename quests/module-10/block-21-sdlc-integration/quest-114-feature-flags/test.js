/**
 * Quest 21.4: Feature Flag System — test suite
 */

const { createFeatureFlag, evaluateFlag } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 21.4: Feature Flag System\n');

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

// Test 1: Create flag
const flag = createFeatureFlag('new-ui', { percentage: 50 });
check('creates flag', flag && flag.name === 'new-ui');
check('flag has config', flag.config.percentage === 50);

// Test 2: Evaluate flag
const result = evaluateFlag(flag, { userId: 'user-1', environment: 'production' });
check('evaluateFlag returns enabled boolean', typeof result.enabled === 'boolean');
check('evaluateFlag returns reason', typeof result.reason === 'string');

// Test 3: 100% rollout always enabled
const fullFlag = createFeatureFlag('full', { percentage: 100 });
const fullResult = evaluateFlag(fullFlag, { userId: 'user-1', environment: 'production' });
check('100% rollout always enabled', fullResult.enabled === true);

// Test 4: 0% rollout never enabled
const zeroFlag = createFeatureFlag('zero', { percentage: 0 });
const zeroResult = evaluateFlag(zeroFlag, { userId: 'user-1', environment: 'production' });
check('0% rollout never enabled', zeroResult.enabled === false);

// Test 5: EDGE CASE — deterministic results (same user = same result)
const result2 = evaluateFlag(flag, { userId: 'user-1', environment: 'production' });
check('deterministic: same user gets same result', result.enabled === result2.enabled,
  `first: ${result.enabled}, second: ${result2.enabled}`);

// Test 6: Different users can get different results (at 50%)
const flag50 = createFeatureFlag('test50', { percentage: 50 });
const userResults = Array.from({ length: 20 }, (_, i) =>
  evaluateFlag(flag50, { userId: `user-${i}`, environment: 'production' }).enabled
);
const trueCount = userResults.filter(Boolean).length;
check('50% rollout splits users roughly evenly', trueCount > 3 && trueCount < 17,
  `got ${trueCount}/20 enabled`);

// Test 7: Rule-based targeting
const ruleFlag = createFeatureFlag('beta', { percentage: 0, rules: [{ key: 'environment', value: 'staging' }] });
const stagingResult = evaluateFlag(ruleFlag, { userId: 'u1', environment: 'staging' });
const prodResult = evaluateFlag(ruleFlag, { userId: 'u1', environment: 'production' });
check('rule enables for staging', stagingResult.enabled === true);
check('rule does not enable for production', prodResult.enabled === false);

// Test 8: Empty config defaults
const emptyFlag = createFeatureFlag('empty');
check('empty config defaults', emptyFlag.config.percentage === undefined || emptyFlag.config.percentage === 0);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 21.4 complete. You build deterministic feature flags with AI recommendations.');
  process.exit(0);
}
console.log('\nHint: check if the same user always gets the same result (deterministic hashing, not Math.random).');
process.exit(1);
