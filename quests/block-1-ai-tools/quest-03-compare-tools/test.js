/**
 * Quest 1.3: Compare Tools — checklist validator
 *
 * Tool skill: run the SAME prompt in 2+ AI tools and compare.
 * Engineering habit: CALIBRATE YOUR TOOLS — know which tool is better for
 * which job, and why.
 *
 * This is NOT a code test. It validates that a comparison design document
 * (`comparison.md`) exists and has the required sections.
 *
 * The comparison doc's REQUIRED sections:
 *   1. "Tool:" (which tool)
 *   2. "Output:" (what it produced)
 *   3. "Better:" / "Which was better:" (verdict)
 *   4. "Why:" (reasoning)
 *
 * Run: node test.js
 */

const { existsSync, readFileSync } = require('fs');

const DOC_PATH = require('path').join(__dirname, 'comparison.md');

let passed = 0;
let failed = 0;

console.log('Quest 1.3: Compare Tools — checklist validator\n');

function check(label, condition) {
  if (condition) {
    console.log(`PASS ${label}`);
    passed++;
  } else {
    console.log(`FAIL ${label}`);
    failed++;
  }
}

check('comparison.md exists', existsSync(DOC_PATH));

if (!existsSync(DOC_PATH)) {
  console.log(`\nResults: ${passed} passed, ${failed} failed`);
  console.log('\nHint: create comparison.md documenting your head-to-head run of the same prompt in 2+ AI tools.');
  process.exit(1);
}

const content = readFileSync(DOC_PATH, 'utf-8');

check('mentions at least 2 tools (Tool: or tool names)', /tool[:\s]/gi.test(content) && (content.match(/tool/gi) || []).length >= 2);
check('documents tool output (Output:)', /output[:\s]/i.test(content));
check('states which was better (Better: or Which was better:)', /(better|which was better)[:\s]/i.test(content));
check('explains why (Why:)', /why[:\s]/i.test(content));
check('at least 200 characters of substance', content.length >= 200);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 1.3 complete. You calibrated your tools.');
  process.exit(0);
}
console.log('\nHint: comparison.md must cover Tool, Output, Better, Why for at least 2 AI tools.');
process.exit(1);