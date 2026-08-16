/**
 * Quest 26.3: R2 Object Uploader — test suite
 *
 * Run: node test.js
 */

const { planUpload } = require('./problem.js');

let passed = 0;
let failed = 0;

console.log('Quest 26.3: R2 Object Uploader\n');

function check(label, condition, detail) {
  if (condition) {
    console.log(`PASS ${label}`);
    passed++;
  } else {
    console.log(`FAIL ${label}`);
    if (detail) console.log(`   ${detail}`);
    failed++;
  }
}

// Test 1: small file uses single upload
const r1 = planUpload('photo.png', 1024 * 1024, 'image/png'); // 1MB
check('small file uses single strategy', r1.strategy === 'single', `got "${r1.strategy}"`);

// Test 2: small file has presigned URL
check('small file has presignedUrl', typeof r1.presignedUrl === 'string' && r1.presignedUrl.length > 0, `got "${r1.presignedUrl}"`);

// Test 3: large file uses multipart (EDGE CASE — naive AI fails this)
const r2 = planUpload('video.mp4', 50 * 1024 * 1024, 'video/mp4'); // 50MB
check('large file uses multipart strategy', r2.strategy === 'multipart', `got "${r2.strategy}"`);

// Test 4: large file has parts count
check('large file has parts count', typeof r2.parts === 'number' && r2.parts > 0, `got ${r2.parts}`);

// Test 5: 50MB file should have 5 parts (10MB chunks)
check('50MB file has 5 parts', r2.parts === 5, `got ${r2.parts}`);

// Test 6: exact 5MB boundary uses single
const r3 = planUpload('exact.mp4', 5 * 1024 * 1024, 'video/mp4');
check('exact 5MB uses single', r3.strategy === 'single', `got "${r3.strategy}"`);

// Test 7: just over 5MB uses multipart
const r4 = planUpload('over.mp4', 5 * 1024 * 1024 + 1, 'video/mp4');
check('just over 5MB uses multipart', r4.strategy === 'multipart', `got "${r4.strategy}"`);

// Test 8: empty filename returns error
const r5 = planUpload('', 1024, 'image/png');
check('empty filename returns error', r5.errors && r5.errors.length > 0, `got ${JSON.stringify(r5)}`);

// Test 9: zero size returns error
const r6 = planUpload('file.png', 0, 'image/png');
check('zero size returns error', r6.errors && r6.errors.length > 0);

// Test 10: EDGE CASE — naive AI uses single for all files
check('large file definitely not single', r2.strategy !== 'single', `got "${r2.strategy}"`);

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\nQuest 26.3 complete. You handle large file uploads correctly.');
  process.exit(0);
}
console.log('\nHint: naive AI tries single upload for large files — use multipart with 10MB chunks.');
process.exit(1);
