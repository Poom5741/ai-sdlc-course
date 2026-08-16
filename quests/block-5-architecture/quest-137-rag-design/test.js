/**
 * Quest 5.1: RAG Design — design-doc validator
 *
 * Tool skill: design a RAG system (chunking, embedding, retrieval).
 * Engineering habit: DESIGN FOR THE FAILURE MODE — plan what happens when
 * retrieval returns nothing, when confidence is low, or when the query is
 * out-of-corpus.
 *
 * This is NOT a code test. It validates that a design document
 * (`rag-design.md`) exists at the quest root and contains the required
 * sections/keywords.
 *
 * Required in rag-design.md:
 *   1. chunking strategy  (keyword "chunk")
 *   2. embedding strategy (keyword "embed")
 *   3. retrieval quality metric ("metric" | "recall" | "precision" | "NDCG")
 *   4. failure handling ("failure mode" | "fallback" | "graceful degradation")
 *   5. the corpus being indexed ("corpus" | "workshop docs")
 *   6. at least 400 characters of substance
 *
 * Run: node test.js
 */

const { existsSync, readFileSync } = require('fs');
const path = require('path');

const DOC_PATH = path.join(__dirname, 'rag-design.md');

let passed = 0;
let failed = 0;

console.log('Quest 5.1: RAG Design — design-doc validator\n');

function check(label, condition) {
  if (condition) {
    console.log(`PASS ${label}`);
    passed++;
  } else {
    console.log(`FAIL ${label}`);
    failed++;
  }
}

check('rag-design.md exists', existsSync(DOC_PATH));

if (!existsSync(DOC_PATH)) {
  console.log(`\nResults: ${passed} passed, ${failed} failed`);
  console.log('\nHint: create rag-design.md describing your RAG system over the workshop docs.');
  process.exit(1);
}

const content = readFileSync(DOC_PATH, 'utf-8');

check('chunking strategy (chunk)', /chunk/i.test(content));
check('embedding strategy (embed)', /embed/i.test(content));
check('retrieval quality metric (metric|recall|precision|NDCG)', /(metric|recall|precision|ndcg)/i.test(content));
check('failure handling (failure mode|fallback|graceful degradation)', /(failure mode|fallback|graceful degradation)/i.test(content));
check('corpus identified (corpus|workshop docs)', /(corpus|workshop docs)/i.test(content));
check('at least 400 characters of substance', content.length >= 400);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 5.1 complete. You designed a RAG system for the failure mode.');
  process.exit(0);
}

console.log('\nHint: rag-design.md must cover chunking, embedding, a retrieval metric, failure handling, and the corpus.');
process.exit(1);