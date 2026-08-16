/**
 * Quest 25.1: Pages Deployment — test suite
 *
 * Run: node test.js
 */

const { generateWranglerConfig } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 25.1: Pages Deployment\n');

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

// Test 1: basic config
const r1 = generateWranglerConfig('my-app', 'npm run build', 'dist');
check('config is valid', r1.isValid === true, `got ${JSON.stringify(r1)}`);
check('toml contains project name', r1.toml.includes('my-app'), `got "${r1.toml.substring(0, 100)}..."`);

// Test 2: toml contains build command
check('toml contains build_command', /build_command/i.test(r1.toml), `got "${r1.toml.substring(0, 100)}..."`);

// Test 3: toml contains output dir
check('toml contains output_dir', /output_dir/i.test(r1.toml), `got "${r1.toml.substring(0, 100)}..."`);

// Test 4: EDGE CASE — naive AI uses "dist" even when "build" is specified
const r2 = generateWranglerConfig('another-app', 'npm run build', 'build');
check('output_dir uses specified "build", not hardcoded "dist"', /output_dir\s*=\s*["']?build["']?/i.test(r2.toml), `got "${r2.toml.substring(0, 100)}..."`);

// Test 5: different output dir
const r3 = generateWranglerConfig('jekyll-site', 'jekyll build', '_site');
check('output_dir uses specified "_site"', /output_dir\s*=\s*["']?_site["']?/i.test(r3.toml), `got "${r3.toml.substring(0, 100)}..."`);

// Test 6: empty project name is invalid
const r4 = generateWranglerConfig('', 'npm run build', 'dist');
check('empty project name is invalid', r4.isValid === false, `got ${JSON.stringify(r4)}`);

// Test 7: empty output dir is invalid
const r5 = generateWranglerConfig('app', 'npm run build', '');
check('empty output dir is invalid', r5.isValid === false);

// Test 8: errors array populated
check('errors contain descriptions', r4.errors.length > 0, `got ${JSON.stringify(r4.errors)}`);

// Test 9: toml is string
check('toml is a string', typeof r1.toml === 'string');

// Test 10: toml has proper TOML structure
check('toml contains [project] section', /\[project\]/.test(r1.toml), `got "${r1.toml.substring(0, 100)}..."`);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 25.1 complete. You configure Cloudflare Pages deployment correctly.');
  process.exit(0);
}
console.log('\nHint: naive AI hardcodes output dir as "dist" — use the specified outputDir.');
process.exit(1);
