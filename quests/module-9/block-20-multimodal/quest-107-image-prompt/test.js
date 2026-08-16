/**
 * Quest 20.1: Image Prompt Engineer — design-doc validator
 */

const { existsSync, readFileSync } = require('fs');
const path = require('path');

const DOC_PATH = path.join(__dirname, 'image-prompt-guide.md');

let passed = 0;
let failed = 0;

console.log('Quest 20.1: Image Prompt Engineer — design-doc validator\n');

function check(label, condition) {
  if (condition) {
    console.log(`PASS ${label}`);
    passed++;
  } else {
    console.log(`FAIL ${label}`);
    failed++;
  }
}

check('image-prompt-guide.md exists', existsSync(DOC_PATH));

if (!existsSync(DOC_PATH)) {
  console.log(`\nResults: ${passed} passed, ${failed} failed`);
  process.exit(1);
}

const content = readFileSync(DOC_PATH, 'utf-8');

check('prompt structure section', /prompt structure|subject.*style|composition/i.test(content));
check('style keywords library', /style keyword|keyword.*library|categor/i.test(content));
check('common mistakes section', /common mistake|mistake|anti-pattern/i.test(content));
check('before/after examples', /before.*after|bad prompt|improved prompt/i.test(content));
check('model-specific tips', /model.*tip|dall.?e|midjourney|stable diffusion/i.test(content));
check('at least 500 characters', content.length >= 500);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 20.1 complete. You wrote a guide for effective image prompts.');
  process.exit(0);
}
process.exit(1);
