// List command - fetches and displays all available quests
'use strict';

const { get } = require('../http');
const { getApiBase } = require('../config');

const DIFFICULTY_EMOJI = {
  easy: '🟢',
  medium: '🟡',
  hard: '🔴'
};

const BLOCK_NAMES = {
  'block-1-ai-tools': 'Block 1: AI Tools',
  'block-2-prompt-engineering': 'Block 2: Prompting',
  'block-3-security': 'Block 3: Security',
  'block-4-agentic-workflows': 'Block 4: Loops',
  'block-5-architecture': 'Block 5: Architecture'
};

async function list() {
  const apiBase = getApiBase();

  try {
    const response = await get(`${apiBase}/api/quests`);

    if (response.status !== 200) {
      console.error('Failed to fetch quest list from server');
      console.error('Using built-in quest list...');
      printBuiltinList();
      return;
    }

    const quests = response.data;
    if (!Array.isArray(quests) || quests.length === 0) {
      console.error('No quests found');
      return;
    }

    printQuestTable(quests);
  } catch (error) {
    console.error(`Could not connect to server: ${error.message}`);
    console.error('Using built-in quest list...\n');
    printBuiltinList();
  }
}

function printBuiltinList() {
  const quests = [
    { id: 'quest-01-first-completion', title: 'First AI Completion', difficulty: 'easy', block: 'block-1-ai-tools' },
    { id: 'quest-02-multi-file', title: 'Multi-File Project', difficulty: 'easy', block: 'block-1-ai-tools' },
    { id: 'quest-03-compare-tools', title: 'Compare AI Tools', difficulty: 'easy', block: 'block-1-ai-tools' },
    { id: 'quest-04-fix-prompt', title: 'Fix a Prompt', difficulty: 'medium', block: 'block-2-prompt-engineering' },
    { id: 'quest-05-multi-step', title: 'Multi-Step Prompting', difficulty: 'medium', block: 'block-2-prompt-engineering' },
    { id: 'quest-06-domain-specific', title: 'Domain-Specific Prompts', difficulty: 'medium', block: 'block-2-prompt-engineering' },
    { id: 'quest-07-spot-vulnerability', title: 'Spot Vulnerability', difficulty: 'medium', block: 'block-3-security' },
    { id: 'quest-08-fix-harden', title: 'Fix & Harden', difficulty: 'medium', block: 'block-3-security' },
    { id: 'quest-09-security-architecture', title: 'Security Architecture', difficulty: 'medium', block: 'block-3-security' },
    { id: 'quest-10-setup-loop', title: 'Setup Loop', difficulty: 'hard', block: 'block-4-agentic-workflows' },
    { id: 'quest-11-generate-review-fix', title: 'Generate-Review-Fix', difficulty: 'hard', block: 'block-4-agentic-workflows' },
    { id: 'quest-12-multi-agent', title: 'Multi-Agent Workflow', difficulty: 'hard', block: 'block-4-agentic-workflows' },
    { id: 'quest-13-rag-design', title: 'RAG Design', difficulty: 'hard', block: 'block-5-architecture' },
    { id: 'quest-14-full-system', title: 'Full System Design', difficulty: 'hard', block: 'block-5-architecture' },
  ];
  printQuestTable(quests);
}

function printQuestTable(quests) {
  console.log('Available Quests');
  console.log('='.repeat(70));
  console.log('');

  let currentBlock = '';
  for (const quest of quests) {
    if (quest.block !== currentBlock) {
      currentBlock = quest.block;
      const blockName = BLOCK_NAMES[quest.block] || quest.block;
      console.log(`  ${blockName}`);
      console.log('  ' + '-'.repeat(50));
    }

    const emoji = DIFFICULTY_EMOJI[quest.difficulty] || '⚪';
    const num = quest.id.replace('quest-', '').split('-')[0];
    console.log(`  ${emoji} #${num.padStart(2, '0')} ${quest.title}`);
    console.log(`     ID: ${quest.id}`);
    console.log('');
  }

  console.log('='.repeat(70));
  console.log('');
  console.log('Download a quest:');
  console.log('  bluebeltdojo download <quest-id>');
  console.log('');
  console.log('Example:');
  console.log('  bluebeltdojo download quest-01-first-completion');
}

module.exports = list;
