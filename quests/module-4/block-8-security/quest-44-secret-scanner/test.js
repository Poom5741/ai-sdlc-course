/**
 * Quest 4.2: Secret Scanner — test suite
 *
 * Requires ./problem.js exporting { scanSecrets }. Run: node test.js
 */

const { scanSecrets } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 4.2: Secret Scanner\n');

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

// Test 1: AWS key detection
const code1 = 'const AWS_KEY = "AKIAIOSFODNN7EXAMPLE";';
const r1 = scanSecrets(code1);
check('detects AWS key', r1.length >= 1, `got ${r1.length}`);
check('AWS key type is correct', r1.some(s => s.type === 'aws-key'), `types: ${JSON.stringify(r1.map(s => s.type))}`);

// Test 2: API key with sk- prefix
const code2 = "const key = 'sk-abc123def456ghi789jkl012mno345pqr';";
const r2 = scanSecrets(code2);
check('detects sk- API key', r2.length >= 1, `got ${r2.length}`);

// Test 3: Password assignment
const code3 = 'const password = "SuperSecret123!";';
const r3 = scanSecrets(code3);
check('detects password assignment', r3.length >= 1, `got ${r3.length}`);
check('password type is correct', r3.some(s => s.type === 'password'), `types: ${JSON.stringify(r3.map(s => s.type))}`);

// Test 4: Private key
const code4 = 'const cert = "-----BEGIN RSA PRIVATE KEY-----\\nMIIE...";';
const r4 = scanSecrets(code4);
check('detects private key', r4.length >= 1, `got ${r4.length}`);

// Test 5: Connection string
const code5 = 'const url = "mongodb://admin:pass@host:27017/db";';
const r5 = scanSecrets(code5);
check('detects connection string', r5.length >= 1, `got ${r5.length}`);

// Test 6: Edge case — placeholder value (should NOT flag)
const code6 = 'const API_KEY = "your-api-key-here";';
const r6 = scanSecrets(code6);
check('does NOT flag placeholder values', r6.length === 0,
  `got ${r6.length} — naive AI flags variable names instead of values`);

// Test 7: Edge case — variable name contains "key" but no actual secret
const code7 = 'const apiKey = getFromEnv();';
const r7 = scanSecrets(code7);
check('does NOT flag variable names without values', r7.length === 0,
  `got ${r7.length}`);

// Test 8: Multiple secrets
const code8 = 'const a = "AKIAIOSFODNN7EXAMPLE";\nconst b = "password=secret123";';
const r8 = scanSecrets(code8);
check('detects multiple secrets', r8.length >= 2, `got ${r8.length}`);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 4.2 complete. You scan for secrets — values, not names.');
  process.exit(0);
}
console.log('\nHint: check the placeholder and variable-name edge cases. Naive AI matches names, not values.');
process.exit(1);
