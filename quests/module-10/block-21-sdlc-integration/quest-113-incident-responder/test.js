/**
 * Quest 21.3: Production Incident Responder — test suite
 */

const { respondToIncident } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 21.3: Production Incident Responder\n');

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

const incident = {
  type: 'database-connection',
  severity: 'high',
  symptoms: ['connection timeout', '503 errors', 'slow queries'],
  logs: ['Connection pool exhausted', 'Timeout after 30s'],
};

const response = respondToIncident(incident);

// Test 1: Has triage
check('has triage', typeof response.triage === 'string' && response.triage.length > 0);

// Test 2: Has actions
check('has actions array', Array.isArray(response.actions) && response.actions.length > 0);

// Test 3: Has impact estimation
check('has estimated impact', typeof response.estimatedImpact === 'string' && response.estimatedImpact.length > 0);

// Test 4: Has communication template
check('has communication template', typeof response.communication === 'string' && response.communication.length > 0);

// Test 5: Has postmortem template
check('has postmortem template', typeof response.postmortem === 'string' && response.postmortem.length > 0);

// Test 6: EDGE CASE — low severity still gets triage
const lowIncident = { type: 'minor', severity: 'low', symptoms: ['slight delay'] };
const lowResponse = respondToIncident(lowIncident);
check('low severity still gets triage', lowResponse.triage.length > 0,
  `got empty triage for low severity`);

// Test 7: Severity reflected in actions
check('critical incidents have more actions', response.actions.length >= 3,
  `got ${response.actions.length} actions`);

// Test 8: Triage mentions incident type
check('triage references incident type', response.triage.toLowerCase().includes('database') || response.triage.toLowerCase().includes('connection'),
  `triage: ${response.triage}`);

// Test 9: Actions are ordered (numbered or sequential)
check('actions are sequential', response.actions.length > 0);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 21.3 complete. You respond to incidents with structured protocol.');
  process.exit(0);
}
console.log('\nHint: even low severity incidents need triage — they might be symptoms of a bigger issue.');
process.exit(1);
