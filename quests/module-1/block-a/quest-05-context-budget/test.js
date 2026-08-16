/**
 * Quest 1.5: Context Window Budget Calculator — test suite
 *
 * Tool skill: calculate how much context fits in a model's context window.
 * Engineering habit: BUDGET YOUR CONTEXT — allocate context window space
 * intentionally instead of letting it grow until truncation.
 *
 * Requires ./problem.js exporting { calculateBudget }. Run: node test.js
 */

const { calculateBudget } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 1.5: Context Window Budget Calculator\n');

function check(label, cond, detail) {
  if (cond) {
    console.log(`PASS ${label}`);
    passed++;
  } else {
    console.log(`FAIL ${label}`);
    if (detail) console.log(`   ${detail}`);
    failed++;
  }
}

// Basic: within budget
const r1 = calculateBudget({ systemTokens: 500, userTokens: 200, historyTokens: 100, reservedResponse: 1000 });
check('total is 16384', r1.total === 16384, `got ${r1.total}`);
check('used = 500+200+100 = 800', r1.used === 800, `got ${r1.used}`);
check('available = 16384 - 800 - 1000 = 14584', r1.available === 14584, `got ${r1.available}`);
check('withinBudget is true', r1.withinBudget === true, `got ${r1.withinBudget}`);
check('overBy is 0 when within budget', r1.overBy === 0, `got ${r1.overBy}`);

// Edge: exactly at budget
const r2 = calculateBudget({ systemTokens: 8000, userTokens: 4000, historyTokens: 3384, reservedResponse: 1000 });
check('exactly at budget: withinBudget true', r2.withinBudget === true, `got ${r2.withinBudget}`);
check('exactly at budget: overBy 0', r2.overBy === 0, `got ${r2.overBy}`);
check('exactly at budget: available = 0', r2.available === 0, `got ${r2.available}`);

// Edge: over budget — naive AI returns negative available
const r3 = calculateBudget({ systemTokens: 5000, userTokens: 5000, historyTokens: 5000, reservedResponse: 2000 });
check('over budget: withinBudget false', r3.withinBudget === false, `got ${r3.withinBudget}`);
check('over budget: overBy = 616', r3.overBy === 616, `got ${r3.overBy}`);
check('over budget: available clamped to 0 (not negative)', r3.available === 0, `got ${r3.available}`);

// Edge: all zeros
const r4 = calculateBudget({ systemTokens: 0, userTokens: 0, historyTokens: 0, reservedResponse: 0 });
check('all zeros: available = 16384', r4.available === 16384, `got ${r4.available}`);
check('all zeros: withinBudget true', r4.withinBudget === true, `got ${r4.withinBudget}`);

// Edge: reserved response exceeds total alone
const r5 = calculateBudget({ systemTokens: 100, userTokens: 100, historyTokens: 100, reservedResponse: 20000 });
check('reserved > total: withinBudget false', r5.withinBudget === false, `got ${r5.withinBudget}`);
check('reserved > total: available = 0', r5.available === 0, `got ${r5.available}`);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 1.5 complete. You budgeted your context window intentionally.');
  process.exit(0);
}
console.log('\nHint: check the over-budget and all-zeros edge cases. Naive AI returns negative available.');
process.exit(1);
