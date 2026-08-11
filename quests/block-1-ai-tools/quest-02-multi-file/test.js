/**
 * Quest 1.2: Multi-file Generation — test suite
 *
 * Tool skill: generate multiple related files.
 * Engineering habit: DECOMPOSE BEFORE GENERATING — specify the interface
 * first, then ask the AI to fill it. Do not just ask for "some utils."
 *
 * Requires ./problem.js (the learner's work), never ./index.js or
 * ./_solution/solution.js. Run: node test.js
 */

const lib = require('./problem.js');

const SPECIFIED_INTERFACE = {
  add: 'function',
  subtract: 'function',
  multiply: 'function',
  divide: 'function',
  calculate: 'function',
};

let passed = 0;
let failed = 0;

console.log('Quest 1.2: Multi-file Generation\n');

// Part 1 — the public API MUST match the specified interface.
Object.keys(SPECIFIED_INTERFACE).forEach((name) => {
  const type = typeof lib[name];
  if (type === SPECIFIED_INTERFACE[name]) {
    console.log(`PASS interface: ${name} is a ${type}`);
    passed++;
  } else {
    console.log(`FAIL interface: ${name} must be a ${SPECIFIED_INTERFACE[name]} (got ${type})`);
    failed++;
  }
});

// Part 2 — behavior cases including a divide-by-zero edge case.
const cases = [
  { op: 'add', args: [2, 3], expected: 5, description: 'add(2,3)=5' },
  { op: 'subtract', args: [10, 4], expected: 6, description: 'subtract(10,4)=6' },
  { op: 'multiply', args: [6, 7], expected: 42, description: 'multiply(6,7)=42' },
  { op: 'divide', args: [15, 3], expected: 5, description: 'divide(15,3)=5' },
];

cases.forEach((test, index) => {
  const result = lib[test.op](...test.args);
  if (result === test.expected) {
    console.log(`PASS Test ${index + 1}: ${test.description}`);
    passed++;
  } else {
    console.log(`FAIL Test ${index + 1}: ${test.description}`);
    console.log(`   Expected: ${test.expected}`);
    console.log(`   Got: ${result}`);
    failed++;
  }
});

// Edge case: divide by zero. Naive AI returns NaN or throws; the specified
// interface returns Infinity. This teaches "specify the boundary, then verify."
const dz = lib.divide(10, 0);
if (dz === Infinity) {
  console.log('PASS Test 5: divide(10,0)=Infinity');
  passed++;
} else {
  console.log(`FAIL Test 5: divide(10,0)=Infinity`);
  console.log(`   Got: ${dz}`);
  failed++;
}

// calculate dispatches and rejects unknown operations (throws).
try {
  lib.calculate('noop', 1, 2);
  console.log('FAIL Test 6: calculate must throw on unknown operation');
  failed++;
} catch {
  console.log('PASS Test 6: calculate throws on unknown operation');
  passed++;
}

if (lib.calculate('add', 5, 5) === 10) {
  console.log('PASS Test 7: calculate(add,5,5)=10');
  passed++;
} else {
  console.log('FAIL Test 7: calculate(add,5,5)=10');
  failed++;
}

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 1.2 complete. You specified the interface before generating.');
  process.exit(0);
}
console.log('\nHint: specify the public API first (add/subtract/multiply/divide/calculate), then generate.');
process.exit(1);