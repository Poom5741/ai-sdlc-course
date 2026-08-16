/**
 * Quest 15.4: Performance Review Analyzer — test suite
 */

const { analyzePerformance } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 15.4: Performance Review Analyzer\n');

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

// Test 1: N+1 query pattern
const code1 = 'for (const user of users) {\n  const posts = db.query(`SELECT * FROM posts WHERE user_id = ${user.id}`);\n}';
const r1 = analyzePerformance(code1);
check('detects n-plus-one', r1.some(f => f.type === 'n-plus-one'),
  `got ${JSON.stringify(r1)}`);

// Test 2: Sync blocking in async
const code2 = 'async function load() {\n  const data = fs.readFileSync("file.json");\n  return JSON.parse(data);\n}';
const r2 = analyzePerformance(code2);
check('detects sync blocking', r2.some(f => f.type === 'sync-blocking'),
  `got ${JSON.stringify(r2)}`);

// Test 3: Memory leak — addEventListener without remove
const code3 = 'function init() {\n  element.addEventListener("click", handler);\n}';
const r3 = analyzePerformance(code3);
check('detects memory leak', r3.some(f => f.type === 'memory-leak'),
  `got ${JSON.stringify(r3)}`);

// Test 4: Large payload — JSON.parse(JSON.stringify())
const code4 = 'const clone = JSON.parse(JSON.stringify(bigObject));';
const r4 = analyzePerformance(code4);
check('detects large payload pattern', r4.some(f => f.type === 'large-payload'),
  `got ${JSON.stringify(r4)}`);

// Test 5: EDGE CASE — readFileSync at module level is OK
const code5 = 'const config = JSON.parse(fs.readFileSync("config.json"));\nmodule.exports = config;';
const r5 = analyzePerformance(code5);
check('module-level readFileSync NOT flagged',
  r5.filter(f => f.type === 'sync-blocking').length === 0,
  `got ${r5.filter(f => f.type === 'sync-blocking').length} false positives`);

// Test 6: Clean code
const code6 = 'async function getData() {\n  const res = await fetch("/api");\n  return res.json();\n}';
const r6 = analyzePerformance(code6);
check('clean async code has no issues', r6.length === 0, `got ${r6.length}`);

// Test 7: Empty input
const r7 = analyzePerformance('');
check('empty input returns empty', r7.length === 0);

// Test 8: Each finding has required fields
const code8 = 'const x = JSON.parse(JSON.stringify(y));';
const r8 = analyzePerformance(code8);
check('findings have type, line, severity, suggestion', r8.every(f => f.type && typeof f.line === 'number' && f.severity && f.suggestion));

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 15.4 complete. You catch performance anti-patterns before they ship.');
  process.exit(0);
}
console.log('\nHint: check if module-level readFileSync is NOT flagged as sync-blocking.');
process.exit(1);
