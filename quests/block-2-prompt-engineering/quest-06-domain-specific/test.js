/**
 * Quest 2.3: Domain-Specific Prompting - Test Suite
 */

const {
  EcommerceValidator,
  HealthcareValidator,
  FinanceValidator,
} = require('./index.js');

let passed = 0;
let failed = 0;

console.log("Quest 2.3: Domain-Specific Prompting\n");
console.log("Running tests...\n");

function test(description, fn) {
  try {
    fn();
    console.log(`✅ ${description}`);
    passed++;
  } catch (error) {
    console.log(`❌ ${description}`);
    console.log(`   ${error.message}`);
    failed++;
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(message || `Expected ${expected}, got ${actual}`);
  }
}

// E-commerce tests
const ecommerce = new EcommerceValidator();

test('EcommerceValidator validates product', () => {
  const result = ecommerce.validateProduct({
    name: 'Test Product',
    price: 29.99,
    sku: 'PROD-001',
  });
  assert(result.valid === true || result.errors.length === 0);
});

test('EcommerceValidator rejects invalid price', () => {
  const result = ecommerce.validateProduct({
    name: 'Test Product',
    price: -10,
    sku: 'PROD-001',
  });
  assert(result.valid === false || result.errors.length > 0);
});

test('EcommerceValidator calculates total', () => {
  const items = [
    { price: 10, quantity: 2 },
    { price: 20, quantity: 1 },
  ];
  const total = ecommerce.calculateTotal(items, 0.1);
  assertEqual(total, 44); // (10*2 + 20*1) * 1.1
});

// Healthcare tests
const healthcare = new HealthcareValidator();

test('HealthcareValidator validates patient', () => {
  const result = healthcare.validatePatient({
    name: 'John Doe',
    dob: '1990-01-01',
    insuranceId: 'INS-12345',
  });
  assert(result.valid === true || result.errors.length === 0);
});

test('HealthcareValidator rejects invalid DOB', () => {
  const result = healthcare.validatePatient({
    name: 'John Doe',
    dob: 'invalid-date',
    insuranceId: 'INS-12345',
  });
  assert(result.valid === false || result.errors.length > 0);
});

// Finance tests
const finance = new FinanceValidator();

test('FinanceValidator validates transaction', () => {
  const result = finance.validateTransaction({
    amount: 100.00,
    type: 'debit',
    account: 'ACC-001',
  });
  assert(result.valid === true || result.errors.length === 0);
});

test('FinanceValidator rejects negative amount', () => {
  const result = finance.validateTransaction({
    amount: -50,
    type: 'debit',
    account: 'ACC-001',
  });
  assert(result.valid === false || result.errors.length > 0);
});

test('FinanceValidator calculates interest', () => {
  const interest = finance.calculateInterest(1000, 0.05, 1);
  assertEqual(interest, 50);
});

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log("\n🎉 Quest 2.3 Complete! You've mastered domain-specific prompting.");
  process.exit(0);
} else {
  console.log("\n💡 Hint: Domain-specific prompts need to include industry rules, validation requirements, and compliance standards.");
  process.exit(1);
}
