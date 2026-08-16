const { identifyRisks } = require('./problem.js');
let passed = 0, failed = 0;
console.log('Quest 3.5: Risk Identifier\n');
function check(l, c, d) { if (c) { console.log(`PASS ${l}`); passed++; } else { console.log(`FAIL ${l}`); if (d) console.log(`   ${d}`); failed++; } }
const risks = identifyRisks('Build a payment system with third-party API integration');
check('returns array', Array.isArray(risks));
check('has at least 2 risks', risks.length >= 2);
check('each risk has severity', risks.every(r => ['low','medium','high'].includes(r.severity)));
check('each risk has mitigation', risks.every(r => r.mitigation && r.mitigation.length > 0));
check('identifies API dependency risk', risks.some(r => /api|third.party/i.test(r.risk)));
console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed === 0) { console.log('\nQuest 3.5 complete.'); process.exit(0); }
process.exit(1);
