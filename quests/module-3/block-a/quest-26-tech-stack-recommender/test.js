const { recommendStack } = require('./problem.js');
let passed = 0, failed = 0;
console.log('Quest 3.4: Tech Stack Recommender\n');
function check(l, c, d) { if (c) { console.log(`PASS ${l}`); passed++; } else { console.log(`FAIL ${l}`); if (d) console.log(`   ${d}`); failed++; } }
const r1 = recommendStack({ scale: 'small', teamSize: 2, complexity: 'low', domain: 'web' });
check('returns frontend', r1.frontend.length > 0);
check('returns backend', r1.backend.length > 0);
check('returns database', r1.database.length > 0);
check('returns rationale', r1.rationale.length > 0);
const r2 = recommendStack({ scale: 'enterprise', teamSize: 50, complexity: 'high', domain: 'fintech' });
check('enterprise scale differs from small', r2.backend !== r1.backend || r2.database !== r1.database,
  `small: ${r1.backend}, enterprise: ${r2.backend}`);
console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed === 0) { console.log('\nQuest 3.4 complete.'); process.exit(0); }
process.exit(1);
