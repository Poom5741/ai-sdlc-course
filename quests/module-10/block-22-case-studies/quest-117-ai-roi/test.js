/**
 * Quest 22.3: AI ROI Calculator — test suite
 */

const { calculateROI } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 22.3: AI ROI Calculator\n');

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

// Positive ROI scenario
const data1 = { teamSize: 10, monthlyCostPerDev: 20, hoursSavedPerDevPerWeek: 5, hourlyRate: 75, weeksInQuarter: 13 };
const r1 = calculateROI(data1);

// Test 1: Total cost correct
check('total cost correct', r1.totalCost === 10 * 20 * 3,
  `expected ${10 * 20 * 3}, got ${r1.totalCost}`);

// Test 2: Total savings correct
check('total savings correct', r1.totalSavings === 10 * 5 * 75 * 13,
  `expected ${10 * 5 * 75 * 13}, got ${r1.totalSavings}`);

// Test 3: ROI is positive for good scenario
check('ROI positive for good scenario', r1.roi > 0,
  `got ${r1.roi}%`);

// Test 4: Break-even calculated
check('break-even weeks calculated', r1.breakEvenWeeks > 0 && r1.breakEvenWeeks < 13,
  `got ${r1.breakEvenWeeks} weeks`);

// Test 5: Net benefit
check('net benefit = savings - cost', r1.netBenefit === r1.totalSavings - r1.totalCost);

// Test 6: EDGE CASE — negative ROI when costs exceed savings
const badData = { teamSize: 10, monthlyCostPerDev: 200, hoursSavedPerDevPerWeek: 1, hourlyRate: 25, weeksInQuarter: 13 };
const r2 = calculateROI(badData);
check('negative ROI when costs > savings', r2.roi < 0,
  `got ${r2.roi}% — should be negative`);

// Test 7: Break-even is Infinity for negative ROI
check('break-even is Infinity for negative ROI', r2.breakEvenWeeks === Infinity,
  `got ${r2.breakEvenWeeks} — should be Infinity`);

// Test 8: ROI is percentage (0-100 or negative)
check('ROI is a percentage', typeof r1.roi === 'number');

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 22.3 complete. You calculate AI tool ROI correctly.');
  process.exit(0);
}
console.log('\nHint: check if negative ROI is reported when costs exceed savings.');
process.exit(1);
