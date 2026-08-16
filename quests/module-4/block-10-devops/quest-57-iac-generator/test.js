/**
 * Quest 4.15: IaC Generator — test suite
 * Requires ./problem.js exporting { generateIaC }. Run: node test.js
 */

const { generateIaC } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 4.15: IaC Generator\n');

function check(label, cond, detail) {
  if (cond) { console.log(`PASS ${label}`); passed++; } else { console.log(`FAIL ${label}`); if (detail) console.log(`   ${detail}`); failed++; }
}

const result = generateIaC({
  provider: 'aws',
  resources: [
    { type: 'aws_instance', name: 'web', config: { instance_type: 't3.micro', ami: 'ami-123' } },
    { type: 'aws_db_instance', name: 'main', config: { engine: 'postgres', password: 'secret123' } },
  ],
});

check('returns a string', typeof result === 'string');
check('has provider block', /provider\s+"aws"/.test(result));
check('has resource blocks', /resource\s+"aws_instance"\s+"web"/.test(result));
check('has db resource', /resource\s+"aws_db_instance"\s+"main"/.test(result));

// THE EDGE CASE: sensitive data must use variables
check('uses variables for sensitive values',
  /var\.\w+/.test(result) || /variable\s+"/.test(result),
  `naive hardcodes passwords — got: ${result.slice(0, 200)}`);

check('does NOT hardcode password',
  !/password\s*=\s*"secret123"/.test(result),
  `password is hardcoded! Must use variable`);

check('has variable declaration', /variable\s+"/.test(result));

check('has outputs', /output\s+"/.test(result));

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 4.15 complete. You generate IaC — with variables for secrets, never hardcodes.');
  process.exit(0);
}
console.log('\nHint: check if passwords are hardcoded. Naive AI puts secrets directly in resource blocks.');
process.exit(1);
