#!/usr/bin/env node
// BlueBeltDojo CLI - Quest Submission Tool
// Zero-dependency Node.js CLI for the AI SDLC Workshop
'use strict';

const setup = require('../lib/commands/setup');
const download = require('../lib/commands/download');
const test = require('../lib/commands/test');
const list = require('../lib/commands/list');
const submit = require('../lib/commands/submit');
const progress = require('../lib/commands/progress');

const VERSION = '1.0.0';

const HELP = `
BlueBeltDojo CLI v${VERSION}

Usage:
  bluebeltdojo <command> [options]

Commands:
  setup <code>          Validate and save your access code
  download <quest-id>   Download quest starter code
  test                  Run tests in current directory
  submit                Submit your solution to the server
  progress              View your quest completion progress
  list                  List all available quests
  help                  Show this help message

Options:
  --help, -h            Show help for a command
  --version, -v         Show version

Examples:
  bluebeltdojo setup BBD-XXXX-XXXX
  bluebeltdojo list
  bluebeltdojo download quest-01-first-completion
  cd quest-01-first-completion
  bluebeltdojo test
  bluebeltdojo submit

For more information, visit: https://bluebeltdojo.ai
`;

const COMMANDS = {
  setup,
  download,
  test,
  list,
  submit,
  progress,
};

function parseArgs(argv) {
  const args = [];
  const flags = {};

  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--help' || arg === '-h') {
      flags.help = true;
    } else if (arg === '--version' || arg === '-v') {
      flags.version = true;
    } else if (arg === '--force') {
      flags.force = true;
    } else if (arg.startsWith('-')) {
      // Unknown flag
      args.push(arg);
    } else {
      args.push(arg);
    }
  }

  return { args, flags };
}

function showHelp(command) {
  if (command && COMMANDS[command]) {
    // Show command-specific help
    const helpText = {
      setup: 'Usage: bluebeltdojo setup <code>\n\nValidate and save your access code locally.\n\nExample: bluebeltdojo setup BBD-XXXX-XXXX',
      download: 'Usage: bluebeltdojo download <quest-id>\n\nDownload quest starter code to a new directory.\n\nRun "bluebeltdojo list" to see available quests.',
      test: 'Usage: bluebeltdojo test\n\nRun tests in the current directory.\n\nExpects test.js in the current directory.',
      submit: 'Usage: bluebeltdojo submit [--force]\n\nSubmit your solution to the server.\n\nRuns tests locally first. Only submits if tests pass.\nUse --force to resubmit.',
      progress: 'Usage: bluebeltdojo progress\n\nView your quest completion progress.',
      list: 'Usage: bluebeltdojo list\n\nList all available quests.',
    };
    console.log(helpText[command] || `No help available for "${command}"`);
  } else {
    console.log(HELP);
  }
}

async function main() {
  const { args, flags } = parseArgs(process.argv);

  if (flags.version) {
    console.log(`bluebeltdojo v${VERSION}`);
    return;
  }

  const command = args[0];
  const commandArgs = args.slice(1);

  if (!command || command === 'help') {
    if (flags.help && commandArgs[0]) {
      showHelp(commandArgs[0]);
    } else {
      showHelp();
    }
    return;
  }

  if (flags.help) {
    showHelp(command);
    return;
  }

  if (!COMMANDS[command]) {
    console.error(`Unknown command: ${command}`);
    console.error('');
    console.error('Run "bluebeltdojo help" to see available commands.');
    process.exit(1);
  }

  try {
    await COMMANDS[command](commandArgs, flags);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

main();
