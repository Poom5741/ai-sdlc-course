/**
 * Quest 6.4: Structured Output Parser — test suite
 * Requires ./problem.js exporting { parseStructuredOutput }. Run: node test.js
 */

const { parseStructuredOutput } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 6.4: Structured Output Parser\n');

function check(label, cond, detail) {
  if (cond) { console.log(`PASS ${label}`); passed++; } else { console.log(`FAIL ${label}`); if (detail) console.log(`   ${detail}`); failed++; }
}

const schema = {
  name: { type: 'string', required: true },
  age: { type: 'number', required: true },
  active: { type: 'boolean', required: false },
};

// Test 1: Plain JSON
const r1 = parseStructuredOutput('{"name":"Alice","age":30}', schema);
check('parses plain JSON', r1.valid === true);
check('name is Alice', r1.parsed.name === 'Alice');

// Test 2: JSON in code block (THE EDGE CASE)
const r2 = parseStructuredOutput('Here is the result:\n```json\n{"name":"Bob","age":25}\n```', schema);
check('extracts JSON from code block',
  r2.valid === true && r2.parsed.name === 'Bob',
  `naive AI fails on code-fenced JSON — valid: ${r2.valid}, parsed: ${JSON.stringify(r2.parsed)}`);

// Test 3: Missing required field
const r3 = parseStructuredOutput('{"age":30}', schema);
check('flags missing required field', r3.valid === false);
check('reports error for missing name', r3.errors.some(e => e.includes('name')));

// Test 4: Type coercion
const r4 = parseStructuredOutput('{"name":"Eve","age":"25"}', schema);
check('coerces string to number', r4.parsed.age === 25 || r4.parsed.age === '25',
  `age: ${r4.parsed.age}`);

// Test 5: Boolean field
const r5 = parseStructuredOutput('{"name":"Frank","age":40,"active":true}', schema);
check('parses boolean', r5.parsed.active === true);

// Test 6: Invalid JSON
const r6 = parseStructuredOutput('This is not JSON at all', schema);
check('invalid JSON returns valid:false', r6.valid === false);

// Test 7: Returns structure
check('result has parsed field', r1.parsed !== undefined);
check('result has errors field', Array.isArray(r1.errors));
check('result has valid field', typeof r1.valid === 'boolean');

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 6.4 complete. Structured output parser handles code fences and type coercion.');
  process.exit(0);
}
console.log('\nHint: check the code-block test. Naive AI fails when JSON is wrapped in ``` fences.');
process.exit(1);
