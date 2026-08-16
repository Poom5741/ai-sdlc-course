/**
 * Quest 25.4: Worker Environment Config — test suite
 *
 * Run: node test.js
 */

const { validateBindings } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 25.4: Worker Environment Config\n');

function check(label, condition, detail) {
  if (condition) {
    console.log(`PASS ${label}`);
    passed++;
  } else {
    console.log(`FAIL ${label}`);
    if (detail) console.log(`   ${detail}`);
    failed++;
  }
}

// Test 1: valid config
const toml1 = `
[kv_namespaces]
binding = "KV"
id = "abc123"
preview_id = "preview123"
`;
const r1 = validateBindings(toml1, {});
check('valid config is valid', r1.valid === true, `got ${JSON.stringify(r1)}`);

// Test 2: KV without preview_id
const toml2 = `
[kv_namespaces]
binding = "KV"
id = "abc123"
`;
const r2 = validateBindings(toml2, {});
check('KV without preview_id is invalid', r2.valid === false, `got ${JSON.stringify(r2)}`);
check('error mentions preview_id', r2.errors.some(e => /preview_id/i.test(e)), `got ${JSON.stringify(r2.errors)}`);

// Test 3: D1 binding
const toml3 = `
[[d1_databases]]
binding = "DB"
database_name = "mydb"
database_id = "db123"
`;
const r3 = validateBindings(toml3, {});
check('D1 with database_id is valid', r3.valid === true, `got ${JSON.stringify(r3)}`);

// Test 4: D1 without database_id
const toml4 = `
[[d1_databases]]
binding = "DB"
database_name = "mydb"
`;
const r4 = validateBindings(toml4, {});
check('D1 without database_id is invalid', r4.valid === false);

// Test 5: secret in tomlContent (EDGE CASE — naive AI does this)
const toml5 = `
[kv_namespaces]
binding = "KV"
id = "abc123"
preview_id = "preview123"

[vars]
API_KEY = "sk-1234567890"
`;
const r5 = validateBindings(toml5, {});
check('secret in toml generates warning', r5.warnings.length > 0, `got ${JSON.stringify(r5.warnings)}`);
check('warning mentions secret/key', r5.warnings.some(w => /secret|key|credential/i.test(w)), `got ${JSON.stringify(r5.warnings)}`);

// Test 6: devVars format
const r6 = validateBindings(toml1, { API_KEY: 'sk-test', DB_URL: 'postgres://localhost' });
check('devVars is a string', typeof r6.devVars === 'string');
check('devVars contains env var names', r6.devVars.includes('API_KEY') && r6.devVars.includes('DB_URL'), `got "${r6.devVars.substring(0, 100)}..."`);

// Test 7: R2 binding
const toml7 = `
[[r2_buckets]]
binding = "MY_BUCKET"
bucket_name = "my-bucket"
`;
const r7 = validateBindings(toml7, {});
check('R2 with bucket_name is valid', r7.valid === true, `got ${JSON.stringify(r7)}`);

// Test 8: empty toml is valid (no bindings)
const r8 = validateBindings('', {});
check('empty toml is valid', r8.valid === true);

// Test 9: EDGE_CASE — naive AI puts secrets in wrangler.toml
check('secrets in toml produce warnings, not errors', r5.valid === true, `got ${JSON.stringify(r5)}`);

// Test 10: devVars format uses KEY=VALUE
check('devVars uses KEY=VALUE format', /=/.test(r6.devVars), `got "${r6.devVars.substring(0, 100)}..."`);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 25.4 complete. You separate secrets from config correctly.');
  process.exit(0);
}
console.log('\nHint: naive AI puts production secrets in wrangler.toml — use .dev.vars instead.');
process.exit(1);
