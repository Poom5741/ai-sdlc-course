/**
 * Quest 5.3: Multi-Agent Debate System — test suite
 * Requires ./problem.js exporting { debate }. Run: node test.js
 */

const { debate } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 5.3: Multi-Agent Debate System\n');

function check(label, cond, detail) {
  if (cond) { console.log(`PASS ${label}`); passed++; } else { console.log(`FAIL ${label}`); if (detail) console.log(`   ${detail}`); failed++; }
}

const agents = [
  { name: 'Agent-A', stance: 'pro', argue: (h) => `Argument for (round ${h.length + 1})` },
  { name: 'Agent-B', stance: 'con', argue: (h) => `Argument against (round ${h.length + 1})` },
];

// Test 1: Debate runs
const result = debate(agents, 'Should we use AI for code review?', 2);
check('returns rounds array', Array.isArray(result.rounds));
check('has at least 2 rounds of arguments', result.rounds.length >= 2);

// Test 2: Each agent argues each round
check('each agent argues in first round',
  result.rounds.filter(r => r.round === 1).length === 2);

// Test 3: Agents see history
const agentsWithHistory = [
  { name: 'A', stance: 'pro', argue: (h) => h.length > 0 ? 'counter' : 'first' },
  { name: 'B', stance: 'con', argue: (h) => h.length > 0 ? 'counter' : 'first' },
];
const r2 = debate(agentsWithHistory, 'topic', 2);
check('agents receive history', r2.rounds.some(r => r.argument === 'counter'));

// Test 4: Max rounds respected
const r3 = debate(agents, 'topic', 1);
check('respects maxRounds', r3.rounds.length <= 2);

// Test 5: Consensus tracking
check('consensus is boolean', typeof result.consensus === 'boolean');

// Test 6: Winner tracking (THE EDGE CASE)
const convincedAgents = [
  { name: 'A', stance: 'pro', argue: (h) => 'I am right' },
  { name: 'B', stance: 'con', argue: (h) => h.length >= 2 ? 'I concede' : 'No way' },
];
const r4 = debate(convincedAgents, 'topic', 3);
check('tracks winner when one agent convinces others',
  r4.winner !== null || r4.consensus === true,
  `naive AI doesn't track who won — winner: ${r4.winner}`);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 5.3 complete. Adversarial agents surface flaws — and you track who won.');
  process.exit(0);
}
console.log('\nHint: check the winner tracking. Naive AI collects arguments but ignores who convinced whom.');
process.exit(1);
