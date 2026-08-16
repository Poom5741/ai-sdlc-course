/**
 * Quest 4.2: Secret Scanner — REFERENCE solution (do NOT import or read during the exercise)
 */

function scanSecrets(code) {
  if (!code) return [];

  const results = [];
  const lines = code.split('\n');

  const placeholders = /your[-_]?(api[-_]?key|secret|password|token)[-_]?here|placeholder|changeme|xxx/i;

  const patterns = [
    { type: 'aws-key', regex: /AKIA[0-9A-Z]{16}/g },
    { type: 'api-key', regex: /(?:sk|key|api|token)[-_][a-zA-Z0-9]{20,}/g },
    { type: 'password', regex: /(?:password|pwd|passwd)\s*=\s*["']?([^"'\s;]+)["']?/gi },
    { type: 'private-key', regex: /-----BEGIN\s+(?:RSA\s+)?PRIVATE\s+KEY-----/g },
    { type: 'connection-string', regex: /(?:mongodb|postgres|mysql|redis):\/\/[^\s"']+/gi },
  ];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (const { type, regex } of patterns) {
      const matches = line.matchAll(new RegExp(regex.source, regex.flags));
      for (const match of matches) {
        const value = match[0];
        if (placeholders.test(value)) continue;
        results.push({ type, line: i + 1, value });
      }
    }
  }

  return results;
}

module.exports = { scanSecrets };
