/**
 * Quest 2.4: Fine-Tuning Pipeline Design — design-doc validator
 */
const { existsSync, readFileSync } = require('fs');
const path = require('path');

const DOC_PATH = path.join(__dirname, 'finetuning-design.md');
let passed = 0;
let failed = 0;
console.log('Quest 2.4: Fine-Tuning Pipeline Design — design-doc validator\n');

function check(label, condition) {
  if (condition) { console.log(`PASS ${label}`); passed++; }
  else { console.log(`FAIL ${label}`); failed++; }
}

check('finetuning-design.md exists', existsSync(DOC_PATH));
if (!existsSync(DOC_PATH)) {
  console.log(`\nResults: ${passed} passed, ${failed} failed`);
  process.exit(1);
}

const content = readFileSync(DOC_PATH, 'utf-8');
check('covers SFT', /SFT|supervised fine-tun/i.test(content));
check('covers RLHF', /RLHF|reinforcement learning from human/i.test(content));
check('covers DPO', /DPO|direct preference/i.test(content));
check('data requirements', /data|dataset|training data/i.test(content));
check('evaluation metrics', /metric|eval|benchmark/i.test(content));
check('at least 400 characters', content.length >= 400);

console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed === 0) { console.log('\nQuest 2.4 complete.'); process.exit(0); }
console.log('\nHint: cover SFT, RLHF, DPO, data requirements, and metrics.');
process.exit(1);
