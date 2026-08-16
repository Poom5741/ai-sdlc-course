/**
 * Quest 16.4: Changelog Generator — test suite
 */

const { generateChangelog } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 16.4: Changelog Generator\n');

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

const commits = [
  { hash: 'abc123', message: 'feat: add user authentication', date: '2024-01-15' },
  { hash: 'def456', message: 'fix: resolve login timeout', date: '2024-01-16' },
  { hash: 'ghi789', message: 'docs: update API reference', date: '2024-01-17' },
  { hash: 'jkl012', message: 'feat!: remove deprecated endpoints', date: '2024-01-18' },
  { hash: 'mno345', message: 'chore: update dependencies', date: '2024-01-19' },
  { hash: 'pqr678', message: 'refactor: extract auth module', date: '2024-01-20' },
];

const changelog = generateChangelog(commits);

// Test 1: Has title
check('has # Changelog', /^# Changelog/m.test(changelog));

// Test 2: Features section
check('has Features section', /##\s+Features/i.test(changelog));
check('feature commit listed', changelog.includes('add user authentication'));

// Test 3: Bug Fixes section
check('has Bug Fixes section', /##\s+Bug Fix/i.test(changelog));
check('fix commit listed', changelog.includes('resolve login timeout'));

// Test 4: Documentation section
check('has Documentation section', /##\s+Doc/i.test(changelog));

// Test 5: EDGE CASE — breaking changes in own section
check('has Breaking Changes section', /breaking/i.test(changelog) || /⚠/.test(changelog),
  `missing breaking changes section`);

// Test 6: Breaking change NOT in Features
const featuresSection = changelog.split(/##/).find(s => /features/i.test(s)) || '';
check('breaking change not in Features', !featuresSection.includes('remove deprecated'),
  `breaking change leaked into Features`);

// Test 7: Hash and date included
check('includes commit hash', changelog.includes('abc123'));
check('includes date', changelog.includes('2024-01-15'));

// Test 8: Empty commits
const empty = generateChangelog([]);
check('empty commits generates valid markdown', /^# Changelog/m.test(empty));

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 16.4 complete. You generate changelogs from conventional commits.');
  process.exit(0);
}
console.log('\nHint: check if feat! (breaking changes) has its own section, not in Features.');
process.exit(1);
