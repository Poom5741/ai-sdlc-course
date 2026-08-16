/**
 * Quest 17.2: Dead Code Eliminator — REFERENCE solution
 */

function findDeadCode(code) {
  if (!code) return [];
  const results = [];

  // Extract exports
  const exportMatch = code.match(/module\.exports\s*=\s*\{([^}]*)\}/);
  const exported = new Set();
  if (exportMatch) {
    exportMatch[1].split(',').forEach(s => {
      const name = s.trim().split(':')[0].trim();
      if (name) exported.add(name);
    });
  }

  // Find function declarations
  const funcRegex = /function\s+(\w+)\s*\(/g;
  let m;
  while ((m = funcRegex.exec(code)) !== null) {
    const name = m[1];
    if (exported.has(name)) continue;
    // Check if used elsewhere (not in its own declaration)
    const afterDecl = code.substring(m.index + m[0].length);
    const beforeDecl = code.substring(0, m.index);
    const usedInCode = afterDecl.includes(name) || beforeDecl.includes(name);
    // Simple check: if name appears only in declaration, it's unused
    const occurrences = code.split(name).length - 1;
    if (occurrences <= 1) {
      results.push({ name, type: 'function' });
    }
  }

  // Find variable declarations
  const varRegex = /(?:const|let|var)\s+(\w+)\s*=/g;
  while ((m = varRegex.exec(code)) !== null) {
    const name = m[1];
    if (exported.has(name)) continue;
    const afterDecl = code.substring(m.index + m[0].length);
    if (!afterDecl.includes(name)) {
      results.push({ name, type: 'variable' });
    }
  }

  // Find require imports
  const importRegex = /(?:const|let|var)\s+(\w+)\s*=\s*require\(/g;
  while ((m = importRegex.exec(code)) !== null) {
    const name = m[1];
    // Extract all identifiers from the code (excluding strings)
    const codeNoStrings = code.replace(/["'][^"']*["']/g, '""');
    const identifiers = codeNoStrings.match(/\b\w+\b/g) || [];
    const nameCount = identifiers.filter(id => id === name).length;
    // If name appears only once (in its declaration), it's unused
    if (nameCount <= 1) {
      results.push({ name, type: 'import' });
    }
  }

  return results;
}

module.exports = { findDeadCode };
