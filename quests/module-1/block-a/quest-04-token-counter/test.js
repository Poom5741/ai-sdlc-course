/**
 * Quest 1.4: Token Counter — test suite
 *
 * Tool skill: count tokens in text to manage context window usage.
 * Engineering habit: MEASURE BEFORE YOU OPTIMIZE — know how many tokens
 * your prompts consume before trying to reduce them.
 *
 * Requires ./problem.js exporting { countTokens }. Run: node test.js
 */

const { countTokens } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 1.4: Token Counter\n');

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

// Basic cases
check('empty string returns 0', countTokens('') === 0, `got ${countTokens('')}`);
check('single word', countTokens('hello') === 1, `got ${countTokens('hello')}`);
check('two words', countTokens('hello world') === 2, `got ${countTokens('hello world')}`);
check('three words', countTokens('one two three') === 3, `got ${countTokens('one two three')}`);

// Punctuation edge cases — naive tokenizers merge "hello," into 1 token
check(
  'punctuation counts as separate token: "hello," = 2',
  countTokens('hello,') === 2,
  `got ${countTokens('hello,')} for "hello,"`,
);
check(
  'punctuation + space: "hello, world" = 3',
  countTokens('hello, world') === 3,
  `got ${countTokens('hello, world')} for "hello, world"`,
);
check(
  'multiple punctuation: "wow!!" = 2',
  countTokens('wow!!') === 2,
  `got ${countTokens('wow!!')} for "wow!!"`,
);

// Whitespace edge case — naive impl returns 0 for " "
check(
  'single space returns 1 (not 0)',
  countTokens(' ') === 1,
  `got ${countTokens(' ')} for " "`,
);
check(
  'multiple spaces returns count',
  countTokens('  ') === 2,
  `got ${countTokens('  ')} for "  "`,
);

// Longer sentence
check(
  'sentence: "The quick brown fox" = 4',
  countTokens('The quick brown fox') === 4,
  `got ${countTokens('The quick brown fox')}`,
);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 1.4 complete. You measured tokens before optimizing.');
  process.exit(0);
}
console.log('\nHint: check the punctuation and single-space edge cases. Naive tokenizers get them wrong.');
process.exit(1);
