/**
 * Quest 2.10: Hallucination Prevention System — test suite
 */
const { preventHallucination } = require('./problem.js');

let passed = 0;
let failed = 0;
console.log('Quest 2.10: Hallucination Prevention System\n');

function check(label, cond, detail) {
  if (cond) { console.log(`PASS ${label}`); passed++; }
  else { console.log(`FAIL ${label}`); if (detail) console.log(`   ${detail}`); failed++; }
}

// Test 1: Returns required structure
const r1 = preventHallucination('What is X?', ['Context about X'], {});
check('returns safe flag', typeof r1.safe === 'boolean');
check('returns warnings array', Array.isArray(r1.warnings));
check('returns enhancedPrompt', typeof r1.enhancedPrompt === 'string');

// Test 2: Low temperature warning
const r2 = preventHallucination('Tell me about Y', ['Context Y'], { temperature: 0.9 });
check('warns on high temperature', r2.warnings.some(w => /temperature/i.test(w)),
  `got warnings: ${r2.warnings}`);

// Test 3: Citation required
const r3 = preventHallucination('Explain Z', ['Context Z'], { requireCitation: true });
check('enhanced prompt includes citation instruction', /cite|citation|source/i.test(r3.enhancedPrompt),
  `got: ${r3.enhancedPrompt.substring(0, 100)}`);

// Test 4: Sparse context warning
const r4 = preventHallucination('Complex question', [], {});
check('warns on empty context', r4.warnings.some(w => /context|sparse|empty/i.test(w)),
  `got warnings: ${r4.warnings}`);

// Test 5: Low confidence threshold
const r5 = preventHallucination('Question', ['One context'], { confidenceThreshold: 0.8 });
check('considers context quantity', r5.warnings.length > 0 || r5.safe === false,
  `got: safe=${r5.safe}, warnings=${r5.warnings}`);

// Test 6: Edge case — naive AI only applies one strategy
const r6 = preventHallucination('Test', ['Context'], { temperature: 0.9, requireCitation: true });
check('applies multiple strategies (temp + citation)', r6.warnings.length >= 1 && /cite/i.test(r6.enhancedPrompt));

console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed === 0) { console.log('\nQuest 2.10 complete.'); process.exit(0); }
console.log('\nHint: layer multiple prevention strategies, not just one.');
process.exit(1);
