/**
 * Quest 6.10: Cross-Model Prompt Porter — test suite
 * Requires ./problem.js exporting { portPrompt }. Run: node test.js
 */

const { portPrompt } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 6.10: Cross-Model Prompt Porter\n');

function check(label, cond, detail) {
  if (cond) { console.log(`PASS ${label}`); passed++; } else { console.log(`FAIL ${label}`); if (detail) console.log(`   ${detail}`); failed++; }
}

const gpt4Prompt = 'You are an AI assistant. As an AI, you should always be helpful. Respond in JSON format.';

// Test 1: GPT-4 → Claude
const r1 = portPrompt(gpt4Prompt, 'gpt-4', 'claude');
check('GPT-4 to Claude returns adapted prompt', typeof r1.adapted === 'string');
check('reports changes', r1.changes.length > 0, `changes: ${JSON.stringify(r1.changes)}`);

// Test 2: Removes AI filler for Claude (THE EDGE CASE)
check('removes "as an AI" for Claude',
  !r1.adapted.includes('As an AI'),
  `naive AI returns same prompt — adapted: "${r1.adapted.slice(0, 100)}"`);

// Test 3: GPT-4 → Gemini
const r2 = portPrompt(gpt4Prompt, 'gpt-4', 'gemini');
check('GPT-4 to Gemini makes changes', r2.changes.length > 0);
check('Gemini adaptation simplifies', r2.adapted.length <= gpt4Prompt.length || r2.changes.some(c => c.includes('simplif')));

// Test 4: Same model = no changes needed
const r3 = portPrompt(gpt4Prompt, 'gpt-4', 'gpt-4');
check('same model returns original', r3.adapted === gpt4Prompt || r3.changes.length === 0);

// Test 5: Warnings for unsupported models
const r4 = portPrompt(gpt4Prompt, 'gpt-4', 'unknown-model');
check('unknown model has warnings', r4.warnings.length > 0);

// Test 6: Returns structure
check('result has adapted field', typeof r1.adapted === 'string');
check('result has changes field', Array.isArray(r1.changes));
check('result has warnings field', Array.isArray(r1.warnings));

// Test 7: Claude → GPT-4 adds JSON instruction
const claudePrompt = 'You are a helpful coding assistant. Output structured data.';
const r5 = portPrompt(claudePrompt, 'claude', 'gpt-4');
check('Claude to GPT-4 adds format instruction', r5.adapted.includes('JSON') || r5.changes.some(c => c.includes('format')));

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 6.10 complete. Prompts are NOT portable — model-specific adaptation required.');
  process.exit(0);
}
console.log('\nHint: check the GPT-4→Claude test. Naive AI returns the same prompt for all models.');
process.exit(1);
