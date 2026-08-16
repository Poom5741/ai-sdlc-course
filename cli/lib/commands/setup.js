// Setup command - validates access code and stores it locally
'use strict';

const { post } = require('../http');
const { saveAccessCode, getApiBase, getConfigPath } = require('../config');

const CODE_PATTERN = /^BBD-[A-Z0-9]{4}-[A-Z0-9]{4}$/i;

function normalizeCode(code) {
  return code.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
}

function formatCode(code) {
  const normalized = normalizeCode(code);
  if (normalized.length < 10) return normalized;
  return `BBD-${normalized.slice(3, 7)}-${normalized.slice(7, 11)}`;
}

async function setup(args) {
  const code = args[0];

  if (!code) {
    console.error('Error: Access code is required');
    console.error('Usage: bluebeltdojo setup <code>');
    console.error('Example: bluebeltdojo setup BBD-XXXX-XXXX');
    process.exit(1);
  }

  const formattedCode = formatCode(code);

  if (!CODE_PATTERN.test(formattedCode)) {
    console.error('Error: Invalid code format');
    console.error('Expected format: BBD-XXXX-XXXX');
    process.exit(1);
  }

  const apiBase = getApiBase();

  console.log(`Validating access code against ${apiBase}...`);

  try {
    const response = await post(`${apiBase}/api/validate-code`, { code: formattedCode });

    if (response.status === 200 && response.data && response.data.valid) {
      saveAccessCode(formattedCode, apiBase);
      console.log('✓ Access code validated and saved!');
      console.log(`  Code: ${formattedCode}`);
      console.log(`  Config: ${getConfigPath()}`);
      if (response.data.plan) {
        console.log(`  Plan: ${response.data.plan}`);
      }
    } else {
      const errorMsg = (response.data && response.data.error) || 'Validation failed';
      console.error(`✗ ${errorMsg}`);
      process.exit(1);
    }
  } catch (error) {
    console.error(`✗ Failed to connect to server: ${error.message}`);
    console.error('  Check your internet connection and try again.');
    process.exit(1);
  }
}

module.exports = setup;
