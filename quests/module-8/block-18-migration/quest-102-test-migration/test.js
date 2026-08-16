/**
 * Quest 18.5: Test Migration — test suite
 */

const { migrateTests } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 18.5: Test Migration\n');

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

// Test 1: Rename function in tests
const tests1 = 'const { getData } = require("./problem.js");\ntest("getData works", () => { expect(getData()).toBe(1); });';
const changes1 = [{ type: 'rename', oldName: 'getData', newName: 'fetchData' }];
const r1 = migrateTests(tests1, changes1);
check('renames function in tests', r1.includes('fetchData') && !r1.includes('getData'),
  `got: ${r1}`);

// Test 2: Update import path
const tests2 = 'const { helper } = require("./old-module.js");';
const changes2 = [{ type: 'move', oldName: 'helper', newPath: './new-module.js' }];
const r2 = migrateTests(tests2, changes2);
check('updates import path', r2.includes('new-module.js'), `got: ${r2}`);

// Test 3: Remove test for removed code
const tests3 = 'test("removedFunc", () => { expect(removedFunc()).toBe(1); });\ntest("keepFunc", () => { expect(keepFunc()).toBe(2); });';
const changes3 = [{ type: 'remove', oldName: 'removedFunc' }];
const r3 = migrateTests(tests3, changes3);
check('removes test for deleted code', !r3.includes('removedFunc'), `got: ${r3}`);
check('keeps other tests', r3.includes('keepFunc'), `got: ${r3}`);

// Test 4: EDGE CASE — word boundary aware replacement
const tests4 = 'const { get } = require("./problem.js");\ntest("getter works", () => { expect(getter()).toBe(1); });';
const changes4 = [{ type: 'rename', oldName: 'get', newName: 'fetch' }];
const r4 = migrateTests(tests4, changes4);
check('does NOT corrupt "getter" when renaming "get"',
  r4.includes('getter') && !r4.includes('fetchter'),
  `got: ${r4} — naive replace corrupts "getter" → "fetchter"`);

// Test 5: Empty tests
const r5 = migrateTests('', []);
check('empty input returns empty', r5 === '');

// Test 6: No changes
const r6 = migrateTests(tests1, []);
check('no changes returns original', r6 === tests1);

// Test 7: Multiple renames
const tests7 = 'const { a, b } = require("./p.js");';
const changes7 = [{ type: 'rename', oldName: 'a', newName: 'x' }, { type: 'rename', oldName: 'b', newName: 'y' }];
const r7 = migrateTests(tests7, changes7);
check('handles multiple renames', r7.includes('x') && r7.includes('y') && !r7.includes('const { a'));

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 18.5 complete. You migrate tests without breaking word boundaries.');
  process.exit(0);
}
console.log('\nHint: check if renaming "get" corrupts "getter" — use word boundary-aware replacement.');
process.exit(1);
