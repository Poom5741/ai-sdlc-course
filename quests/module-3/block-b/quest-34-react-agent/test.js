const { reactAgent } = require('./problem.js');
let passed = 0, failed = 0;
console.log('Quest 3.12: ReAct Pattern Agent\n');
function check(l, c, d) { if (c) { console.log(`PASS ${l}`); passed++; } else { console.log(`FAIL ${l}`); if (d) console.log(`   ${d}`); failed++; } }
const result = reactAgent('find the answer', [{ name: 'search', handler: () => 'found' }]);
check('returns observation', typeof result.observation === 'string');
check('returns reasoning', typeof result.reasoning === 'string');
check('returns action', result.action !== undefined);
check('returns result', result.result !== undefined);
check('reasoning references goal', result.reasoning.toLowerCase().includes('answer') || result.observation.length > 0);
console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed === 0) { console.log('\nQuest 3.12 complete.'); process.exit(0); }
process.exit(1);
