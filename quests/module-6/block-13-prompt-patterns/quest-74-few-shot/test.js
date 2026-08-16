/**
 * Quest 6.2: Few-Shot Template Builder — test suite
 * Requires ./problem.js exporting { buildFewShotTemplate }. Run: node test.js
 */

const { buildFewShotTemplate } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 6.2: Few-Shot Template Builder\n');

function check(label, cond, detail) {
  if (cond) { console.log(`PASS ${label}`); passed++; } else { console.log(`FAIL ${label}`); if (detail) console.log(`   ${detail}`); failed++; }
}

const examples = [
  { input: 'happy', output: 'sad' },
  { input: 'up', output: 'down' },
  { input: 'fast', output: 'slow' },
];

// Test 1: Includes task
const result = buildFewShotTemplate(examples, 'Find the antonym', 'good');
check('includes task description', result.includes('Find the antonym'));

// Test 2: Includes ALL examples
check('includes example 1', result.includes('happy') && result.includes('sad'));
check('includes example 2', result.includes('up') && result.includes('down'));
check('includes example 3', result.includes('fast') && result.includes('slow'));

// Test 3: Includes new input
check('includes new input "good"', result.includes('good'));

// Test 4: Examples in correct order (THE EDGE CASE)
const happyPos = result.indexOf('happy');
const upPos = result.indexOf('up');
const fastPos = result.indexOf('fast');
check('examples preserve order',
  happyPos < upPos && upPos < fastPos,
  `naive AI shuffles examples — positions: ${happyPos}, ${upPos}, ${fastPos}`);

// Test 5: Returns a string
check('returns a string', typeof result === 'string' && result.length > 50);

// Test 6: New input comes after examples
check('new input after examples', fastPos < result.indexOf('good'));

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 6.2 complete. Few-shot examples preserve order — examples beat instructions.');
  process.exit(0);
}
console.log('\nHint: check example ordering. Naive AI may shuffle examples.');
process.exit(1);
