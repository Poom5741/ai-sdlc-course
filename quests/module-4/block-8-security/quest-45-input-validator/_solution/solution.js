/**
 * Quest 4.3: Input Validator — REFERENCE solution (do NOT import or read during the exercise)
 */

function validateInput(data, rules) {
  const errors = [];
  const sanitized = {};

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
  }

  function isValidEmail(str) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
  }

  function isValidUrl(str) {
    try { new URL(str); return true; } catch { return false; }
  }

  for (const [key, rule] of Object.entries(rules)) {
    let value = data[key];

    // Required check
    if (rule.required && (value === undefined || value === null || value === '')) {
      errors.push(`${key} is required`);
      continue;
    }

    // Skip optional fields that aren't present
    if (value === undefined || value === null) {
      sanitized[key] = value;
      continue;
    }

    // Sanitize first (trim + escape)
    if (rule.sanitize && typeof value === 'string') {
      value = escapeHtml(value.trim());
    } else if (typeof value === 'string') {
      value = value.trim();
    }

    // Type check
    if (rule.type === 'string' && typeof value !== 'string') {
      errors.push(`${key} must be a string`);
    } else if (rule.type === 'number' && typeof value !== 'number') {
      errors.push(`${key} must be a number`);
    } else if (rule.type === 'email' && !isValidEmail(value)) {
      errors.push(`${key} must be a valid email`);
    } else if (rule.type === 'url' && !isValidUrl(value)) {
      errors.push(`${key} must be a valid URL`);
    }

    // Length checks
    if (typeof value === 'string') {
      if (rule.minLength && value.length < rule.minLength) {
        errors.push(`${key} must be at least ${rule.minLength} characters`);
      }
      if (rule.maxLength && value.length > rule.maxLength) {
        errors.push(`${key} must be at most ${rule.maxLength} characters`);
      }
    }

    // Pattern check (after sanitize)
    if (rule.pattern && typeof value === 'string' && !new RegExp(rule.pattern).test(value)) {
      errors.push(`${key} does not match pattern ${rule.pattern}`);
    }

    sanitized[key] = value;
  }

  return { valid: errors.length === 0, errors, sanitized };
}

module.exports = { validateInput };
