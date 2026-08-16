/**
 * Quest 17.2: Dead Code Eliminator — test suite
 */

const { findDeadCode } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 17.2: Dead Code Eliminator\n');

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

// Test 1: Unused function
const code1 = 'function unused() { return 1; }\nfunction used() { return used2(); }\nfunction used2() { return 2; }';
const r1 = findDeadCode(code1);
check('detects unused function', r1.some(d => d.name === 'unused' && d.type === 'function'),
  `got ${JSON.stringify(r1)}`);

// Test 2: Used function NOT flagged
check('does NOT flag used function', !r1.some(d => d.name === 'used' || d.name === 'used2'),
  `got ${JSON.stringify(r1)}`);

// Test 3: Unused variable
const code2 = 'const unusedVar = 42;\nconst usedVar = 10;\nconsole.log(usedVar);';
const r2 = findDeadCode(code2);
check('detects unused variable', r2.some(d => d.name === 'unusedVar' && d.type === 'variable'),
  `got ${JSON.stringify(r2)}`);

// Test 4: EDGE CASE — exported function NOT flagged
const code3 = 'function helper() { return 1; }\nmodule.exports = { helper };';
const r3 = findDeadCode(code3);
check('does NOT flag exported function', !r3.some(d => d.name === 'helper'),
  `got ${JSON.stringify(r3)} — exported functions are NOT dead code`);

// Test 5: Unused import
const code4 = 'const fs = require("fs");\nconst path = require("path");\nconsole.log(path.join("a","b"));';
const r4 = findDeadCode(code4);
check('detects unused import', r4.some(d => d.name === 'fs' && d.type === 'import'),
  `got ${JSON.stringify(r4)}`);

// Test 6: Used import NOT flagged
check('does NOT flag used import', !r4.some(d => d.name === 'path'),
  `got ${JSON.stringify(r4)}`);

// Test 7: Clean code
const code5 = 'function a() { return b(); }\nfunction b() { return 1; }\nmodule.exports = { a };';
const r5 = findDeadCode(code5);
check('clean code has no dead code', r5.length === 0, `got ${r5.length}`);

// Test 8: Empty input
const r6 = findDeadCode('');
check('empty input returns empty', r6.length === 0);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 17.2 complete. You eliminate dead code with confidence.');
  process.exit(0);
}
console.log('\nHint: exported functions are NOT dead code — check if you flag exports.');
process.exit(1);
