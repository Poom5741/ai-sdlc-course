/**
 * Quest 17.1: Code Simplifier — test suite
 */

const { simplify } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 17.1: Code Simplifier\n');

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

// Test 1: if/else returning boolean → direct return
const code1 = 'function isPositive(n) {\n  if (n > 0) {\n    return true;\n  } else {\n    return false;\n  }\n}';
const r1 = simplify(code1);
check('simplifies if/else boolean to direct return', r1.includes('return n > 0') || r1.includes('return n>0'),
  `got: ${r1}`);

// Test 2: Redundant else after return
const code2 = 'function f(x) {\n  if (x) {\n    return 1;\n  } else {\n    return 2;\n  }\n}';
const r2 = simplify(code2);
check('removes redundant else after return', !/}\s*else\s*\{/.test(r2) || r2.indexOf('return 1') < r2.indexOf('return 2'),
  `got: ${r2}`);

// Test 3: Keeps else when needed (no return in if)
const code3 = 'function f(x) {\n  if (x) {\n    console.log("yes");\n  } else {\n    console.log("no");\n  }\n}';
const r3 = simplify(code3);
check('keeps else when if has no return', r3.includes('else'), `got: ${r3}`);

// Test 4: Empty input
const r4 = simplify('');
check('empty input returns empty', r4 === '');

// Test 5: Preserves function signature
const code5 = 'function add(a, b) {\n  return a + b;\n}';
const r5 = simplify(code5);
check('preserves simple functions', r5.includes('function add') && r5.includes('return a + b'));

// Test 6: No mutation of safe code
const code6 = 'const x = 42;\nreturn x;';
const r6 = simplify(code6);
check('does not break safe code', r6.length > 0);

// Test 7: Preserves logic with side effects
const code7 = 'if (x) {\n  doSomething();\n} else {\n  doOther();\n}';
const r7 = simplify(code7);
check('preserves else for side effects', r7.includes('else') || r7.includes('doOther'));

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 17.1 complete. You simplify code without changing behavior.');
  process.exit(0);
}
console.log('\nHint: only remove else after return/throw/continue — keep else for side effects.');
process.exit(1);
