/**
 * Quest 3.1: User Story Generator — test suite
 */
const { generateUserStory } = require('./problem.js');

let passed = 0;
let failed = 0;
console.log('Quest 3.1: User Story Generator\n');

function check(label, cond, detail) {
  if (cond) { console.log(`PASS ${label}`); passed++; }
  else { console.log(`FAIL ${label}`); if (detail) console.log(`   ${detail}`); failed++; }
}

const story = generateUserStory('As a user, I want to login so that I can access my account. Must have email and password fields.');

check('returns asA field', typeof story.asA === 'string' && story.asA.length > 0);
check('returns iWant field', typeof story.iWant === 'string' && story.iWant.length > 0);
check('returns soThat field', typeof story.soThat === 'string' && story.asA.length > 0);
check('returns acceptance criteria array', Array.isArray(story.acceptanceCriteria));
check('has at least one acceptance criteria', story.acceptanceCriteria.length >= 1);

// Edge case: minimal input
const story2 = generateUserStory('need login');
check('handles minimal input', story2.asA.length > 0 || story2.iWant.length > 0);

console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed === 0) { console.log('\nQuest 3.1 complete.'); process.exit(0); }
console.log('\nHint: parse the notes into structured user story format.');
process.exit(1);
