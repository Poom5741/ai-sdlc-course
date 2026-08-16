/**
 * Quest 2.9: Semantic Search Builder — test suite
 */
const { cosineSimilarity, search } = require('./problem.js');

let passed = 0;
let failed = 0;
console.log('Quest 2.9: Semantic Search Builder\n');

function check(label, cond, detail) {
  if (cond) { console.log(`PASS ${label}`); passed++; }
  else { console.log(`FAIL ${label}`); if (detail) console.log(`   ${detail}`); failed++; }
}

function approxEqual(a, b, eps = 0.01) { return Math.abs(a - b) < eps; }

// Test 1: Identical vectors
check('identical vectors = 1', approxEqual(cosineSimilarity([1, 0], [1, 0]), 1));

// Test 2: Orthogonal vectors
check('orthogonal vectors = 0', approxEqual(cosineSimilarity([1, 0], [0, 1]), 0));

// Test 3: Opposite vectors
check('opposite vectors = -1', approxEqual(cosineSimilarity([1, 0], [-1, 0]), -1));

// Test 4: Different magnitudes should give same similarity
check('magnitude invariant', approxEqual(
  cosineSimilarity([1, 0], [0, 1]),
  cosineSimilarity([100, 0], [0, 100])
));

// Test 5: Search finds most similar
const docs = [
  { text: 'cats are animals', embedding: [1, 0, 0] },
  { text: 'dogs are animals', embedding: [0.9, 0.1, 0] },
  { text: 'cars are vehicles', embedding: [0, 0, 1] },
];
const result = search({ text: 'feline pets', embedding: [1, 0, 0] }, docs);
check('search returns most similar doc', result.text === 'cats are animals',
  `got "${result.text}"`);

// Test 6: Edge case — naive AI uses dot product without normalization
check('normalizes vectors (not raw dot product)', approxEqual(
  cosineSimilarity([1, 0], [1, 0]),
  cosineSimilarity([2, 0], [2, 0])
));

console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed === 0) { console.log('\nQuest 2.9 complete.'); process.exit(0); }
console.log('\nHint: normalize vectors before computing dot product.');
process.exit(1);
