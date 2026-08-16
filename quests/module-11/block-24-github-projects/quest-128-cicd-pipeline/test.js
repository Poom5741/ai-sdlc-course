/**
 * Quest 24.5: CI/CD Pipeline Configurator — test suite
 *
 * Run: node test.js
 */

const { generateWorkflow } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 24.5: CI/CD Pipeline Configurator\n');

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

// Test 1: basic workflow
const r1 = generateWorkflow({ name: 'CI', nodeVersion: '20', steps: ['install', 'test'] });
check('workflow is valid', r1.isValid === true, `got ${JSON.stringify(r1)}`);
check('yaml contains runs-on', /runs-on:\s*ubuntu-latest/.test(r1.yaml), `got "${r1.yaml.substring(0, 100)}..."`);

// Test 2: correct node version (EDGE CASE — naive AI uses hardcoded '16')
check('yaml contains node version 20', /node-version:\s*['"]?20['"]?/.test(r1.yaml), `got "${r1.yaml.substring(0, 100)}..."`);

// Test 3: contains install step
check('yaml contains install step', /install/i.test(r1.yaml), `got "${r1.yaml.substring(0, 100)}..."`);

// Test 4: contains test step
check('yaml contains test step', /test/i.test(r1.yaml));

// Test 5: all steps present
const r2 = generateWorkflow({ name: 'Full CI', nodeVersion: '18', steps: ['install', 'lint', 'test', 'build'] });
check('all 4 steps present', r2.yaml.includes('install') && r2.yaml.includes('lint') && r2.yaml.includes('test') && r2.yaml.includes('build'));

// Test 6: env vars
const r3 = generateWorkflow({
  name: 'Deploy',
  nodeVersion: '20',
  steps: ['install', 'build'],
  envVars: { NODE_ENV: 'production', API_URL: 'https://api.example.com' },
});
check('env vars included in yaml', /NODE_ENV/.test(r3.yaml) && /API_URL/.test(r3.yaml), `got "${r3.yaml.substring(0, 150)}..."`);

// Test 7: deploy to pages
const r4 = generateWorkflow({
  name: 'Deploy Pages',
  nodeVersion: '20',
  steps: ['install', 'build'],
  deploy: { target: 'pages', branch: 'main' },
});
check('deploy target referenced', /pages|deploy/i.test(r4.yaml), `got "${r4.yaml.substring(0, 150)}..."`);

// Test 8: errors array is populated when invalid
const r5 = generateWorkflow({ name: '', nodeVersion: '', steps: [] });
check('invalid config has errors', r5.errors.length > 0, `got ${JSON.stringify(r5.errors)}`);

// Test 9: yaml is string
check('yaml is a string', typeof r1.yaml === 'string');

// Test 10: EDGE CASE — node version 16 is outdated, should use specified version
const r6 = generateWorkflow({ name: 'CI', nodeVersion: '22', steps: ['install', 'test'] });
check('yaml uses specified node version 22, not hardcoded 16', /node-version:\s*['"]?22['"]?/.test(r6.yaml), `got "${r6.yaml.substring(0, 100)}..."`);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 24.5 complete. You generate correct CI/CD pipelines.');
  process.exit(0);
}
console.log('\nHint: naive AI hardcodes node version "16" — use the specified version from config.');
process.exit(1);
