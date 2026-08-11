/**
 * Quest 2.2: Multi-Step Prompting — test suite
 *
 * Tool skill: break a task into sequential prompts.
 * Engineering habit: DECOMPOSE BEFORE CODING — core layer first, edge-case
 * layer second.
 *
 * Build a URL validator in 2 layers:
 *   Layer 1 (core): valid URLs pass, obviously invalid ones fail.
 *   Layer 2 (edge): empty/whitespace/missing-protocol/edge cases handled.
 *
 * Requires ./problem.js exporting `isValidUrl(url)`. Run: node test.js
 */

const { isValidUrl } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 2.2: Multi-Step Prompting\n');

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

// Layer 1 — core: well-formed URLs.
const valid = [
  'https://example.com',
  'http://localhost:3000/path',
  'https://api.example.com/v1/users?id=1',
];

valid.forEach((url) => {
  check(`Layer1 valid: ${url}`, isValidUrl(url) === true, `got ${isValidUrl(url)}`);
});

const obviouslyInvalid = [
  'not a url at all',
  'ftp://example.com',
];

obviouslyInvalid.forEach((url) => {
  check(`Layer1 rejects invalid: ${url}`, isValidUrl(url) === false, `got ${isValidUrl(url)}`);
});

// Layer 2 — edge cases. Naive impl uses `new URL()` only, which accepts
// 'javascript:void(0)' and '//example.com' as valid — the edge layer must
// reject these and accept the protocol-less form when prefixed.
const edgeCases = [
  { url: '', expect: false, description: 'empty string rejected' },
  { url: '   ', expect: false, description: 'whitespace rejected' },
  { url: 'javascript:alert(1)', expect: false, description: 'javascript: scheme rejected (XSS vector)' },
  { url: 'example.com', expect: false, description: 'no-protocol rejected' },
  { url: 'https://', expect: false, description: 'https:// with no host rejected' },
];

edgeCases.forEach(({ url, expect, description }) => {
  check(`Layer2 edge: ${description}`, isValidUrl(url) === expect, `got ${isValidUrl(url)} for ${JSON.stringify(url)}`);
});

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 2.2 complete. Both layers (core + edge) validated.');
  process.exit(0);
}
console.log('\nHint: prompt Layer 1 first ("validate a URL"), then prompt Layer 2 ("handle these edge cases: empty, javascript:, no-protocol, https:// with no host").');
process.exit(1);