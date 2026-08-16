const { solve } = require('./problem.js');
let passed = 0, failed = 0;
console.log('Quest 42: Regression Test Predictor\n');
function check(l, c, d) { if (c) { console.log(`PASS ${l}`); passed++; } else { console.log(`FAIL ${l}`); if (d) console.log(`   ${d}`); failed++; } }
const result = solve();
check('returns a value', result !== null && result !== undefined);
console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed === 0) { console.log('\nQuest 42 complete.'); process.exit(0); }
process.exit(1);
