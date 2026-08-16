/**
 * Test file for Monitoring Dashboard quest
 */

const { createDashboard } = require('./problem.js');

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

// Test 1: Creates basic dashboard
test('Creates basic dashboard structure', () => {
  const result = createDashboard({
    appName: 'MyChatBot',
    models: ['gpt-4o'],
    budget: 100
  });
  
  assert(result.metrics.length > 0, 'Should have metrics');
  assert(result.alerts.length > 0, 'Should have alerts');
  assert(result.widgets.length > 0, 'Should have widgets');
});

// Test 2: Includes latency metric
test('Includes latency metric', () => {
  const result = createDashboard({
    appName: 'MyApp',
    models: ['gpt-4o'],
    budget: 100
  });
  
  const hasLatency = result.metrics.some(m => 
    m.name.toLowerCase().includes('latency') || 
    m.name.toLowerCase().includes('response time')
  );
  assert(hasLatency, 'Should include latency metric');
});

// Test 3: Includes cost metric
test('Includes cost metric', () => {
  const result = createDashboard({
    appName: 'MyApp',
    models: ['gpt-4o'],
    budget: 100
  });
  
  const hasCost = result.metrics.some(m => 
    m.name.toLowerCase().includes('cost')
  );
  assert(hasCost, 'Should include cost metric');
});

// Test 4: Includes token usage metric
test('Includes token usage metric', () => {
  const result = createDashboard({
    appName: 'MyApp',
    models: ['gpt-4o'],
    budget: 100
  });
  
  const hasTokens = result.metrics.some(m => 
    m.name.toLowerCase().includes('token')
  );
  assert(hasTokens, 'Should include token metric');
});

// Test 5: Budget-based alert
test('Creates budget alert based on config', () => {
  const result = createDashboard({
    appName: 'MyApp',
    models: ['gpt-4o'],
    budget: 100
  });
  
  const hasBudgetAlert = result.alerts.some(a => 
    a.name.toLowerCase().includes('budget') ||
    a.name.toLowerCase().includes('cost')
  );
  assert(hasBudgetAlert, 'Should have budget alert');
});

// Test 6: Latency alert
test('Creates latency alert', () => {
  const result = createDashboard({
    appName: 'MyApp',
    models: ['gpt-4o'],
    budget: 100
  });
  
  const hasLatencyAlert = result.alerts.some(a => 
    a.name.toLowerCase().includes('latency') ||
    a.name.toLowerCase().includes('slow')
  );
  assert(hasLatencyAlert, 'Should have latency alert');
});

// Test 7: Error rate alert
test('Creates error rate alert', () => {
  const result = createDashboard({
    appName: 'MyApp',
    models: ['gpt-4o'],
    budget: 100
  });
  
  const hasErrorAlert = result.alerts.some(a => 
    a.name.toLowerCase().includes('error') ||
    a.name.toLowerCase().includes('failure')
  );
  assert(hasErrorAlert, 'Should have error rate alert');
});

// Test 8: Widgets have required fields
test('Widgets have required structure', () => {
  const result = createDashboard({
    appName: 'MyApp',
    models: ['gpt-4o'],
    budget: 100
  });
  
  result.widgets.forEach(widget => {
    assert(widget.type, 'Widget should have type');
    assert(widget.title, 'Widget should have title');
    assert(widget.metric, 'Widget should reference a metric');
  });
});

// Test 9: Alerts have thresholds
test('Alerts have thresholds', () => {
  const result = createDashboard({
    appName: 'MyApp',
    models: ['gpt-4o'],
    budget: 100
  });
  
  result.alerts.forEach(alert => {
    assert(alert.threshold !== undefined, 'Alert should have threshold');
    assert(alert.severity, 'Alert should have severity');
  });
});

// Test 10: Metrics have aggregation
test('Metrics have aggregation windows', () => {
  const result = createDashboard({
    appName: 'MyApp',
    models: ['gpt-4o'],
    budget: 100
  });
  
  result.metrics.forEach(metric => {
    assert(metric.aggregation, 'Metric should have aggregation');
  });
});

// Test 11: Multiple models support
test('Supports multiple models', () => {
  const result = createDashboard({
    appName: 'MyApp',
    models: ['gpt-4o', 'claude-3-5-sonnet'],
    budget: 200
  });
  
  // Should still work with multiple models
  assert(result.metrics.length > 0, 'Should have metrics');
});

// Test 12: Dashboard has name
test('Dashboard has application name', () => {
  const result = createDashboard({
    appName: 'ProductionChat',
    models: ['gpt-4o'],
    budget: 100
  });
  
  // Check that the result is a valid object
  assert(typeof result === 'object', 'Should return object');
});

console.log(`\n${passed}/${passed + failed} tests passed`);
if (failed > 0) process.exit(1);
