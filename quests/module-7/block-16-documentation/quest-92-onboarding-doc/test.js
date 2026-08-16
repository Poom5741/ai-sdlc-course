/**
 * Quest 16.5: Onboarding Doc Writer — test suite
 */

const { generateOnboarding } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 16.5: Onboarding Doc Writer\n');

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

const project = {
  name: 'BlueBeltDojo',
  description: 'An AI-powered coding workshop platform',
  stack: ['Node.js v18', 'Astro', 'Vitest'],
  setup: ['git clone repo', 'npm install', 'npm run dev'],
  conventions: ['Use conventional commits', 'Write tests first'],
  keyFiles: [
    { path: 'src/index.astro', purpose: 'Main page' },
    { path: 'quests/_scaffold/', purpose: 'Quest template' },
  ],
};

const doc = generateOnboarding(project);

// Test 1: Has welcome with project name
check('has welcome with project name', /welcome/i.test(doc) && doc.includes('BlueBeltDojo'));

// Test 2: What is this project
check('has project description', /what is this project/i.test(doc));

// Test 3: Tech stack section
check('has tech stack section', /tech stack/i.test(doc));
check('lists all stack items', doc.includes('Node.js') && doc.includes('Astro'));

// Test 4: Quick start
check('has quick start', /quick start/i.test(doc));
check('includes setup steps', doc.includes('npm install'));

// Test 5: Code conventions
check('has code conventions', /conventions/i.test(doc));

// Test 6: Key files
check('has key files section', /key files/i.test(doc));
check('lists key files', doc.includes('src/index.astro'));

// Test 7: First task suggestions
check('has first task suggestions', /first task/i.test(doc) || /starter task/i.test(doc));

// Test 8: EDGE CASE — stack items should have details, not just names
check('stack items have details', /Node\.js.*v18/i.test(doc),
  `stack should include version details, not just name`);

// Test 9: At least 400 chars
check('substantial content (>400 chars)', doc.length > 400, `got ${doc.length} chars`);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 16.5 complete. You write onboarding docs for newcomers.');
  process.exit(0);
}
console.log('\nHint: check if stack items include version/tool details, not just names.');
process.exit(1);
