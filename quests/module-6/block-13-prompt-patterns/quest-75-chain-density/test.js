/**
 * Quest 6.3: Chain-of-Density Optimizer — test suite
 * Requires ./problem.js exporting { optimizeDensity }. Run: node test.js
 */

const { optimizeDensity } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 6.3: Chain-of-Density Optimizer\n');

function check(label, cond, detail) {
  if (cond) { console.log(`PASS ${label}`); passed++; } else { console.log(`FAIL ${label}`); if (detail) console.log(`   ${detail}`); failed++; }
}

// Test 1: Removes filler words
const text1 = 'The very important thing is really basically actually important.';
const r1 = optimizeDensity(text1, 0.5);
check('removes filler words', !r1.optimized.includes('very') || r1.optimized.length < text1.length,
  `optimized: "${r1.optimized}"`);

// Test 2: Reduces to target ratio
check('ratio <= target', r1.ratio <= 0.6, `ratio: ${r1.ratio}`);

// Test 3: Preserves key terms
check('preserves "important"', r1.optimized.toLowerCase().includes('important'));

// Test 4: Token counts
check('originalTokens > 0', r1.originalTokens > 0);
check('optimizedTokens <= originalTokens', r1.optimizedTokens <= r1.originalTokens);

// Test 5: Redundant phrases (THE EDGE CASE)
const text2 = 'In order to make the system work, we need to in order to fix it.';
const r2 = optimizeDensity(text2, 0.5);
check('removes "in order to"', !r2.optimized.includes('in order to'),
  `naive AI keeps redundant phrases — got: "${r2.optimized}"`);

// Test 6: Preserves numbers and technical terms
const text3 = 'The server uses 3.5GB of memory and runs on port 3000.';
const r3 = optimizeDensity(text3, 0.7);
check('preserves numbers', r3.optimized.includes('3.5') || r3.optimized.includes('3000'));

// Test 7: Empty text
const r4 = optimizeDensity('', 0.5);
check('empty text returns empty', r4.optimized === '' || r4.originalTokens === 0);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 6.3 complete. Dense > verbose — remove filler, keep meaning.');
  process.exit(0);
}
console.log('\nHint: check the "in order to" test. Naive AI removes random words, not redundancy.');
process.exit(1);
