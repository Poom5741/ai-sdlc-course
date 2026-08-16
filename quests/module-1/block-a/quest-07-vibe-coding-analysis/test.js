/**
 * Quest 1.7: Vibe Coding vs Vibe Engineering Analysis — design-doc validator
 *
 * Validates that vibe-analysis.md exists and contains required sections.
 *
 * Required in vibe-analysis.md:
 *   1. definition of vibe coding
 *   2. definition of vibe engineering
 *   3. at least 2 failure examples
 *   4. decision framework
 *   5. risk assessment
 *   6. at least 400 characters
 *
 * Run: node test.js
 */

const { existsSync, readFileSync } = require('fs');
const path = require('path');

const DOC_PATH = path.join(__dirname, 'vibe-analysis.md');

let passed = 0;
let failed = 0;

console.log('Quest 1.7: Vibe Coding vs Vibe Engineering — design-doc validator\n');

function check(label, condition) {
  if (condition) {
    console.log(`PASS ${label}`);
    passed++;
  } else {
    console.log(`FAIL ${label}`);
    failed++;
  }
}

check('vibe-analysis.md exists', existsSync(DOC_PATH));

if (!existsSync(DOC_PATH)) {
  console.log(`\nResults: ${passed} passed, ${failed} failed`);
  console.log('\nHint: create vibe-analysis.md comparing vibe coding vs vibe engineering.');
  process.exit(1);
}

const content = readFileSync(DOC_PATH, 'utf-8');

check('defines vibe coding', /vibe coding/i.test(content));
check('defines vibe engineering', /vibe engineering/i.test(content));
check('failure examples (at least 2)', (content.match(/fail|failure|break|crash|bug/gi) || []).length >= 2);
check('decision framework', /decision|framework|when to use|choose/i.test(content));
check('risk assessment', /risk|danger|production|security/i.test(content));
check('at least 400 characters', content.length >= 400);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 1.7 complete. You analyzed the difference between vibe coding and engineering.');
  process.exit(0);
}

console.log('\nHint: vibe-analysis.md must cover definitions, failure examples, decision framework, and risks.');
process.exit(1);
