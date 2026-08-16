/**
 * Test file for Ethical Review quest
 */

const { auditCode } = require('./problem.js');

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

// Test 1: Detects hardcoded gender assumptions
test('Detects gender bias in code', () => {
  const code = `
    function getSalary(employee) {
      if (employee.gender === 'male') return 75000;
      if (employee.gender === 'female') return 65000;
      return 60000;
    }
  `;
  
  const result = auditCode(code, { domain: 'hiring', hasUserData: true });
  
  assert(result.issues.length > 0, 'Should detect gender bias');
  assert(result.score < 100, 'Score should be reduced');
});

// Test 2: Detects hardcoded race assumptions
test('Detects racial bias in code', () => {
  const code = `
    function getInterestRate(creditScore, race) {
      if (race === 'white') return 0.05;
      return 0.08;
    }
  `;
  
  const result = auditCode(code, { domain: 'finance', hasUserData: true });
  
  assert(result.issues.length > 0, 'Should detect racial bias');
});

// Test 3: Detects hardcoded PII
test('Detects hardcoded PII', () => {
  const code = `
    const defaultEmail = "admin@company.com";
    const defaultSSN = "123-45-6789";
    const defaultPhone = "555-0123";
  `;
  
  const result = auditCode(code, { domain: 'general', hasUserData: true });
  
  assert(result.issues.length > 0, 'Should detect hardcoded PII');
});

// Test 4: Detects missing consent mechanism
test('Detects missing consent for user data', () => {
  const code = `
    function collectUserData() {
      return {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value
      };
    }
  `;
  
  const result = auditCode(code, { domain: 'general', hasUserData: true });
  
  assert(result.issues.length > 0, 'Should detect missing consent');
});

// Test 5: Detects age discrimination
test('Detects age discrimination', () => {
  const code = `
    function isEligible(age) {
      return age >= 25 && age <= 45;
    }
  `;
  
  const result = auditCode(code, { domain: 'hiring', hasUserData: true });
  
  assert(result.issues.length > 0, 'Should detect age discrimination');
});

// Test 6: Clean code passes
test('Clean code has no issues', () => {
  const code = `
    function calculateDiscount(price, discountPercent) {
      if (typeof price !== 'number' || price < 0) {
        throw new Error('Invalid price');
      }
      if (typeof discountPercent !== 'number' || discountPercent < 0 || discountPercent > 100) {
        throw new Error('Invalid discount');
      }
      return price * (1 - discountPercent / 100);
    }
  `;
  
  const result = auditCode(code, { domain: 'ecommerce', hasUserData: false });
  
  assert(result.issues.length === 0, 'Should have no issues');
  assert(result.score === 100, 'Score should be 100');
});

// Test 7: Returns recommendations
test('Returns actionable recommendations', () => {
  const code = `
    function getLoanAmount(income, creditScore) {
      return income * 0.5;
    }
  `;
  
  const result = auditCode(code, { domain: 'finance', hasUserData: true });
  
  assert(result.recommendations.length > 0, 'Should provide recommendations');
});

// Test 8: Score is 0-100
test('Score is within valid range', () => {
  const code = `function add(a, b) { return a + b; }`;
  
  const result = auditCode(code, { domain: 'general', hasUserData: false });
  
  assert(result.score >= 0 && result.score <= 100, 'Score should be 0-100');
});

// Test 9: Issues have required fields
test('Issues have proper structure', () => {
  const code = `
    function getRate(gender) {
      return gender === 'male' ? 0.05 : 0.08;
    }
  `;
  
  const result = auditCode(code, { domain: 'finance', hasUserData: true });
  
  if (result.issues.length > 0) {
    const issue = result.issues[0];
    assert(issue.type, 'Issue should have type');
    assert(issue.description, 'Issue should have description');
    assert(issue.severity, 'Issue should have severity');
  }
});

// Test 10: Domain-specific checks
test('Performs domain-specific checks', () => {
  const code = `
    function diagnose(symptoms) {
      if (symptoms.includes('headache')) return 'treat with aspirin';
    }
  `;
  
  const result = auditCode(code, { domain: 'healthcare', hasUserData: true });
  
  assert(result.issues.length > 0 || result.recommendations.length > 0,
    'Should flag healthcare domain concerns');
});

console.log(`\n${passed}/${passed + failed} tests passed`);
if (failed > 0) process.exit(1);
