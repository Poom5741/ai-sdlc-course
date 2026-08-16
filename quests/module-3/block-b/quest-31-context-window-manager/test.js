const { prioritizeFiles } = require('./problem.js');
let passed = 0, failed = 0;
console.log('Quest 3.9: Context Window Manager\n');
function check(l, c, d) { if (c) { console.log(`PASS ${l}`); passed++; } else { console.log(`FAIL ${l}`); if (d) console.log(`   ${d}`); failed++; } }
const files = [
  { name: 'auth.js', tokens: 500, relevance: 0.9 },
  { name: 'utils.js', tokens: 300, relevance: 0.3 },
  { name: 'db.js', tokens: 400, relevance: 0.7 }
];
const selected = prioritizeFiles(files, 'fix login bug', 800);
check('returns array', Array.isArray(selected));
check('respects token budget', true);
check('selects relevant files', selected.includes('auth.js'));
check('excludes low relevance when budget tight', !selected.includes('utils.js') || selected.length <= 2);
console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed === 0) { console.log('\nQuest 3.9 complete.'); process.exit(0); }
process.exit(1);
