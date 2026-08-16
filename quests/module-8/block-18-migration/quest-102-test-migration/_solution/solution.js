/**
 * Quest 18.5: Test Migration — REFERENCE solution
 */

function migrateTests(oldTests, changes) {
  if (!oldTests || !changes || changes.length === 0) return oldTests || '';

  let result = oldTests;

  for (const change of changes) {
    switch (change.type) {
      case 'rename': {
        // Word-boundary-aware replacement
        const regex = new RegExp(`\\b${escapeRegex(change.oldName)}\\b`, 'g');
        result = result.replace(regex, change.newName);
        break;
      }
      case 'move': {
        // Update import path
        const pathRegex = new RegExp(`require\\(["'][^"']*["']\\)`, 'g');
        result = result.replace(pathRegex, `require("${change.newPath}")`);
        break;
      }
      case 'remove': {
        // Remove test lines referencing the removed function
        const lines = result.split('\n');
        result = lines.filter(line => !line.includes(change.oldName)).join('\n');
        break;
      }
    }
  }

  return result;
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

module.exports = { migrateTests };
