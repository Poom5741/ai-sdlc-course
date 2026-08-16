// Download command - downloads quest starter code from GitHub
'use strict';

const fs = require('fs');
const path = require('path');
const https = require('https');

const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/Poom5741/ai-sdlc-course/main/quests';

// Map quest IDs to their directory paths
const QUEST_PATHS = {
  'quest-01-first-completion': 'block-1-ai-tools/quest-01-first-completion',
  'quest-02-multi-file': 'block-1-ai-tools/quest-02-multi-file',
  'quest-03-compare-tools': 'block-1-ai-tools/quest-03-compare-tools',
  'quest-04-fix-prompt': 'block-2-prompt-engineering/quest-04-fix-prompt',
  'quest-05-multi-step': 'block-2-prompt-engineering/quest-05-multi-step',
  'quest-06-domain-specific': 'block-2-prompt-engineering/quest-06-domain-specific',
  'quest-07-spot-vulnerability': 'block-3-security/quest-07-spot-vulnerability',
  'quest-08-fix-harden': 'block-3-security/quest-08-fix-harden',
  'quest-09-security-architecture': 'block-3-security/quest-09-security-architecture',
  'quest-10-setup-loop': 'block-4-agentic-workflows/quest-10-setup-loop',
  'quest-11-generate-review-fix': 'block-4-agentic-workflows/quest-11-generate-review-fix',
  'quest-12-multi-agent': 'block-4-agentic-workflows/quest-12-multi-agent',
  'quest-13-rag-design': 'block-5-architecture/quest-13-rag-design',
  'quest-14-full-system': 'block-5-architecture/quest-14-full-system',
};

// Files to download for each quest
const QUEST_FILES = [
  'package.json',
  'problem.js',
  'test.js',
  'README.md'
];

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        fetchUrl(res.headers.location).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function download(args) {
  const questId = args[0];

  if (!questId) {
    console.error('Error: Quest ID is required');
    console.error('Usage: bluebeltdojo download <quest-id>');
    console.error('Example: bluebeltdojo download quest-01-first-completion');
    console.error('');
    console.error('Run "bluebeltdojo list" to see available quests.');
    process.exit(1);
  }

  const questPath = QUEST_PATHS[questId];
  if (!questPath) {
    console.error(`Error: Unknown quest "${questId}"`);
    console.error('');
    console.error('Available quests:');
    Object.keys(QUEST_PATHS).forEach(id => console.error(`  ${id}`));
    process.exit(1);
  }

  // Create quest directory
  const outDir = path.join(process.cwd(), questId);
  ensureDir(outDir);

  console.log(`Downloading quest: ${questId}...`);

  let downloaded = 0;
  let failed = 0;

  for (const file of QUEST_FILES) {
    const url = `${GITHUB_RAW_BASE}/${questPath}/${file}`;
    const filePath = path.join(outDir, file);

    try {
      const content = await fetchUrl(url);
      fs.writeFileSync(filePath, content);
      downloaded++;
      process.stdout.write(`  ✓ ${file}\n`);
    } catch (error) {
      // Some files may not exist (like _solution/)
      if (error.message.includes('404')) {
        process.stdout.write(`  - ${file} (not available)\n`);
      } else {
        console.error(`  ✗ ${file}: ${error.message}`);
        failed++;
      }
    }
  }

  // Also try to download _solution/solution.js
  const solutionUrl = `${GITHUB_RAW_BASE}/${questPath}/_solution/solution.js`;
  const solutionDir = path.join(outDir, '_solution');
  try {
    const content = await fetchUrl(solutionUrl);
    ensureDir(solutionDir);
    fs.writeFileSync(path.join(solutionDir, 'solution.js'), content);
    process.stdout.write(`  ✓ _solution/solution.js\n`);
  } catch {
    // Solution file is optional
  }

  console.log('');
  if (failed > 0) {
    console.log(`Downloaded ${downloaded} files (${failed} failed)`);
  } else {
    console.log(`✓ Quest downloaded to ./${questId}/`);
  }

  console.log('');
  console.log('Next steps:');
  console.log(`  cd ${questId}`);
  console.log('  # Open problem.js in your editor with AI tools');
  console.log('  # Write your solution');
  console.log('  node test.js  # Test locally');
  console.log('  bluebeltdojo submit  # Submit to server');
}

module.exports = download;
