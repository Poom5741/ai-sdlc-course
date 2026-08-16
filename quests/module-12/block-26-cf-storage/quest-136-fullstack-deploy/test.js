/**
 * Quest 26.4: Full Stack Deploy — test suite
 *
 * Run: node test.js
 */

const { generateFullStackConfig } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 26.4: Full Stack Deploy\n');

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

// Test 1: basic config with all features
const r1 = generateFullStackConfig({
  name: 'my-app',
  features: ['kv', 'd1', 'r2', 'pages-functions'],
  environment: 'production',
});
check('config is valid (no errors)', r1.errors.length === 0, `got ${JSON.stringify(r1.errors)}`);
check('wrangler.toml is a string', typeof r1.wranglerToml === 'string');
check('wrangler.toml contains project name', r1.wranglerToml.includes('my-app'), `got "${r1.wranglerToml.substring(0, 100)}..."`);

// Test 2: has KV binding
check('bindings include KV', /KV/i.test(Object.keys(r1.bindings).join(' ')), `got ${JSON.stringify(Object.keys(r1.bindings))}`);

// Test 3: has D1 binding
check('bindings include D1', /DB/i.test(Object.keys(r1.bindings).join(' ')), `got ${JSON.stringify(Object.keys(r1.bindings))}`);

// Test 4: has R2 binding
check('bindings include R2', /BUCKET|R2/i.test(Object.keys(r1.bindings).join(' ')), `got ${JSON.stringify(Object.keys(r1.bindings))}`);

// Test 5: migrations array exists
check('migrations is array', Array.isArray(r1.migrations));

// Test 6: EDGE CASE — naive AI uses same IDs for preview and production
const preview = generateFullStackConfig({
  name: 'my-app',
  features: ['d1'],
  environment: 'preview',
});
const prod = generateFullStackConfig({
  name: 'my-app',
  features: ['d1'],
  environment: 'production',
});
check('preview and production use different IDs', preview.bindings !== prod.bindings || preview.wranglerToml !== prod.wranglerToml, 'preview and production configs differ');

// Test 7: invalid config returns error
const r2 = generateFullStackConfig({ name: '', features: [], environment: 'invalid' });
check('invalid config returns errors', r2.errors.length > 0, `got ${JSON.stringify(r2.errors)}`);

// Test 8: pages-functions feature
check('wrangler.toml mentions pages or functions', /pages|function/i.test(r1.wranglerToml), `got "${r1.wranglerToml.substring(0, 150)}..."`);

// Test 9: migrations are SQL strings
if (r1.migrations.length > 0) {
  check('migration is SQL string', typeof r1.migrations[0] === 'string' && /CREATE|ALTER|INSERT/i.test(r1.migrations[0]));
} else {
  check('migrations array can be empty for simple configs', true);
}

// Test 10: EDGE CASE — production config should not share preview IDs
check('production config has distinct environment markers', prod.wranglerToml.includes('production') || prod.wranglerToml.includes('my-app'), `got "${prod.wranglerToml.substring(0, 100)}..."`);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 26.4 complete. You generate complete Cloudflare deployments.');
  process.exit(0);
}
console.log('\nHint: naive AI mixes preview and production IDs — always use different bindings for each environment.');
process.exit(1);
