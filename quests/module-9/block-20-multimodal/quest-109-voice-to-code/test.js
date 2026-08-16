/**
 * Quest 20.3: Voice-to-Code Pipeline Design — design-doc validator
 */

const { existsSync, readFileSync } = require('fs');
const path = require('path');

const DOC_PATH = path.join(__dirname, 'voice-to-code.md');

let passed = 0;
let failed = 0;

console.log('Quest 20.3: Voice-to-Code Pipeline Design — design-doc validator\n');

function check(label, condition) {
  if (condition) {
    console.log(`PASS ${label}`);
    passed++;
  } else {
    console.log(`FAIL ${label}`);
    failed++;
  }
}

check('voice-to-code.md exists', existsSync(DOC_PATH));

if (!existsSync(DOC_PATH)) {
  console.log(`\nResults: ${passed} passed, ${failed} failed`);
  process.exit(1);
}

const content = readFileSync(DOC_PATH, 'utf-8');

check('architecture overview', /architecture|pipeline|overview|high.?level/i.test(content));
check('speech-to-text layer', /speech.?to.?text|STT|transcri/i.test(content));
check('intent parsing', /intent|pars|understand/i.test(content));
check('code generation', /code generat|generat.*code|conver/i.test(content));
check('verification layer', /verif|test.*generated|validat/i.test(content));
check('latency considerations', /latency|real.?time|streaming/i.test(content));
check('error handling', /error handl|misrecogni|fallback|recover/i.test(content));
check('at least 500 characters', content.length >= 500);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 20.3 complete. You designed a voice-to-code pipeline.');
  process.exit(0);
}
process.exit(1);
