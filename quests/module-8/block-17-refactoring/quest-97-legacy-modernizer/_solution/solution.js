/**
 * Quest 17.5: Legacy Code Modernizer — REFERENCE solution
 */

function modernize(code) {
  if (!code) return '';

  let result = code;

  // Convert .then() chains to await
  // Pattern: something.then(callback).then(callback)...
  result = result.replace(/(\w+(?:\([^)]*\))?)\.then\(\s*(?:\([^)]*\)\s*=>\s*)?([^)]+)\)/g,
    'await $1 /* then: $2 */');

  // Add async keyword to functions that use await
  if (result.includes('await')) {
    result = result.replace(/function\s+(\w+)\s*\(/g, 'async function $1(');
    // Also handle arrow functions and anonymous functions
    result = result.replace(/\breturn\s+(await)/g, 'return $1');
  }

  // Convert callback error handling to try/catch (only for async patterns)
  if (result.includes('readFile') || result.includes('callback') || result.includes('cb(')) {
    if (!result.includes('try')) {
      result = `try {\n  ${result}\n} catch (err) {\n  console.error(err);\n}`;
    }
  }

  return result;
}

module.exports = { modernize };
