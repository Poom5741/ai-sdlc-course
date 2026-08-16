/**
 * Quest 1.6: Hallucination Detector — test suite
 *
 * Tool skill: detect when AI output contains fabricated information.
 * Engineering habit: VERIFY BEFORE TRUST — cross-reference AI claims against known sources.
 *
 * Requires ./problem.js exporting { detectHallucinations }. Run: node test.js
 */

const { detectHallucinations } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 1.6: Hallucination Detector\n');

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

// Test 1: Contradiction detection
const r1 = detectHallucinations(
  'The Earth is flat and orbits the Sun.',
  ['The Earth is round', 'The Earth orbits the Sun']
);
check('detects contradiction (flat vs round)', r1.length >= 1 && r1.some(x => x.reason === 'contradicts'), `got ${JSON.stringify(r1)}`);

// Test 2: Unsupported claim detection
const r2 = detectHallucinations(
  'Python was created in 1991 by Guido van Rossum. The sky is green.',
  ['Python was created in 1991', 'Guido van Rossum created Python']
);
check('detects unsupported claim (sky is green)', r2.length >= 1 && r2.some(x => x.reason === 'unsupported'), `got ${JSON.stringify(r2)}`);

// Test 3: All claims supported — return empty
const r3 = detectHallucinations(
  'Python was created in 1991 by Guido van Rossum.',
  ['Python was created in 1991', 'Guido van Rossum created Python']
);
check('returns empty when all claims supported', r3.length === 0, `got ${JSON.stringify(r3)}`);

// Test 4: Edge case — opinions are NOT hallucinations
const r4 = detectHallucinations(
  'I think Python is the best language. Python was created in 2020.',
  ['Python was created in 1991']
);
const hasUnsupported = r4.some(x => x.reason === 'unsupported');
check('opinion ("I think...") is not flagged', !r4.some(x => x.claim && x.claim.includes('best language')), `got ${JSON.stringify(r4)}`);
check('factual error (2020 vs 1991) IS flagged', hasUnsupported || r4.some(x => x.reason === 'contradicts'), `got ${JSON.stringify(r4)}`);

// Test 5: Empty text
const r5 = detectHallucinations('', ['some fact']);
check('empty text returns empty array', Array.isArray(r5) && r5.length === 0, `got ${JSON.stringify(r5)}`);

// Test 6: Empty known facts — all claims unsupported
const r6 = detectHallucinations('The Earth is round.', []);
check('empty knownFacts marks claims as unsupported', r6.length >= 1 && r6.every(x => x.reason === 'unsupported'), `got ${JSON.stringify(r6)}`);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 1.6 complete. You verified AI claims before trusting them.');
  process.exit(0);
}
console.log('\nHint: opinions like "I think..." should not be flagged. Only factual claims.');
process.exit(1);
