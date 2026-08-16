// Test command - runs node test.js in current directory
'use strict';

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function test() {
  const testFile = path.join(process.cwd(), 'test.js');

  if (!fs.existsSync(testFile)) {
    console.error('Error: test.js not found in current directory');
    console.error('');
    console.error('Make sure you are in a quest directory.');
    console.error('Run "bluebeltdojo download <quest-id>" to get quest files.');
    process.exit(1);
  }

  console.log('Running tests...');
  console.log('');

  try {
    const output = execSync('node test.js', {
      cwd: process.cwd(),
      stdio: 'inherit',
      timeout: 30000
    });
    // If we get here, tests passed (exit code 0)
    process.exit(0);
  } catch (error) {
    // execSync throws on non-zero exit code
    // The output was already streamed to stdout/stderr via stdio: 'inherit'
    process.exit(error.status || 1);
  }
}

module.exports = test;
