/**
 * Test file for Cost Optimizer quest
 */

const { selectModel, MODELS } = require('./problem.js');

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

// Test 1: Simple task should use cheap model
test('Simple task uses cheap model', () => {
  const result = selectModel({
    description: 'Format a date string',
    needsAccuracy: false,
    needsSpeed: true,
    domain: 'writing'
  });
  
  assert(result.model.includes('mini') || result.model.includes('haiku'),
    'Should select cheap model for simple task');
  assert(typeof result.estimatedCost === 'number', 'Should have cost');
  assert(result.reasoning.length > 0, 'Should have reasoning');
});

// Test 2: Complex task should use capable model
test('Complex task uses capable model', () => {
  const result = selectModel({
    description: 'Implement a complex algorithm with edge cases',
    needsAccuracy: true,
    needsSpeed: false,
    domain: 'code'
  });
  
  assert(result.model.includes('4o') || result.model.includes('sonnet'),
    'Should select capable model for complex task');
});

// Test 3: Speed requirement favors cheaper models
test('Speed requirement favors cheaper models', () => {
  const result = selectModel({
    description: 'Quick code review',
    needsAccuracy: false,
    needsSpeed: true,
    domain: 'code'
  });
  
  assert(result.model.includes('mini') || result.model.includes('haiku'),
    'Should prefer fast/cheap model when speed matters');
});

// Test 4: Accuracy requirement favors capable models
test('Accuracy requirement favors capable models', () => {
  const result = selectModel({
    description: 'Security audit of authentication system',
    needsAccuracy: true,
    needsSpeed: false,
    domain: 'code'
  });
  
  assert(result.model.includes('4o') || result.model.includes('sonnet'),
    'Should prefer capable model when accuracy matters');
});

// Test 5: Cost is reasonable
test('Estimated cost is reasonable', () => {
  const result = selectModel({
    description: 'Write a blog post',
    needsAccuracy: false,
    needsSpeed: false,
    domain: 'writing'
  });
  
  assert(result.estimatedCost >= 0, 'Cost should be non-negative');
  assert(result.estimatedCost < 100, 'Cost should be reasonable');
});

// Test 6: Returns valid model name
test('Returns valid model name', () => {
  const result = selectModel({
    description: 'Any task',
    needsAccuracy: false,
    needsSpeed: false,
    domain: 'general'
  });
  
  assert(MODELS[result.model] !== undefined, 'Model should exist in MODELS');
});

// Test 7: Reasoning explains choice
test('Reasoning explains the choice', () => {
  const result = selectModel({
    description: 'Critical financial calculation',
    needsAccuracy: true,
    needsSpeed: false,
    domain: 'analysis'
  });
  
  assert(result.reasoning.length > 20, 'Reasoning should be detailed');
});

// Test 8: Code domain consideration
test('Considers code domain', () => {
  const result = selectModel({
    description: 'Implement OAuth2 flow',
    needsAccuracy: true,
    needsSpeed: false,
    domain: 'code'
  });
  
  assert(result.model.includes('4o') || result.model.includes('sonnet'),
    'Should use capable model for complex code tasks');
});

console.log(`\n${passed}/${passed + failed} tests passed`);
if (failed > 0) process.exit(1);
