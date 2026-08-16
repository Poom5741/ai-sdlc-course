// Progress command - shows quest completion progress from server
'use strict';

const { get } = require('../http');
const { getAccessCode, getApiBase } = require('../config');

const QUEST_NAMES = {
  'quest-01-first-completion': 'First AI Completion',
  'quest-02-multi-file': 'Multi-File Project',
  'quest-03-compare-tools': 'Compare AI Tools',
  'quest-04-fix-prompt': 'Fix a Prompt',
  'quest-05-multi-step': 'Multi-Step Prompting',
  'quest-06-domain-specific': 'Domain-Specific Prompts',
  'quest-07-spot-vulnerability': 'Spot Vulnerability',
  'quest-08-fix-harden': 'Fix & Harden',
  'quest-09-security-architecture': 'Security Architecture',
  'quest-10-setup-loop': 'Setup Loop',
  'quest-11-generate-review-fix': 'Generate-Review-Fix',
  'quest-12-multi-agent': 'Multi-Agent Workflow',
  'quest-13-rag-design': 'RAG Design',
  'quest-14-full-system': 'Full System Design',
};

async function progress() {
  const accessCode = getAccessCode();
  if (!accessCode) {
    console.error('Error: No access code configured');
    console.error('');
    console.error('Run this first:');
    console.error('  bluebeltdojo setup <code>');
    process.exit(1);
  }

  const apiBase = getApiBase();

  try {
    const response = await get(
      `${apiBase}/api/progress?code=${encodeURIComponent(accessCode)}`
    );

    if (response.status !== 200) {
      const errorMsg = (response.data && response.data.error) || 'Failed to fetch progress';
      console.error(`Error: ${errorMsg}`);
      process.exit(1);
    }

    const { quests, stats } = response.data;

    console.log('Quest Progress');
    console.log('='.repeat(60));
    console.log('');

    // Show each quest
    const questIds = Object.keys(QUEST_NAMES);
    for (const questId of questIds) {
      const name = QUEST_NAMES[questId];
      const questProgress = quests[questId];

      if (questProgress && questProgress.completed) {
        console.log(`  ✓ ${name}`);
        console.log(`    Completed: ${new Date(questProgress.submittedAt).toLocaleDateString()}`);
        console.log(`    Attempts: ${questProgress.attempts}`);
      } else if (questProgress && questProgress.attempts > 0) {
        console.log(`  ○ ${name}`);
        console.log(`    Attempts: ${questProgress.attempts} (not yet passed)`);
      } else {
        console.log(`  · ${name}`);
        console.log(`    Not started`);
      }
      console.log('');
    }

    console.log('='.repeat(60));
    console.log('');
    console.log(`Progress: ${stats.completed}/${stats.total} quests completed`);

    if (stats.completed === stats.total) {
      console.log('');
      console.log('🎉 Congratulations! You completed all quests!');
    }

  } catch (error) {
    console.error(`Error: Failed to connect to server: ${error.message}`);
    process.exit(1);
  }
}

module.exports = progress;
