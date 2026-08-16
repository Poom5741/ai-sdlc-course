/**
 * Quest 5.5: Self-Reflecting Agent — test suite
 * Requires ./problem.js exporting { createSelfReflectingAgent }. Run: node test.js
 */

const { createSelfReflectingAgent } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 5.5: Self-Reflecting Agent\n');

function check(label, cond, detail) {
  if (cond) { console.log(`PASS ${label}`); passed++; } else { console.log(`FAIL ${label}`); if (detail) console.log(`   ${detail}`); failed++; }
}

// Test 1: High quality output
const goodAgent = createSelfReflectingAgent(
  (task) => `Excellent output for ${task}`,
  (output) => output.includes('Excellent') ? 90 : 30
);
const r1 = goodAgent.generate('write code');
check('returns output', r1.output && r1.output.includes('Excellent'));
check('selfScore is 90', r1.selfScore === 90);
check('confidence is high', r1.confidence === 'high');
check('needsHelp is false', r1.needsHelp === false);

// Test 2: Low quality triggers retry (THE EDGE CASE)
let genCount = 0;
const retryAgent = createSelfReflectingAgent(
  (task) => { genCount++; return genCount === 1 ? 'bad output' : 'improved output'; },
  (output) => output.includes('improved') ? 85 : 25
);
const r2 = retryAgent.generate('task');
check('retries when quality is low', r2.selfScore >= 60 || genCount >= 2,
  `naive AI generates once and gives up — genCount: ${genCount}, score: ${r2.selfScore}`);

// Test 3: Very low quality reports needsHelp
const badAgent = createSelfReflectingAgent(
  (task) => 'terrible',
  (output) => 10
);
const r3 = badAgent.generate('task');
check('needsHelp when consistently low', r3.needsHelp === true || r3.selfScore >= 60,
  `confidence: ${r3.confidence}, needsHelp: ${r3.needsHelp}`);

// Test 4: Medium confidence
const medAgent = createSelfReflectingAgent(
  (task) => 'decent output',
  (output) => 65
);
const r4 = medAgent.generate('task');
check('medium confidence for score 50-80', r4.confidence === 'medium');

// Test 5: Structure
check('result has all required fields', ['output', 'selfScore', 'confidence', 'needsHelp'].every(f => r1[f] !== undefined));

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 5.5 complete. Self-reflecting agents retry when quality is low — not just report it.');
  process.exit(0);
}
console.log('\nHint: check the retry test. Naive AI generates once and returns, even if quality is bad.');
process.exit(1);
