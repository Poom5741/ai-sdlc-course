const { refinePrompt } = require('./problem.js');
let passed = 0, failed = 0;
console.log('Quest 3.8: Prompt-for-Code Refiner\n');
function check(l, c, d) { if (c) { console.log(`PASS ${l}`); passed++; } else { console.log(`FAIL ${l}`); if (d) console.log(`   ${d}`); failed++; } }
const refined = refinePrompt('write a function');
check('returns string', typeof refined === 'string');
check('improves vague prompt', refined.length > 'write a function'.length);
check('adds specificity', /\(.*\)|parameter|input|type|return/i.test(refined));
check('not just the original', refined !== 'write a function');
console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed === 0) { console.log('\nQuest 3.8 complete.'); process.exit(0); }
process.exit(1);
