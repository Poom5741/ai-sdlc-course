/**
 * Quest 5.7: Semantic Cache Builder — test suite
 * Requires ./problem.js exporting { createSemanticCache }. Run: node test.js
 */

const { createSemanticCache } = require("./problem.js");

let passed = 0;
let failed = 0;

console.log("Quest 5.7: Semantic Cache Builder\n");

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

// Simple embedding simulation: similar strings → similar vectors
function simEmbed(text) {
 const words = text
  .toLowerCase()
  .replace(/[^a-z0-9\s]/g, "")
  .split(/\s+/);
 const vocab = [
  "what",
  "is",
  "ai",
  "artificial",
  "intelligence",
  "define",
  "mean",
  "hello",
  "world",
 ];
 return vocab.map((v) => (words.includes(v) ? 1 : 0));
}

// Test 1: Set and get (exact match)
const cache = createSemanticCache(0.5);
cache.set(
 "What is AI?",
 "AI is artificial intelligence",
 simEmbed("What is AI?"),
);
const r1 = cache.get("What is AI?", simEmbed("What is AI?"));
check("exact match returns cached", r1 === "AI is artificial intelligence");

// Test 2: Semantic match (THE EDGE CASE)
// "What is AI?" → [1,1,1,0,0,0,0,0,0] (3 words: what, is, ai)
// "What is artificial intelligence?" → [1,1,0,1,1,0,0,0,0] (4 words: what, is, artificial, intelligence)
// cosine similarity ≈ 0.577 — above 0.5 threshold
const r2 = cache.get(
 "What is artificial intelligence?",
 simEmbed("What is artificial intelligence?"),
);
check(
 "semantic match returns cached",
 r2 === "AI is artificial intelligence",
 `naive AI only does exact match — got: ${r2}`,
);

// Test 3: Non-matching query
const r3 = cache.get("Hello world", simEmbed("Hello world"));
check("non-matching query returns null", r3 === null);

// Test 4: Stats
const stats = cache.stats();
check("stats tracks hits", stats.hits >= 2, `hits: ${stats.hits}`);
check("stats tracks misses", stats.misses >= 1);
check("stats tracks size", stats.size >= 1);

// Test 5: Below threshold
// Use very high threshold (0.99) so similar-but-not-identical queries fail
const cache2 = createSemanticCache(0.99);
// "What is AI?" → [1,1,1,0,0,0,0,0,0]
// "What is artificial?" → [1,1,0,1,0,0,0,0,0] — shares 2/3 words, cosine ≈ 0.816
cache2.set("What is AI?", "response", simEmbed("What is AI?"));
const r4 = cache2.get("What is artificial?", simEmbed("What is artificial?"));
check("below threshold returns null", r4 === null);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
 console.log(
  "\nQuest 5.7 complete. You cache by meaning, not exact string — semantic cache works.",
 );
 process.exit(0);
}
console.log(
 "\nHint: check the semantic match test. Naive AI caches by exact string only.",
);
process.exit(1);
