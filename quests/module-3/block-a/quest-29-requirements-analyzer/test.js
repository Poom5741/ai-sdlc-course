const { analyzeRequirements } = require('./problem.js');
let passed = 0, failed = 0;
console.log('Quest 3.7: Requirements Quality Analyzer\n');
function check(l, c, d) { if (c) { console.log(`PASS ${l}`); passed++; } else { console.log(`FAIL ${l}`); if (d) console.log(`   ${d}`); failed++; } }
const result = analyzeRequirements('The system should be fast and user-friendly. It needs to handle lots of users.');
check('returns score', typeof result.score === 'number' && result.score >= 0 && result.score <= 100);
check('returns issues array', Array.isArray(result.issues));
check('returns suggestions array', Array.isArray(result.suggestions));
check('identifies vague requirements', result.issues.some(i => /vague|unclear|specific/i.test(i)));
check('score reflects quality', result.score < 80, `got ${result.score}, expected < 80 for vague requirements`);
console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed === 0) { console.log('\nQuest 3.7 complete.'); process.exit(0); }
process.exit(1);
