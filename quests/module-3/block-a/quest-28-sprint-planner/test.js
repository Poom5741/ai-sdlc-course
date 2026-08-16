const { planSprint } = require('./problem.js');
let passed = 0, failed = 0;
console.log('Quest 3.6: Sprint Planner\n');
function check(l, c, d) { if (c) { console.log(`PASS ${l}`); passed++; } else { console.log(`FAIL ${l}`); if (d) console.log(`   ${d}`); failed++; } }
const result = planSprint([
  { name: 'User Auth', priority: 'high', complexity: 'medium' },
  { name: 'Dashboard', priority: 'medium', complexity: 'high' }
], 20);
check('returns tasks array', Array.isArray(result.tasks));
check('has tasks', result.tasks.length > 0);
check('totalEstimate is number', typeof result.totalEstimate === 'number');
check('fitsInSprint is boolean', typeof result.fitsInSprint === 'boolean');
check('tasks have estimates', result.tasks.every(t => t.estimate > 0));
check('total matches sum', result.totalEstimate === result.tasks.reduce((s, t) => s + t.estimate, 0));
console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed === 0) { console.log('\nQuest 3.6 complete.'); process.exit(0); }
process.exit(1);
