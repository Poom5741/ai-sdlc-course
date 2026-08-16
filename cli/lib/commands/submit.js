// Submit command - runs tests locally, then submits to server
'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { post } = require('../http');
const { getAccessCode, getApiBase } = require('../config');

function getQuestMetadata() {
  const pkgPath = path.join(process.cwd(), 'package.json');
  if (!fs.existsSync(pkgPath)) {
    return null;
  }
  try {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    return pkg.quest || null;
  } catch {
    return null;
  }
}

function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch {
    return null;
  }
}

async function submit(args, flags) {
  // Check access code
  const accessCode = getAccessCode();
  if (!accessCode) {
    console.error('Error: No access code configured');
    console.error('');
    console.error('Run this first:');
    console.error('  bluebeltdojo setup <code>');
    process.exit(1);
  }

  // Get quest metadata
  const questMeta = getQuestMetadata();
  if (!questMeta || !questMeta.id) {
    console.error('Error: Could not detect quest ID');
    console.error('');
    console.error('Make sure you are in a quest directory with a package.json');
    console.error('that has a "quest" field with an "id" property.');
    process.exit(1);
  }

  const questId = questMeta.id;
  console.log(`Submitting quest: ${questId}`);
  console.log('');

  // Run tests locally first
  console.log('Running tests locally...');
  console.log('');

  let testOutput = '';
  let testsPassed = false;

  try {
    testOutput = execSync('node test.js', {
      cwd: process.cwd(),
      encoding: 'utf-8',
      timeout: 30000
    });
    testsPassed = true;
  } catch (error) {
    testOutput = error.stdout || error.stderr || error.message;
    testsPassed = false;
  }

  // Show test output
  console.log(testOutput);

  if (!testsPassed) {
    console.log('');
    console.log('✗ Tests failed. Fix your solution and try again.');
    console.log('  Submission was NOT sent to the server.');
    process.exit(1);
  }

  // Read problem.js
  const problemContent = readFile('problem.js');
  if (!problemContent) {
    console.error('Error: Could not read problem.js');
    process.exit(1);
  }

  // Check for .quest-completed file
  const completedFile = path.join(process.cwd(), '.quest-completed');
  if (fs.existsSync(completedFile) && !flags.force) {
    console.log('');
    console.log('This quest was already completed.');
    console.log('Use --force to resubmit.');
    process.exit(0);
  }

  // Submit to server
  console.log('');
  console.log('Submitting to server...');

  const apiBase = getApiBase();

  try {
    const response = await post(
      `${apiBase}/api/submit`,
      {
        questId,
        files: { 'problem.js': problemContent },
        clientTestOutput: testOutput
      },
      {
        'Authorization': `Bearer ${accessCode}`
      }
    );

    if (response.status === 200 && response.data && response.data.success) {
      const result = response.data;

      if (result.passed) {
        console.log('');
        console.log('✓ Solution submitted and passed!');
        console.log(`  Submission ID: ${result.submissionId}`);

        // Create .quest-completed file
        fs.writeFileSync(completedFile, JSON.stringify({
          questId,
          submittedAt: new Date().toISOString(),
          submissionId: result.submissionId
        }, null, 2) + '\n');
      } else {
        console.log('');
        console.log('✗ Solution submitted but did not pass server validation.');
        console.log('  Check your test output above for details.');
      }
    } else {
      const errorMsg = (response.data && response.data.error) || 'Submission failed';
      console.error('');
      console.error(`✗ ${errorMsg}`);
      process.exit(1);
    }
  } catch (error) {
    console.error('');
    console.error(`✗ Failed to connect to server: ${error.message}`);
    console.error('  Your solution was NOT submitted.');
    process.exit(1);
  }
}

module.exports = submit;
