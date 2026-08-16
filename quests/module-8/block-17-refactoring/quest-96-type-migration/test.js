/**
 * Quest 17.4: Type Migration Assistant — test suite
 */

const { addTypeAnnotations } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 17.4: Type Migration Assistant\n');

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

// Test 1: Simple function gets types
const code1 = 'function add(a, b) { return a + b; }';
const r1 = addTypeAnnotations(code1);
check('adds type annotations', r1.includes(': number') || r1.includes(': string'),
  `got: ${r1}`);

// Test 2: var → let/const
const code2 = 'var x = 1;';
const r2 = addTypeAnnotations(code2);
check('converts var to let/const', r2.includes('let') || r2.includes('const'),
  `got: ${r2}`);

// Test 3: String parameters typed
const code3 = 'function greet(name) { return "Hello " + name; }';
const r3 = addTypeAnnotations(code3);
check('detects string parameter', r3.includes(': string'),
  `got: ${r3}`);

// Test 4: Return type present
const code4 = 'function getCount() { return 42; }';
const r4 = addTypeAnnotations(code4);
check('adds return type', r4.includes(': number') || r4.includes(': string') || r4.includes(': boolean'),
  `got: ${r4}`);

// Test 5: EDGE CASE — not everything typed as `any`
const code5 = 'function double(n) { return n * 2; }';
const r5 = addTypeAnnotations(code5);
check('uses specific type, not any for number', r5.includes(': number') && !r5.includes(': any'),
  `got: ${r5} — should use number, not any`);

// Test 6: Empty input
const r6 = addTypeAnnotations('');
check('empty input returns empty', r6 === '');

// Test 7: Preserves function body
const code7 = 'function square(n) { return n * n; }';
const r7 = addTypeAnnotations(code7);
check('preserves function body', r7.includes('return n * n'), `got: ${r7}`);

// Test 8: Multiple params
const code8 = 'function merge(a, b) { return a.concat(b); }';
const r8 = addTypeAnnotations(code8);
check('types multiple params', (r8.match(/: string|: number/g) || []).length >= 2,
  `got: ${r8}`);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 17.4 complete. You migrate JS to TS incrementally.');
  process.exit(0);
}
console.log('\nHint: check if you use specific types (number, string) instead of `any`.');
process.exit(1);
