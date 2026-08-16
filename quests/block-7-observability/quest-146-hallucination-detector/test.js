/**
 * Test file for Hallucination Detector quest
 */

const { detectHallucination } = require('./problem.js');

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

// Test 1: No hallucination when well-supported
test('Low risk when well-supported by sources', () => {
  const output = 'The sky is blue. Water is wet.';
  const sources = ['The sky appears blue due to Rayleigh scattering.', 'Water is a liquid that wets surfaces.'];
  
  const result = detectHallucination(output, sources);
  
  assert(result.riskScore < 0.3, 'Should have low risk score');
  assert(result.issues.length === 0, 'Should have no issues');
});

// Test 2: High risk for unsupported claims
test('High risk for unsupported claims', () => {
  const output = 'The moon is made of cheese and cats can fly.';
  const sources = ['The moon is a celestial body orbiting Earth.'];
  
  const result = detectHallucination(output, sources);
  
  assert(result.riskScore > 0.5, 'Should have high risk score');
  assert(result.issues.length > 0, 'Should detect issues');
});

// Test 3: Detects contradictions
test('Detects contradictions in output', () => {
  const output = 'The Earth is flat. The Earth is round.';
  const sources = ['Scientific evidence shows the Earth is an oblate spheroid.'];
  
  const result = detectHallucination(output, sources);
  
  assert(result.issues.length > 0, 'Should detect contradiction');
});

// Test 4: Detects made-up citations
test('Detects made-up citations', () => {
  const output = 'According to Smith et al. (2023), cats can fly.';
  const sources = ['No sources provided.'];
  
  const result = detectHallucination(output, sources);
  
  assert(result.riskScore > 0.3, 'Should flag citation as risky');
});

// Test 5: Detects overconfident language
test('Detects overconfident language', () => {
  const output = 'It is absolutely certain that unicorns exist.';
  const sources = ['There is no evidence of unicorns.'];
  
  const result = detectHallucination(output, sources);
  
  assert(result.riskScore > 0.3, 'Should flag overconfidence');
});

// Test 6: Returns valid risk score
test('Risk score is between 0 and 1', () => {
  const output = 'Any text here';
  const sources = [];
  
  const result = detectHallucination(output, sources);
  
  assert(result.riskScore >= 0 && result.riskScore <= 1, 'Risk score should be 0-1');
});

// Test 7: Returns confidence score
test('Returns confidence score', () => {
  const output = 'Some output';
  const sources = ['Some source'];
  
  const result = detectHallucination(output, sources);
  
  assert(result.confidence >= 0 && result.confidence <= 1, 'Confidence should be 0-1');
});

// Test 8: Issues have proper structure
test('Issues have required fields', () => {
  const output = 'The sky is green and unicorns fly.';
  const sources = ['The sky is blue.'];
  
  const result = detectHallucination(output, sources);
  
  if (result.issues.length > 0) {
    const issue = result.issues[0];
    assert(issue.type, 'Issue should have type');
    assert(issue.description, 'Issue should have description');
    assert(issue.severity, 'Issue should have severity');
  }
});

// Test 9: Empty sources increase risk
test('Empty sources increase risk', () => {
  const output = 'The answer is 42.';
  const resultEmpty = detectHallucination(output, []);
  const resultWithSources = detectHallucination(output, ['The answer to everything is 42.']);
  
  assert(resultEmpty.riskScore >= resultWithSources.riskScore,
    'Empty sources should have equal or higher risk');
});

// Test 10: Handles empty output
test('Handles empty output', () => {
  const result = detectHallucination('', ['source']);
  
  assert(result.riskScore === 0, 'Empty output should have zero risk');
  assert(result.issues.length === 0, 'Empty output should have no issues');
});

// Test 11: Multiple unsupported claims
test('Detects multiple unsupported claims', () => {
  const output = 'Cats can fly. Dogs can talk. Fish climb trees.';
  const sources = ['None'];
  
  const result = detectHallucination(output, sources);
  
  assert(result.issues.length >= 2, 'Should detect multiple issues');
});

// Test 12: Partial support reduces risk
test('Partial support reduces risk', () => {
  const output = 'The sky is blue and cats can fly.';
  const sources = ['The sky is blue due to scattering.'];
  
  const result = detectHallucination(output, sources);
  
  // Should have some risk but not maximum
  assert(result.riskScore > 0 && result.riskScore < 1,
    'Partial support should result in moderate risk');
});

console.log(`\n${passed}/${passed + failed} tests passed`);
if (failed > 0) process.exit(1);
