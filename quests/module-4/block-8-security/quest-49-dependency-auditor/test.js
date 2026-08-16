/**
 * Quest 4.7: Dependency Vulnerability Auditor — test suite
 *
 * Requires ./problem.js exporting { auditDependencies }. Run: node test.js
 */

const { auditDependencies } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 4.7: Dependency Vulnerability Auditor\n');

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

const pkg = {
  dependencies: { lodash: '4.17.20', express: '4.18.2' },
  devDependencies: { jest: '29.5.0', webpack: '5.88.0' },
};

const vulnDb = {
  lodash: { versions: ['4.17.20', '4.17.19'], severity: 'critical', fix: '4.17.21' },
  webpack: { versions: ['5.88.0', '5.87.0'], severity: 'high', fix: '5.89.0' },
};

const result = auditDependencies(pkg, vulnDb);

// Test 1: Total count
check('total counts all packages', result.total === 4, `got ${result.total}`);

// Test 2: Vulnerable count
check('vulnerable count is 2', result.vulnerable === 2, `got ${result.vulnerable}`);

// Test 3: Finds lodash vulnerability
check('finds lodash vulnerability', result.results.some(r => r.package === 'lodash'));

// Test 4: Lodash is critical
const lodashResult = result.results.find(r => r.package === 'lodash');
check('lodash severity is critical', lodashResult && lodashResult.severity === 'critical');

// Test 5: Checks devDependencies (THE EDGE CASE)
check('finds webpack vulnerability in devDependencies', result.results.some(r => r.package === 'webpack'),
  `naive AI often misses devDependencies`);

const webpackResult = result.results.find(r => r.package === 'webpack');
check('webpack marked as devOnly', webpackResult && webpackResult.devOnly === true,
  `naive AI doesn't distinguish dev deps`);

// Test 6: Safe packages not flagged
check('express not flagged', !result.results.some(r => r.package === 'express'));
check('jest not flagged', !result.results.some(r => r.package === 'jest'));

// Test 7: Results sorted by severity
const sevOrder = { critical: 0, high: 1, medium: 2, low: 3 };
const sorted = result.results.every((r, i) =>
  i === 0 || sevOrder[r.severity] >= sevOrder[result.results[i - 1].severity]
);
check('results sorted by severity', sorted);

// Test 8: Each result has required fields
check('results have package field', result.results.every(r => r.package));
check('results have fix field', result.results.every(r => r.fix));

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 4.7 complete. You audit ALL dependencies — including devDependencies.');
  process.exit(0);
}
console.log('\nHint: check the devDependencies test. Naive AI only audits dependencies.');
process.exit(1);
