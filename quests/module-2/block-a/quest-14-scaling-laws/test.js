/**
 * Quest 2.2: Scaling Laws Calculator — test suite
 */
const { computeOptimal } = require('./problem.js');

let passed = 0;
let failed = 0;
console.log('Quest 2.2: Scaling Laws Calculator\n');

function check(label, cond, detail) {
  if (cond) { console.log(`PASS ${label}`); passed++; }
  else { console.log(`FAIL ${label}`); if (detail) console.log(`   ${detail}`); failed++; }
}

function approxEqual(a, b, eps = 0.1) { return Math.abs(a - b) < eps; }

const r1 = computeOptimal(1e18);
check('returns object with parameters', typeof r1.parameters === 'number' && r1.parameters > 0);
check('returns object with tokens', typeof r1.tokens === 'number' && r1.tokens > 0);
check('ratio is valid string', ['compute-optimal', 'over-parameterized', 'under-trained'].includes(r1.ratio));

// Scaling law check: N ≈ 0.3 * C^0.5
const expected = 0.3 * Math.pow(1e18, 0.5);
check('parameters follow scaling law', approxEqual(r1.parameters, expected, expected * 0.2),
  `got ${r1.parameters}, expected ~${expected}`);

// Test 2: Different budget
const r2 = computeOptimal(1e15);
check('smaller budget gives smaller model', r2.parameters < r1.parameters);

// Test 3: Ratio check
const r3 = computeOptimal(1e20);
check('ratio is compute-optimal for balanced allocation', r3.ratio === 'compute-optimal',
  `got ${r3.ratio}`);

console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed === 0) { console.log('\nQuest 2.2 complete.'); process.exit(0); }
console.log('\nHint: use Chinchilla scaling laws: N ≈ 0.3 × C^0.5');
process.exit(1);
