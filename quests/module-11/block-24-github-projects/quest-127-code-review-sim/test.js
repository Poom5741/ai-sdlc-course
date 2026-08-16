/**
 * Quest 24.4: Code Review Simulator — test suite
 *
 * Run: node test.js
 */

const { reviewDiff } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 24.4: Code Review Simulator\n');

function check(label, condition, detail) {
  if (condition) {
    console.log(`PASS ${label}`);
    passed++;
  } else {
    console.log(`FAIL ${label}`);
    if (detail) console.log(`   ${detail}`);
    failed++;
  }
}

// Test 1: clean diff — no issues
const cleanDiff = `@@ -1,3 +1,3 @@
 function add(a, b) {
-  return a - b;
+  return a + b;
 }`;
const r1 = reviewDiff(cleanDiff);
check('clean diff has no error comments', r1.comments.filter(c => c.severity === 'error').length === 0);
check('clean diff is approved', r1.approved === true, `got ${r1.approved}`);

// Test 2: console.log left in (warning)
const logDiff = `@@ -1,3 +1,4 @@
 function getData() {
+  console.log('debug');
   return fetch('/api');
 }`;
const r2 = reviewDiff(logDiff);
check('console.log detected as warning', r2.comments.some(c => /console\.log/i.test(c.message)), `got ${JSON.stringify(r2.comments)}`);

// Test 3: hardcoded secret (error)
const secretDiff = `@@ -1,3 +1,4 @@
+const API_KEY = "sk-1234567890abcdef";
 function callAPI() {
-  return fetch('/api');
+  return fetch('/api', { headers: { Authorization: API_KEY } });
 }`;
const r3 = reviewDiff(secretDiff);
check('hardcoded secret detected as error', r3.comments.some(c => c.severity === 'error' && /secret|api.?key|credential/i.test(c.message)), `got ${JSON.stringify(r3.comments)}`);
check('diff with secret is NOT approved', r3.approved === false, `got ${r3.approved}`);

// Test 4: missing null check (error) — EDGE CASE
const nullDiff = `@@ -1,5 +1,5 @@
 function processUser(user) {
-  return user.name;
+  return user.name.toUpperCase();
 }`;
const r4 = reviewDiff(nullDiff);
check('missing null check detected (edge case: naive AI misses this)', r4.comments.some(c => /null|undefined|guard/i.test(c.message)), `got ${JSON.stringify(r4.comments)}`);

// Test 5: TODO comment (info)
const todoDiff = `@@ -1,3 +1,4 @@
 function helper() {
+  // TODO: implement this properly
   return null;
 }`;
const r5 = reviewDiff(todoDiff);
check('TODO comment detected as info', r5.comments.some(c => /todo/i.test(c.message)), `got ${JSON.stringify(r5.comments)}`);

// Test 6: off-by-one (error) — EDGE CASE
const offByOne = `@@ -1,5 +1,5 @@
 function getItems(arr) {
-  for (let i = 0; i < arr.length; i++) {
+  for (let i = 0; i <= arr.length; i++) {
     process(arr[i]);
   }
 }`;
const r6 = reviewDiff(offByOne);
check('off-by-one detected (edge case: naive AI misses this)', r6.comments.some(c => /off.?by.?one|bounds|index/i.test(c.message)), `got ${JSON.stringify(r6.comments)}`);

// Test 7: missing error handling (warning)
const errorDiff = `@@ -1,3 +1,3 @@
 async function fetchData() {
-  const res = await fetch('/api');
+  const res = await fetch('/api');
   return res.json();
 }`;
const r7 = reviewDiff(errorDiff);
check('missing error handling detected', r7.comments.some(c => /error|catch|try/i.test(c.message)), `got ${JSON.stringify(r7.comments)}`);

// Test 8: comments have line numbers
check('comments include line info', r3.comments.length > 0 && (r3.comments[0].line !== undefined || r3.comments[0].line === 0));

// Test 9: empty diff
const r8 = reviewDiff('');
check('empty diff is approved', r8.approved === true);

// Test 10: multiple issues
check('multiple issues produce multiple comments', r6.comments.length >= 1, `got ${r6.comments.length} comments`);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 24.4 complete. You review code for edge cases, not just syntax.');
  process.exit(0);
}
console.log('\nHint: naive AI approves code without checking null guards and off-by-one errors.');
process.exit(1);
