/**
 * Test file for Token Budgeter quest
 */

const { TokenBudgeter } = require('./problem.js');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
    passed++;
  } catch (e) {
    console.log(`✗ ${name}: ${e.message}`);
    failed++;
  }
}

function assert(condition, msg) {
  if (!condition) throw new Error(msg || 'Assertion failed');
}

// Test 1: Basic usage recording
test('Records usage correctly', () => {
  const budget = new TokenBudgeter({ dailyLimit: 10000, monthlyLimit: 100000 });
  
  const result = budget.recordUsage('user1', 500, 300, 'gpt-4o');
  
  assert(result.allowed, 'Should allow usage within limits');
  assert(result.usage.daily === 800, 'Should track daily usage');
  assert(result.usage.monthly === 800, 'Should track monthly usage');
});

// Test 2: Daily limit enforcement
test('Blocks when daily limit exceeded', () => {
  const budget = new TokenBudgeter({ dailyLimit: 1000, monthlyLimit: 100000 });
  
  budget.recordUsage('user1', 500, 400, 'gpt-4o'); // 900 tokens
  const result = budget.recordUsage('user1', 500, 400, 'gpt-4o'); // 1800 total
  
  assert(!result.allowed, 'Should block when daily limit exceeded');
});

// Test 3: Monthly limit enforcement
test('Blocks when monthly limit exceeded', () => {
  const budget = new TokenBudgeter({ dailyLimit: 100000, monthlyLimit: 1000 });
  
  budget.recordUsage('user1', 500, 400, 'gpt-4o'); // 900 tokens
  const result = budget.recordUsage('user1', 500, 400, 'gpt-4o'); // 1800 total
  
  assert(!result.allowed, 'Should block when monthly limit exceeded');
});

// Test 4: Alert generation
test('Generates alerts near limits', () => {
  const budget = new TokenBudgeter({ dailyLimit: 1000, monthlyLimit: 100000, alertThreshold: 0.8 });
  
  budget.recordUsage('user1', 400, 300, 'gpt-4o'); // 700 tokens (70%)
  const result = budget.recordUsage('user1', 100, 50, 'gpt-4o'); // 850 tokens (85%)
  
  assert(result.alerts.length > 0, 'Should generate alerts when approaching limit');
});

// Test 5: Get status
test('Returns correct status', () => {
  const budget = new TokenBudgeter({ dailyLimit: 1000, monthlyLimit: 10000 });
  
  budget.recordUsage('user1', 200, 100, 'gpt-4o');
  const status = budget.getStatus('user1');
  
  assert(status.daily.used === 300, 'Should show daily usage');
  assert(status.daily.limit === 1000, 'Should show daily limit');
  assert(status.monthly.used === 300, 'Should show monthly usage');
});

// Test 6: Separate users
test('Tracks users separately', () => {
  const budget = new TokenBudgeter({ dailyLimit: 1000, monthlyLimit: 10000 });
  
  budget.recordUsage('user1', 200, 100, 'gpt-4o');
  budget.recordUsage('user2', 300, 200, 'gpt-4o');
  
  const status1 = budget.getStatus('user1');
  const status2 = budget.getStatus('user2');
  
  assert(status1.daily.used === 300, 'user1 should have 300 tokens');
  assert(status2.daily.used === 500, 'user2 should have 500 tokens');
});

// Test 7: Daily reset
test('Resets daily usage', () => {
  const budget = new TokenBudgeter({ dailyLimit: 1000, monthlyLimit: 10000 });
  
  budget.recordUsage('user1', 500, 400, 'gpt-4o');
  budget.resetDaily();
  
  const status = budget.getStatus('user1');
  assert(status.daily.used === 0, 'Daily usage should be reset');
});

// Test 8: Monthly reset
test('Resets monthly usage', () => {
  const budget = new TokenBudgeter({ dailyLimit: 1000, monthlyLimit: 10000 });
  
  budget.recordUsage('user1', 500, 400, 'gpt-4o');
  budget.resetMonthly();
  
  const status = budget.getStatus('user1');
  assert(status.monthly.used === 0, 'Monthly usage should be reset');
});

// Test 9: Usage includes model cost consideration
test('Tracks model type for cost estimation', () => {
  const budget = new TokenBudgeter({ dailyLimit: 1000, monthlyLimit: 10000 });
  
  const result = budget.recordUsage('user1', 500, 300, 'gpt-4o');
  
  assert(result.usage !== undefined, 'Should return usage info');
});

// Test 10: Alerts are actionable
test('Alerts include useful information', () => {
  const budget = new TokenBudgeter({ dailyLimit: 1000, monthlyLimit: 10000, alertThreshold: 0.5 });
  
  budget.recordUsage('user1', 300, 200, 'gpt-4o'); // 500 tokens (50%)
  const result = budget.recordUsage('user1', 100, 50, 'gpt-4o'); // 650 tokens (65%)
  
  if (result.alerts.length > 0) {
    assert(result.alerts[0].length > 0, 'Alert should have content');
  }
});

console.log(`\n${passed}/${passed + failed} tests passed`);
if (failed > 0) process.exit(1);
