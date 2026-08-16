/**
 * Quest 16.1: Docstring Generator — REFERENCE solution
 */

function generateDocstring(code) {
  if (!code) return '';

  // Match regular and async functions
  const funcRegex = /^(export\s+)?(async\s+)?function\s+(\w+)\s*\(([^)]*)\)\s*\{/gm;
  // Match arrow functions: const name = (params) => or const name = async (params) =>
  const arrowRegex = /^(export\s+)?(const|let|var)\s+(\w+)\s*=\s*(async\s+)?\(?([^)]*)\)?\s*=>/gm;

  let result = code;

  // Process regular functions (replace from end to preserve indices)
  const funcMatches = [...code.matchAll(funcRegex)].reverse();
  for (const match of funcMatches) {
    const name = match[3];
    const params = match[4].trim();
    const doc = buildDocstring(name, params);
    result = result.slice(0, match.index) + doc + '\n' + result.slice(match.index);
  }

  // Process arrow functions
  const arrowMatches = [...result.matchAll(arrowRegex)].reverse();
  for (const match of arrowMatches) {
    const name = match[3];
    const params = match[5].trim();
    const doc = buildDocstring(name, params);
    result = result.slice(0, match.index) + doc + '\n' + result.slice(match.index);
  }

  return result;
}

function buildDocstring(name, paramsStr) {
  const lines = ['/**'];
  lines.push(` * ${name} function.`);

  if (paramsStr) {
    const params = paramsStr.split(',').map(p => p.trim()).filter(Boolean);
    for (const param of params) {
      const paramName = param.split(':')[0].split('=')[0].trim();
      lines.push(` * @param {any} ${paramName} - ${paramName} parameter`);
    }
  }

  lines.push(' * @returns {any} The result');
  lines.push(' */');
  return lines.join('\n');
}

module.exports = { generateDocstring };
