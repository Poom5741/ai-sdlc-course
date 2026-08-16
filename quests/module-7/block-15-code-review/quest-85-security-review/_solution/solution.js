/**
 * Quest 15.3: Security Review Automator — REFERENCE solution
 */

function securityReview(code) {
  if (!code) return [];
  const results = [];
  const lines = code.split('\n');

  lines.forEach((line, i) => {
    const trimmed = line.trim();

    // Hardcoded secrets — but NOT destructured imports or variable references
    if (/(?:password|secret|api_key|token)\s*=\s*["'][^"']+["']/.test(trimmed) &&
        !/^(const|let|var|import)\s+\{/.test(trimmed) &&
        !/=\s*\w+\s*[;,]?\s*$/.test(trimmed)) {
      results.push({ severity: 'high', type: 'hardcoded-secret', line: i + 1, message: 'Hardcoded secret detected' });
    }

    // Eval usage
    if (/\beval\s*\(/.test(trimmed)) {
      results.push({ severity: 'critical', type: 'eval-usage', line: i + 1, message: 'eval() is a security risk' });
    }

    // HTTP without TLS
    if (/http:\/\/[^\s"']+/.test(trimmed) && !/https?:\/\//.test(trimmed.replace(/http:\/\//, ''))) {
      results.push({ severity: 'medium', type: 'insecure-http', line: i + 1, message: 'Use HTTPS instead of HTTP' });
    }
  });

  return results;
}

module.exports = { securityReview };
