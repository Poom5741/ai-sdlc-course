/**
 * Test file for Privacy Auditor quest
 */

const { detectPII } = require('./problem.js');

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

// Test 1: Detects email addresses
test('Detects email addresses', () => {
  const result = detectPII('Contact me at john@example.com for more info');
  
  assert(result.found, 'Should detect PII');
  assert(result.detections.some(d => d.type === 'email'), 'Should detect email');
});

// Test 2: Detects US phone numbers
test('Detects US phone numbers', () => {
  const result = detectPII('Call me at 555-123-4567');
  
  assert(result.found, 'Should detect PII');
  assert(result.detections.some(d => d.type === 'phone'), 'Should detect phone');
});

// Test 3: Detects SSN
test('Detects Social Security Numbers', () => {
  const result = detectPII('My SSN is 123-45-6789');
  
  assert(result.found, 'Should detect PII');
  assert(result.detections.some(d => d.type === 'ssn'), 'Should detect SSN');
});

// Test 4: Detects credit card numbers
test('Detects credit card numbers', () => {
  const result = detectPII('Card number: 4111-1111-1111-1111');
  
  assert(result.found, 'Should detect PII');
  assert(result.detections.some(d => d.type === 'creditcard'), 'Should detect credit card');
});

// Test 5: No PII returns clean result
test('No PII returns clean result', () => {
  const result = detectPII('The weather is nice today');
  
  assert(!result.found, 'Should not detect PII');
  assert(result.detections.length === 0, 'Should have no detections');
  assert(result.riskLevel === 'none', 'Risk level should be none');
});

// Test 6: Multiple PII types detected
test('Detects multiple PII types', () => {
  const result = detectPII('Email: test@test.com, Phone: 555-123-4567, SSN: 123-45-6789');
  
  assert(result.found, 'Should detect PII');
  assert(result.detections.length >= 3, 'Should detect multiple PII types');
});

// Test 7: Risk level calculation
test('Risk level reflects PII severity', () => {
  const resultSSN = detectPII('SSN: 123-45-6789');
  const resultEmail = detectPII('Email: test@test.com');
  
  // SSN should be higher risk than email
  assert(resultSSN.riskLevel === 'high' || resultSSN.riskLevel === 'critical',
    'SSN should be high risk');
});

// Test 8: Strict mode reduces false positives
test('Strict mode reduces false positives', () => {
  const data = 'Version 1.2.3.4 released today';
  const normalResult = detectPII(data);
  const strictResult = detectPII(data, { strictMode: true });
  
  // Strict mode should have fewer false positives
  assert(strictResult.detections.length <= normalResult.detections.length,
    'Strict mode should have fewer or equal detections');
});

// Test 9: International phone formats
test('Detects international phone formats', () => {
  const result = detectPII('Call +44 20 7946 0958 or +1-555-123-4567');
  
  assert(result.found, 'Should detect international phones');
  assert(result.detections.filter(d => d.type === 'phone').length >= 1,
    'Should detect at least one phone');
});

// Test 10: Credit card with spaces
test('Detects credit cards with spaces', () => {
  const result = detectPII('Card: 4111 1111 1111 1111');
  
  assert(result.found, 'Should detect credit card');
  assert(result.detections.some(d => d.type === 'creditcard'), 'Should detect credit card');
});

// Test 11: Detections have required fields
test('Detections have proper structure', () => {
  const result = detectPII('Email: test@test.com');
  
  if (result.detections.length > 0) {
    const detection = result.detections[0];
    assert(detection.type, 'Detection should have type');
    assert(detection.value, 'Detection should have value');
    assert(detection.position !== undefined, 'Detection should have position');
  }
});

// Test 12: Handles empty input
test('Handles empty input', () => {
  const result = detectPII('');
  
  assert(!result.found, 'Should not detect PII in empty string');
  assert(result.detections.length === 0, 'Should have no detections');
});

console.log(`\n${passed}/${passed + failed} tests passed`);
if (failed > 0) process.exit(1);
