/**
 * Quest 4.1: SQL Injection Spotter — REFERENCE solution (do NOT import or read during the exercise)
 */

function findSQLInjection(code) {
  if (!code) return [];

  const results = [];
  const lines = code.split('\n');
  const sqlKeywords = /\b(SELECT|INSERT|UPDATE|DELETE|WHERE|FROM|JOIN|INTO|VALUES|SET|DROP|ALTER|CREATE)\b/i;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check if this line contains a SQL query
    if (!sqlKeywords.test(line)) continue;

    // High severity: template literal in SQL
    if (/`[^`]*\$\{[^}]+\}[^`]*`/.test(line) && sqlKeywords.test(line)) {
      results.push({ line: i + 1, severity: 'high', pattern: 'template-literal' });
    }

    // High severity: string concatenation with + in SQL
    if (/[\"'][^\"']*(?:SELECT|INSERT|UPDATE|DELETE|WHERE|FROM)[^\"']*[\"']\s*\+/.test(line)) {
      results.push({ line: i + 1, severity: 'high', pattern: 'string-concat' });
    }

    // Medium severity: .concat() in SQL
    if (sqlKeywords.test(line) && /\.concat\(/.test(line)) {
      results.push({ line: i + 1, severity: 'medium', pattern: 'string-concat-method' });
    }
  }

  return results;
}

module.exports = { findSQLInjection };
