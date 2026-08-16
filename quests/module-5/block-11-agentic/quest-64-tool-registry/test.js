/**
 * Quest 5.2: Tool Registry System — test suite
 * Requires ./problem.js exporting { createToolRegistry }. Run: node test.js
 */

const { createToolRegistry } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 5.2: Tool Registry System\n');

function check(label, cond, detail) {
  if (cond) { console.log(`PASS ${label}`); passed++; } else { console.log(`FAIL ${label}`); if (detail) console.log(`   ${detail}`); failed++; }
}

const registry = createToolRegistry();

// Test 1: Register tool
const registered = registry.register({
  name: 'add',
  description: 'Add two numbers',
  parameters: { a: 'number', b: 'number' },
  execute: (args) => args.a + args.b,
});
check('register returns true', registered === true);

// Test 2: Execute tool
const result = registry.execute('add', { a: 5, b: 3 });
check('execute returns correct result', result === 8);

// Test 3: List tools
const tools = registry.listTools();
check('listTools returns registered tools', tools.length >= 1);
check('tool has name', tools[0].name === 'add');

// Test 4: Find tools by query
const found = registry.findTools('add');
check('findTools finds matching tools', found.length >= 1);

// Test 5: Argument validation (THE EDGE CASE)
const badResult = registry.execute('add', { a: 'not-a-number', b: 3 });
check('validates argument types', badResult === null || badResult.error,
  `naive AI executes without validation — got ${badResult}`);

// Test 6: Unknown tool
const unknown = registry.execute('nonexistent', {});
check('unknown tool returns null/error', unknown === null || unknown.error);

// Test 7: Multiple tools
registry.register({
  name: 'multiply',
  description: 'Multiply two numbers',
  parameters: { a: 'number', b: 'number' },
  execute: (args) => args.a * args.b,
});
check('multiple tools registered', registry.listTools().length >= 2);

// Test 8: Duplicate registration rejected
const dup = registry.register({ name: 'add', description: 'dup', parameters: {}, execute: () => 0 });
check('duplicate registration rejected', dup === false);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 5.2 complete. Tools are pluggable — with argument validation.');
  process.exit(0);
}
console.log('\nHint: check the argument validation test. Naive AI executes tools without checking types.');
process.exit(1);
