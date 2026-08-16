/**
 * Quest 1.11: Model Architecture Classifier — test suite
 *
 * Tool skill: classify model architectures by their properties.
 * Engineering habit: KNOW YOUR TOOLS — different architectures have different strengths.
 *
 * Requires ./problem.js exporting { classifyArchitecture }. Run: node test.js
 */

const { classifyArchitecture } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 1.11: Model Architecture Classifier\n');

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

// Test 1: BERT classification
check('BERT: encoder-only + bidirectional',
  classifyArchitecture({ type: 'encoder-only', attentionType: 'bidirectional', useCase: 'classification' }) === 'BERT');

// Test 2: GPT classification
check('GPT: decoder-only + causal',
  classifyArchitecture({ type: 'decoder-only', attentionType: 'causal', useCase: 'generation' }) === 'GPT');

// Test 3: T5 classification
check('T5: encoder-decoder + both',
  classifyArchitecture({ type: 'encoder-decoder', attentionType: 'both', useCase: 'translation' }) === 'T5');

// Test 4: Unknown — wrong attention type for GPT
check('UNKNOWN: decoder-only + bidirectional (not GPT)',
  classifyArchitecture({ type: 'decoder-only', attentionType: 'bidirectional', useCase: 'generation' }) === 'UNKNOWN',
  `got ${classifyArchitecture({ type: 'decoder-only', attentionType: 'bidirectional', useCase: 'generation' })}`);

// Test 5: Unknown — wrong attention type for BERT
check('UNKNOWN: encoder-only + causal (not BERT)',
  classifyArchitecture({ type: 'encoder-only', attentionType: 'causal', useCase: 'classification' }) === 'UNKNOWN',
  `got ${classifyArchitecture({ type: 'encoder-only', attentionType: 'causal', useCase: 'classification' })}`);

// Test 6: Unknown — wrong attention type for T5
check('UNKNOWN: encoder-decoder + causal only (not T5)',
  classifyArchitecture({ type: 'encoder-decoder', attentionType: 'causal', useCase: 'translation' }) === 'UNKNOWN',
  `got ${classifyArchitecture({ type: 'encoder-decoder', attentionType: 'causal', useCase: 'translation' })}`);

// Test 7: Edge case — naive AI ignores attentionType
// This is a decoder-only with bidirectional attention — NOT GPT
check('edge: decoder-only + bidirectional ≠ GPT',
  classifyArchitecture({ type: 'decoder-only', attentionType: 'bidirectional', useCase: 'fill-mask' }) !== 'GPT',
  'naive AI classified decoder-only as GPT regardless of attention type');

// Test 8: Empty/invalid config
check('invalid config returns UNKNOWN',
  classifyArchitecture({}) === 'UNKNOWN' || classifyArchitecture({ type: 'unknown' }) === 'UNKNOWN');

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 1.11 complete. You classified architectures by type AND attention pattern.');
  process.exit(0);
}
console.log('\nHint: check the attention type — decoder-only + bidirectional is NOT GPT.');
process.exit(1);
