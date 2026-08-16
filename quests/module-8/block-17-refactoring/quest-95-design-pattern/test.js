/**
 * Quest 17.3: Design Pattern Applicator — test suite
 */

const { suggestPattern } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 17.3: Design Pattern Applicator\n');

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

// Test 1: Strategy pattern — multiple if/else on same variable
const code1 = 'if (type === "fast") { speed = 100; } else if (type === "slow") { speed = 10; } else if (type === "medium") { speed = 50; }';
const r1 = suggestPattern(code1);
check('detects strategy pattern', r1.pattern === 'strategy',
  `got ${r1.pattern}`);

// Test 2: Observer pattern
const code2 = 'function on(event, callback) { listeners[event] = callback; }\nfunction emit(event, data) { listeners[event](data); }';
const r2 = suggestPattern(code2);
check('detects observer pattern', r2.pattern === 'observer',
  `got ${r2.pattern}`);

// Test 3: Factory pattern
const code3 = 'function create(type) {\n  if (type === "cat") return new Cat();\n  if (type === "dog") return new Dog();\n  if (type === "bird") return new Bird();\n}';
const r3 = suggestPattern(code3);
check('detects factory pattern', r3.pattern === 'factory',
  `got ${r3.pattern}`);

// Test 4: EDGE CASE — plain global variable NOT flagged as singleton
const code4 = 'const config = { debug: true, port: 3000 };';
const r4 = suggestPattern(code4);
check('plain global NOT singleton', r4.pattern !== 'singleton',
  `got ${r4.pattern} — plain globals are not singletons`);

// Test 5: Clean code — no pattern
const code5 = 'function add(a, b) { return a + b; }';
const r5 = suggestPattern(code5);
check('simple code suggests none', r5.pattern === 'none' || r5.confidence < 50,
  `got ${r5.pattern} with confidence ${r5.confidence}`);

// Test 6: Output has required fields
check('output has pattern, reason, confidence',
  typeof r1.pattern === 'string' && typeof r1.reason === 'string' && typeof r1.confidence === 'number');

// Test 7: Confidence between 0 and 100
check('confidence is 0-100', r1.confidence >= 0 && r1.confidence <= 100,
  `got ${r1.confidence}`);

// Test 8: Empty input
const r8 = suggestPattern('');
check('empty input returns none', r8.pattern === 'none');

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 17.3 complete. You recognize design patterns and when to apply them.');
  process.exit(0);
}
console.log('\nHint: plain global variables are NOT singletons — only lazy-initialized getInstance patterns.');
process.exit(1);
