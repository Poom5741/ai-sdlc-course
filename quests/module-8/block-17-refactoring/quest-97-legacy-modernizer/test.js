/**
 * Quest 17.5: Legacy Code Modernizer — test suite
 */

const { modernize } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 17.5: Legacy Code Modernizer\n');

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

// Test 1: .then() chain → await
const code1 = 'fetch(url).then(r => r.json()).then(data => console.log(data));';
const r1 = modernize(code1);
check('converts .then() to await', r1.includes('await'),
  `got: ${r1}`);

// Test 2: Adds async keyword
const code2 = 'function load() { return fetch(url).then(r => r.json()); }';
const r2 = modernize(code2);
check('adds async keyword', r2.includes('async'),
  `got: ${r2}`);

// Test 3: Callback error handling → try/catch
const code3 = 'function load(cb) { fs.readFile("f", (err, data) => { if (err) throw err; cb(data); }); }';
const r3 = modernize(code3);
check('converts callback to try/catch', r3.includes('try') || r3.includes('await'),
  `got: ${r3}`);

// Test 4: EDGE CASE — synchronous code NOT wrapped in try/catch
const code4 = 'function add(a, b) { return a + b; }';
const r4 = modernize(code4);
check('does NOT wrap sync code in try/catch', !r4.includes('try') || !r4.includes('catch'),
  `got: ${r4} — sync code should not be wrapped`);

// Test 5: Empty input
const r5 = modernize('');
check('empty input returns empty', r5 === '');

// Test 6: Preserves non-async code
const code6 = 'const x = 42;\nconst y = x * 2;';
const r6 = modernize(code6);
check('preserves non-async code', r6.includes('const x = 42'), `got: ${r6}`);

// Test 7: Multiple .then() chains
const code7 = 'promise.then(a).then(b).then(c);';
const r7 = modernize(code7);
check('handles multiple .then() chains', r7.includes('await'), `got: ${r7}`);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 17.5 complete. You modernize legacy callbacks to async/await.');
  process.exit(0);
}
console.log('\nHint: only wrap async operations in try/catch — synchronous code should stay as-is.');
process.exit(1);
