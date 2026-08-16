/**
 * Quest 15.2: Code Smell Detector — test suite
 */

const { detectSmells } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 15.2: Code Smell Detector\n');

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

// Test 1: Long function
const code1 = `function longFunc() {\n${'  console.log("x");\n'.repeat(35)}\n}`;
const r1 = detectSmells(code1);
check('detects long function', r1.some(s => s.type === 'long-function'),
  `got ${JSON.stringify(r1)}`);

// Test 2: Deep nesting
const code2 = `function f() {\n  if (a) {\n    for (b) {\n      while (c) {\n        if (d) {\n          console.log("deep");\n        }\n      }\n    }\n  }\n}`;
const r2 = detectSmells(code2);
check('detects deep nesting', r2.some(s => s.type === 'deep-nesting'),
  `got ${JSON.stringify(r2)}`);

// Test 3: God object
const code3 = `const obj = {\n${'  method' + 'X'.repeat(11) + '() { return 1; },\n'.repeat(12)}}`;
const r3 = detectSmells(code3);
check('detects god object', r3.some(s => s.type === 'god-object'),
  `got ${JSON.stringify(r3)}`);

// Test 4: Magic strings in conditionals
const code4 = `if (status === "active") {\n  doSomething();\n} else if (status === "pending") {\n  doOther();\n}`;
const r4 = detectSmells(code4);
check('detects magic strings', r4.some(s => s.type === 'magic-string'),
  `got ${JSON.stringify(r4)}`);

// Test 5: Clean code
const code5 = `function add(a, b) {\n  return a + b;\n}`;
const r5 = detectSmells(code5);
check('clean code has no smells', r5.length === 0, `got ${r5.length} smells`);

// Test 6: Empty input
const r6 = detectSmells('');
check('empty input returns empty', r6.length === 0);

// Test 7: Long function with nested helper — only outer flagged
const code7 = `function outer() {\n${'  console.log("x");\n'.repeat(32)}\n  function helper() { return 1; }\n}`;
const r7 = detectSmells(code7);
check('nested helper does not double-flag', r7.filter(s => s.type === 'long-function').length === 1,
  `got ${r7.filter(s => s.type === 'long-function').length} long-function smells`);

// Test 8: Each smell has required fields
const code8 = `function f() {\n${'  console.log("x");\n'.repeat(35)}\n}`;
const r8 = detectSmells(code8);
check('smells have type, line, message', r8.every(s => s.type && typeof s.line === 'number' && s.message),
  `got ${JSON.stringify(r8)}`);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 15.2 complete. You can name code smells to tame them.');
  process.exit(0);
}
console.log('\nHint: check if nested helpers inside a long function are NOT separately flagged.');
process.exit(1);
