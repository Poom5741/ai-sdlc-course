// Config management for ~/.bluebeltdojo/config.json
'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');

const CONFIG_DIR = path.join(os.homedir(), '.bluebeltdojo');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

const DEFAULT_API_BASE = 'https://bluebeltdojo.ai';

function getConfigPath() {
  return CONFIG_FILE;
}

function getConfigDir() {
  return CONFIG_DIR;
}

function ensureConfigDir() {
  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });
  }
}

function readConfig() {
  try {
    if (!fs.existsSync(CONFIG_FILE)) {
      return null;
    }
    const data = fs.readFileSync(CONFIG_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
}

function writeConfig(config) {
  ensureConfigDir();
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2) + '\n');
}

function getAccessCode() {
  const config = readConfig();
  return config ? config.accessCode : null;
}

function getApiBase() {
  const config = readConfig();
  if (config && config.apiBase) return config.apiBase;
  return process.env.BLUEBELTDOJO_API || DEFAULT_API_BASE;
}

function saveAccessCode(code, apiBase) {
  const config = readConfig() || {};
  config.accessCode = code;
  if (apiBase) config.apiBase = apiBase;
  config.codeValidatedAt = new Date().toISOString();
  writeConfig(config);
}

module.exports = {
  getConfigPath,
  getConfigDir,
  readConfig,
  writeConfig,
  getAccessCode,
  getApiBase,
  saveAccessCode,
  DEFAULT_API_BASE
};
