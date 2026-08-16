/**
 * Quest 2.7: Chain-of-Thought Prompter — test suite
 */
const { buildCoTPrompt } = require('./problem.js');

let passed = 0;
let failed = 0;
console.log('Quest 2.7: Chain-of-Thought Prompter\n');

function check(label, cond, detail) {
  if (cond) { console.log(`PASS ${label}`); passed++; }
  else { console.log(`FAIL ${label}`); if (detail) console.log(`   ${detail}`); failed++; }
}

const prompt = buildCoTPrompt('What is 2+2?', ['First, identify the operation', 'Then compute']);

check('returns a string', typeof prompt === 'string');
check('contains the problem', prompt.includes('What is 2+2?'));
check('contains step-by-step indicator', /step|think|reason/i.test(prompt));
check('contains the steps', prompt.includes('First, identify') && prompt.includes('Then compute'));
check('not just the problem passed through', prompt !== 'What is 2+2?');

// Edge case: empty steps
const prompt2 = buildCoTPrompt('Solve x', []);
check('handles empty steps', typeof prompt2 === 'string' && prompt2.includes('Solve x'));

console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed === 0) { console.log('\nQuest 2.7 complete.'); process.exit(0); }
console.log('\nHint: structure the prompt with explicit reasoning steps.');
process.exit(1);
