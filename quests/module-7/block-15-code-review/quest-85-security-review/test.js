/**
 * Quest 15.3: Security Review Automator — test suite
 */

const { securityReview } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 15.3: Security Review Automator\n');

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

// Test 1: Hardcoded password
const code1 = 'const password = "admin123";';
const r1 = securityReview(code1);
check('detects hardcoded password', r1.some(i => i.type === 'hardcoded-secret'),
  `got ${JSON.stringify(r1)}`);

// Test 2: Hardcoded API key
const code2 = 'const api_key = "sk-1234567890abcdef";';
const r2 = securityReview(code2);
check('detects hardcoded API key', r2.some(i => i.type === 'hardcoded-secret'),
  `got ${JSON.stringify(r2)}`);

// Test 3: Eval usage
const code3 = 'eval(userInput);';
const r3 = securityReview(code3);
check('detects eval usage', r3.some(i => i.type === 'eval-usage' && i.severity === 'critical'),
  `got ${JSON.stringify(r3)}`);

// Test 4: HTTP without TLS
const code4 = 'fetch("http://api.example.com/data");';
const r4 = securityReview(code4);
check('detects HTTP without TLS', r4.some(i => i.type === 'insecure-http'),
  `got ${JSON.stringify(r4)}`);

// Test 5: EDGE CASE — destructured import is NOT a hardcoded secret
const code5 = 'const { password } = req.body;';
const r5 = securityReview(code5);
check('does NOT flag destructured import as hardcoded secret',
  r5.filter(i => i.type === 'hardcoded-secret').length === 0,
  `got ${r5.filter(i => i.type === 'hardcoded-secret').length} false positives`);

// Test 6: Safe HTTPS
const code6 = 'fetch("https://api.example.com/data");';
const r6 = securityReview(code6);
check('HTTPS is not flagged', r6.filter(i => i.type === 'insecure-http').length === 0);

// Test 7: Empty input
const r7 = securityReview('');
check('empty input returns empty', r7.length === 0);

// Test 8: All issues have severity
const code8 = 'const password = "x";\neval("code");';
const r8 = securityReview(code8);
check('all issues have valid severity', r8.every(i => ['critical', 'high', 'medium'].includes(i.severity)));

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 15.3 complete. You automated security review.');
  process.exit(0);
}
console.log('\nHint: check if destructured imports like `const { password } = req.body` are flagged as hardcoded secrets.');
process.exit(1);
