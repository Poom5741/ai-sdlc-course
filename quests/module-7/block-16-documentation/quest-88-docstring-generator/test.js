/**
 * Quest 16.1: Docstring Generator — test suite
 */

const { generateDocstring } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 16.1: Docstring Generator\n');

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

// Test 1: Regular function with params
const code1 = 'function add(a, b) { return a + b; }';
const r1 = generateDocstring(code1);
check('generates docstring for function with params', r1.includes('@param'), `got: ${r1.substring(0, 200)}`);
check('includes @returns tag', r1.includes('@returns') || r1.includes('@return'), `got: ${r1.substring(0, 200)}`);

// Test 2: Arrow function
const code2 = 'const multiply = (x, y) => x * y;';
const r2 = generateDocstring(code2);
check('handles arrow functions', r2.includes('/**'), `got: ${r2.substring(0, 200)}`);

// Test 3: Async function
const code3 = 'async function fetchData(url) { return await fetch(url); }';
const r3 = generateDocstring(code3);
check('handles async functions', r3.includes('async') && r3.includes('/**'), `got: ${r3.substring(0, 200)}`);

// Test 4: EDGE CASE — no params means no @param tags
const code4 = 'function greet() { return "hello"; }';
const r4 = generateDocstring(code4);
check('no @param for empty params', !r4.includes('@param'), `got: ${r4.substring(0, 200)}`);

// Test 5: Multiple functions
const code5 = 'function a(x) { return x; }\nfunction b(y, z) { return y + z; }';
const r5 = generateDocstring(code5);
const paramCount = (r5.match(/@param/g) || []).length;
check('generates docstrings for multiple functions', paramCount >= 3, `got ${paramCount} @param tags`);

// Test 6: Preserves function body
const code6 = 'function square(n) { return n * n; }';
const r6 = generateDocstring(code6);
check('preserves function body', r6.includes('return n * n'), `got: ${r6}`);

// Test 7: Empty input
const r7 = generateDocstring('');
check('empty input returns empty', r7 === '');

// Test 8: Docstring is above function, not after
const code8 = 'function test() { return 1; }';
const r8 = generateDocstring(code8);
const docPos = r8.indexOf('/**');
const funcPos = r8.indexOf('function test');
check('docstring appears before function', docPos < funcPos, `doc at ${docPos}, func at ${funcPos}`);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 16.1 complete. You generate docstrings that document the contract.');
  process.exit(0);
}
console.log('\nHint: check if empty parameter lists produce NO @param tags.');
process.exit(1);
