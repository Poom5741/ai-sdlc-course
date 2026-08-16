/**
 * Quest 2.5: Preference Optimization Implementer — test suite
 */
const { dpoLoss } = require('./problem.js');

let passed = 0;
let failed = 0;
console.log('Quest 2.5: DPO Loss Implementation\n');

function check(label, cond, detail) {
  if (cond) { console.log(`PASS ${label}`); passed++; }
  else { console.log(`FAIL ${label}`); if (detail) console.log(`   ${detail}`); failed++; }
}

function approxEqual(a, b, eps = 0.01) { return Math.abs(a - b) < eps; }

// Test 1: Basic DPO loss
const loss1 = dpoLoss(
  { chosen: -0.5, rejected: -1.0 },
  { chosen: -0.6, rejected: -0.9 },
  0.1
);
check('returns a number', typeof loss1 === 'number');
check('loss is positive', loss1 > 0);

// Test 2: When policy matches reference, loss should be ~log(2)
const loss2 = dpoLoss(
  { chosen: -1.0, rejected: -2.0 },
  { chosen: -1.0, rejected: -2.0 },
  1.0
);
check('policy=reference gives ~log(2)', approxEqual(loss2, Math.log(2), 0.1),
  `got ${loss2.toFixed(4)}, expected ${Math.log(2).toFixed(4)}`);

// Test 3: Beta affects loss magnitude
const loss3a = dpoLoss({ chosen: -0.5, rejected: -1.0 }, { chosen: -0.6, rejected: -0.9 }, 0.1);
const loss3b = dpoLoss({ chosen: -0.5, rejected: -1.0 }, { chosen: -0.6, rejected: -0.9 }, 1.0);
check('higher beta changes loss', !approxEqual(loss3a, loss3b, 0.001),
  `beta=0.1: ${loss3a}, beta=1.0: ${loss3b}`);

// Test 4: Edge case — naive AI uses exp instead of log-space
const loss4 = dpoLoss({ chosen: -2, rejected: -4 }, { chosen: -2, rejected: -4 }, 0.5);
check('handles large log-probs without overflow', isFinite(loss4));

console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed === 0) { console.log('\nQuest 2.5 complete.'); process.exit(0); }
console.log('\nHint: use the DPO formula with log-space arithmetic.');
process.exit(1);
