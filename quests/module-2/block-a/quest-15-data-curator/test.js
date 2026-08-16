/**
 * Quest 2.3: Data Curator — test suite
 */
const { curateData } = require('./problem.js');

let passed = 0;
let failed = 0;
console.log('Quest 2.3: Data Curator\n');

function check(label, cond, detail) {
  if (cond) { console.log(`PASS ${label}`); passed++; }
  else { console.log(`FAIL ${label}`); if (detail) console.log(`   ${detail}`); failed++; }
}

const raw = [
  'Hello world this is a test',
  'Hello world this is a test',  // duplicate
  'Short',                        // < 10 chars
  'This is another valid line!!!',
  '!!!???...',                     // >50% punctuation
  '  Trimmed  ',
  'A',                            // single char
];

const result = curateData(raw);
check('returns array', Array.isArray(result));
check('removes duplicates', result.filter(x => x === 'Hello world this is a test').length === 1);
check('removes short lines (< 10 chars)', !result.includes('Short'));
check('removes punctuation-heavy lines', !result.some(x => x === '!!!???...'));
check('trims whitespace', result.includes('Trimmed'));
check('preserves valid lines', result.includes('This is another valid line!!!'));

console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed === 0) { console.log('\nQuest 2.3 complete.'); process.exit(0); }
console.log('\nHint: check duplicate removal, short line filtering, and punctuation detection.');
process.exit(1);
