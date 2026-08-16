/**
 * Quest 6.7: Meta-Prompt Generator — test suite
 * Requires ./problem.js exporting { createMetaPrompt }. Run: node test.js
 */

const { createMetaPrompt } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 6.7: Meta-Prompt Generator\n');

function check(label, cond, detail) {
  if (cond) { console.log(`PASS ${label}`); passed++; } else { console.log(`FAIL ${label}`); if (detail) console.log(`   ${detail}`); failed++; }
}

const template = {
  role: 'code-reviewer',
  constraints: ['Be specific', 'No style-only feedback'],
  outputFormat: 'bullet points with severity',
  examples: [{ input: 'code snippet', output: 'review comment' }],
};

const meta = createMetaPrompt(template);

// Test 1: Generate prompt
const prompt = meta.generate('Review this auth function', 'function auth() {...}');
check('generate returns string', typeof prompt === 'string' && prompt.length > 20);
check('includes role', prompt.toLowerCase().includes('code-reviewer'));

// Test 2: Validate prompt (THE EDGE CASE)
const valid = meta.validate(prompt);
check('validate returns structure', valid && typeof valid === 'object');
check('validates generated prompt', valid.valid === true || valid.issues.length === 0,
  `naive AI generates without validation — issues: ${JSON.stringify(valid.issues)}`);

// Test 3: Validate incomplete prompt
const incomplete = meta.validate('Just do the thing');
check('flags incomplete prompts', incomplete.valid === false || incomplete.issues.length > 0);

// Test 4: Improve prompt
const improved = meta.improve(prompt, 'Add more specificity');
check('improve returns string', typeof improved === 'string');
check('improved differs from original', improved !== prompt || improved.length > prompt.length);

// Test 5: Generated prompt has all components
check('prompt has constraints', template.constraints.some(c => prompt.includes(c)) || prompt.length > 50);

// Test 6: Template structure
check('meta has generate method', typeof meta.generate === 'function');
check('meta has validate method', typeof meta.validate === 'function');
check('meta has improve method', typeof meta.improve === 'function');

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 6.7 complete. Meta-prompts generate AND validate — not just generate.');
  process.exit(0);
}
console.log('\nHint: check the validate test. Naive AI generates prompts without checking completeness.');
process.exit(1);
