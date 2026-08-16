/**
 * Quest 24.5: REFERENCE solution (do NOT read during the exercise)
 *
 * Generates GitHub Actions YAML for CI/CD pipelines.
 */

function generateWorkflow(config) {
  const errors = [];

  if (!config.name) errors.push('workflow name is required');
  if (!config.nodeVersion) errors.push('node version is required');
  if (!config.steps || config.steps.length === 0) errors.push('at least one step is required');

  if (errors.length > 0) {
    return { yaml: '', isValid: false, errors };
  }

  const steps = [];

  // Checkout
  steps.push('      - uses: actions/checkout@v4');

  // Node setup with specified version (not hardcoded!)
  steps.push(`      - uses: actions/setup-node@v4`);
  steps.push(`        with:`);
  steps.push(`          node-version: '${config.nodeVersion}'`);

  // Install
  if (config.steps.includes('install')) {
    steps.push('      - run: npm install');
  }

  // Lint
  if (config.steps.includes('lint')) {
    steps.push('      - run: npm run lint');
  }

  // Test
  if (config.steps.includes('test')) {
    steps.push('      - run: npm test');
  }

  // Build
  if (config.steps.includes('build')) {
    steps.push('      - run: npm run build');
  }

  // Environment variables
  let envBlock = '';
  if (config.envVars && Object.keys(config.envVars).length > 0) {
    envBlock = '\n    env:\n';
    for (const [key, value] of Object.entries(config.envVars)) {
      envBlock += `      ${key}: ${value}\n`;
    }
  }

  // Deploy step
  let deploySteps = '';
  if (config.deploy) {
    if (config.deploy.target === 'pages') {
      deploySteps = `
    deploy:
      runs-on: ubuntu-latest${envBlock}
      steps:
        - uses: actions/checkout@v4
        - uses: actions/setup-node@v4
          with:
            node-version: '${config.nodeVersion}'
        - run: npm install
        - run: npm run build
        - uses: actions/upload-pages-artifact@v3
          with:
            path: ./dist
        - uses: actions/deploy-pages@v4`;
    }
  }

  const yaml = `name: ${config.name}

on:
  push:
    branches: [${config.deploy?.branch || 'main'}]
  pull_request:
    branches: [${config.deploy?.branch || 'main'}]

jobs:
  build:
    runs-on: ubuntu-latest${envBlock}
    steps:
${steps.join('\n')}
${deploySteps}
`;

  return {
    yaml,
    isValid: true,
    errors: [],
  };
}

module.exports = { generateWorkflow };
