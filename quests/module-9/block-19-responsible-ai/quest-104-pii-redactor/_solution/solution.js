/**
 * Quest 19.2: PII Redactor — REFERENCE solution
 */

function redactPII(text) {
  if (!text) return { redacted: '', found: {} };

  let redacted = text;
  const found = {};

  // Email — but skip example/test emails
  const emailRegex = /([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
  const emails = [...text.matchAll(emailRegex)];
  for (const match of emails) {
    const email = match[0].toLowerCase();
    const localPart = match[1].toLowerCase();
    // Skip example/test emails (local part is 'test' or 'example')
    if (localPart === 'test' || localPart === 'example') {
      continue;
    }
    redacted = redacted.replace(match[0], '[EMAIL REDACTED]');
    found.email = (found.email || 0) + 1;
  }

  // Phone numbers (US format)
  const phoneRegex = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g;
  const phones = [...text.matchAll(phoneRegex)];
  for (const match of phones) {
    redacted = redacted.replace(match[0], '[PHONE REDACTED]');
    found.phone = (found.phone || 0) + 1;
  }

  // SSN
  const ssnRegex = /\b\d{3}-\d{2}-\d{4}\b/g;
  const ssns = [...text.matchAll(ssnRegex)];
  for (const match of ssns) {
    redacted = redacted.replace(match[0], '[SSN REDACTED]');
    found.ssn = (found.ssn || 0) + 1;
  }

  // Names after "My name is" or "I'm"
  const nameRegex = /(?:My name is|I'm)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/g;
  const names = [...text.matchAll(nameRegex)];
  for (const match of names) {
    redacted = redacted.replace(match[0], match[0].replace(match[1], '[NAME REDACTED]'));
    found.name = (found.name || 0) + 1;
  }

  return { redacted, found };
}

module.exports = { redactPII };
