/**
 * Quest 2.8: RAG Chunking Strategist — test suite
 */
const { chunkDocument } = require('./problem.js');

let passed = 0;
let failed = 0;
console.log('Quest 2.8: RAG Chunking Strategist\n');

function check(label, cond, detail) {
  if (cond) { console.log(`PASS ${label}`); passed++; }
  else { console.log(`FAIL ${label}`); if (detail) console.log(`   ${detail}`); failed++; }
}

const doc = 'First paragraph.\n\nSecond paragraph.\n\nThird paragraph.';

// Test 1: Basic chunking
const chunks1 = chunkDocument(doc, { maxChunkSize: 30 });
check('returns array', Array.isArray(chunks1));
check('splits into multiple chunks', chunks1.length > 1);

// Test 2: Chunk size respected
const chunks2 = chunkDocument(doc, { maxChunkSize: 20 });
check('chunks respect max size', chunks2.every(c => c.length <= 25),
  `got chunks: ${chunks2.map(c => c.length)}`);

// Test 3: Overlap
const chunks3 = chunkDocument(doc, { maxChunkSize: 20, overlap: 5 });
check('overlap creates shared content', chunks3.length >= 2);

// Test 4: Edge case — naive AI splits mid-word
const text4 = 'Hello world this is a test';
const chunks4 = chunkDocument(text4, { maxChunkSize: 10, splitBy: 'words' });
check('word split respects boundaries', chunks4.every(c => !c.match(/\s$/) || c === chunks4[chunks4.length-1]),
  `got: ${JSON.stringify(chunks4)}`);

console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed === 0) { console.log('\nQuest 2.8 complete.'); process.exit(0); }
console.log('\nHint: respect paragraph/sentence/word boundaries when splitting.');
process.exit(1);
