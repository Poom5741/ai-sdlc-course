/**
 * Quest 20.4: Multimodal RAG System — test suite
 */

const { multimodalRAG } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 20.4: Multimodal RAG System\n');

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

const docs = [
  { id: 't1', type: 'text', content: 'The quick brown fox jumps over the lazy dog' },
  { id: 'i1', type: 'image', content: 'base64...', metadata: { alt: 'a sunset over mountains', tags: ['sunset', 'mountains'] } },
  { id: 'tbl1', type: 'table', content: '', metadata: { columns: ['name', 'age', 'city'], rows: [['Alice', 30, 'NYC'], ['Bob', 25, 'LA']] } },
  { id: 't2', type: 'text', content: 'Machine learning models require large datasets' },
];

// Test 1: Text query retrieves text docs
const r1 = multimodalRAG(docs, 'machine learning');
check('text query retrieves text docs', r1.some(d => d.id === 't2'),
  `got ${r1.map(d => d.id).join(', ')}`);

// Test 2: Visual query retrieves images
const r2 = multimodalRAG(docs, 'show me a sunset');
check('visual query retrieves images', r2.some(d => d.id === 'i1'),
  `got ${r2.map(d => d.id).join(', ')}`);

// Test 3: Table query retrieves tables
const r3 = multimodalRAG(docs, 'list all users with their ages');
check('table query retrieves tables', r3.some(d => d.id === 'tbl1'),
  `got ${r3.map(d => d.id).join(', ')}`);

// Test 4: Returns scores
check('results have scores', r1.every(d => typeof d.score === 'number'),
  `got ${JSON.stringify(r1.map(d => d.score))}`);

// Test 5: EDGE CASE — images scored differently than text
const r5 = multimodalRAG(docs, 'sunset mountains');
const imgScore = r5.find(d => d.id === 'i1')?.score || 0;
const txtScore = r5.find(d => d.id === 't1')?.score || 0;
check('image scored higher for visual query', imgScore > txtScore,
  `image: ${imgScore}, text: ${txtScore}`);

// Test 6: Results sorted by score (descending)
check('results sorted by score', r1.every((d, i) => i === 0 || d.score <= r1[i-1].score),
  `scores: ${r1.map(d => d.score)}`);

// Test 7: Empty docs
const empty = multimodalRAG([], 'query');
check('empty docs returns empty', empty.length === 0);

// Test 8: Results have required fields
check('results have id, type, score, reason', r1.every(d => d.id && d.type && typeof d.score === 'number' && d.reason));

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 20.4 complete. You built a multimodal RAG system.');
  process.exit(0);
}
console.log('\nHint: images and tables need type-specific scoring, not the same as text.');
process.exit(1);
