const { generateADR } = require('./problem.js');
let passed = 0, failed = 0;
console.log('Quest 3.3: ADR Generator\n');
function check(l, c, d) { if (c) { console.log(`PASS ${l}`); passed++; } else { console.log(`FAIL ${l}`); if (d) console.log(`   ${d}`); failed++; } }
const adr = generateADR('Use PostgreSQL', 'We need a database', 'Use PostgreSQL for ACID compliance', 'Need DBA expertise');
check('returns string', typeof adr === 'string');
check('contains title', adr.includes('Use PostgreSQL'));
check('contains context', adr.includes('database'));
check('contains decision', adr.includes('PostgreSQL'));
check('contains consequences', adr.includes('DBA') || adr.includes('consequence'));
console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed === 0) { console.log('\nQuest 3.3 complete.'); process.exit(0); }
process.exit(1);
