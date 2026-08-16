/**
 * Quest 20.2: Multimodal Input Processor — test suite
 */

const { processMultimodal } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 20.2: Multimodal Input Processor\n');

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

const inputs = [
  { type: 'text', content: 'Describe this image' },
  { type: 'image', content: 'base64data...', metadata: { format: 'png' } },
  { type: 'text', content: 'What do you see?' },
];

const result = processMultimodal(inputs);

// Test 1: Separates text parts
check('separates text parts', result.textParts.length === 2,
  `got ${result.textParts.length} text parts`);

// Test 2: Separates image refs
check('separates image refs', result.imageRefs.length === 1,
  `got ${result.imageRefs.length} image refs`);

// Test 3: Combined prompt has [IMAGE] placeholder
check('combined has [IMAGE] placeholder', result.combined.includes('[IMAGE]'),
  `got: ${result.combined}`);

// Test 4: Token count is reasonable
check('token count > 0', result.tokens > 0, `got ${result.tokens}`);

// Test 5: EDGE CASE — images cost 1000 tokens regardless of content
const imageOnly = [{ type: 'image', content: 'x' }, { type: 'image', content: 'y' }];
const imgResult = processMultimodal(imageOnly);
check('images cost 1000 tokens each', imgResult.tokens >= 2000,
  `got ${imgResult.tokens} — images should be ~1000 tokens each`);

// Test 6: Token limit respected
check('tokens within limit', result.tokens <= 4000, `got ${result.tokens}`);

// Test 7: Empty input
const empty = processMultimodal([]);
check('empty input returns empty results', empty.textParts.length === 0 && empty.tokens === 0);

// Test 8: Text tokens estimated correctly
const textOnly = [{ type: 'text', content: 'a'.repeat(400) }];
const textResult = processMultimodal(textOnly);
check('text tokens ~100 (400 chars / 4)', textResult.tokens >= 90 && textResult.tokens <= 110,
  `got ${textResult.tokens}`);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 20.2 complete. You process multimodal inputs correctly.');
  process.exit(0);
}
console.log('\nHint: check if images are counted as 1000 tokens each, not by content length.');
process.exit(1);
