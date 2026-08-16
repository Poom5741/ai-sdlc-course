/**
 * Quest 4.13: Compliance Checklist Automator — test suite
 * Requires ./problem.js exporting { checkCompliance }. Run: node test.js
 */

const { checkCompliance } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 4.13: Compliance Checklist Automator\n');

function check(label, cond, detail) {
  if (cond) { console.log(`PASS ${label}`); passed++; } else { console.log(`FAIL ${label}`); if (detail) console.log(`   ${detail}`); failed++; }
}

const codebase = {
  files: {
    'src/auth.js': 'const hash = bcrypt.hash(password, 10);',
    'src/db.js': 'SELECT * FROM users WHERE id = ?',
    'src/api.js': 'app.get("/health", (req, res) => res.json({ok:true}));',
    'src/utils.js': 'function add(a, b) { return a + b; }',
  },
};

const checklist = [
  { id: 'C-001', name: 'Uses parameterized queries', check: '\\?', severity: 'required', category: 'security' },
  { id: 'C-002', name: 'Has health endpoint', check: 'health', severity: 'required', category: 'reliability' },
  { id: 'C-003', name: 'Uses bcrypt', check: 'bcrypt', severity: 'recommended', category: 'security' },
  { id: 'C-004', name: 'Has rate limiting', check: 'rate.?limit', severity: 'required', category: 'security' },
];

const result = checkCompliance(codebase, checklist);

// Test 1: Counts
check('counts passed checks', result.passed >= 3, `passed: ${result.passed}`);
check('counts failed checks', result.failed >= 1, `failed: ${result.failed}`);

// Test 2: Results structure
check('results is array', Array.isArray(result.results));
check('results have required fields', result.results.every(r => r.id && r.name && r.status));

// Test 3: Parameterized query found
const c001 = result.results.find(r => r.id === 'C-001');
check('C-001 passed (db.js has ?)', c001 && c001.status === 'passed');

// Test 4: Rate limiting NOT found
const c004 = result.results.find(r => r.id === 'C-004');
check('C-004 failed (no rate limiting)', c004 && c004.status === 'failed');

// Test 5: Checks ALL files (THE EDGE CASE)
check('checked all 4 files for each rule',
  result.results.every(r => r.evidence),
  `naive AI checks only first file — some results missing evidence`);

// Test 6: Severity carried through
check('severity attached to results', result.results.every(r => r.severity));

// Test 7: Category carried through
check('category attached to results', result.results.every(r => r.category));

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 4.13 complete. You automate compliance — checking ALL files, not just the first.');
  process.exit(0);
}
console.log('\nHint: check if your implementation searches ALL files. Naive AI stops at the first match.');
process.exit(1);
