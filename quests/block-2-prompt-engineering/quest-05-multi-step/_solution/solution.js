/**
 * Quest 2.2: REFERENCE solution (do NOT import or read during the exercise)
 *
 * Layer 1 (core): URL must be a string, parseable with new URL(), and use
 *   http or https, with a non-empty host.
 * Layer 2 (edge): reject empty/whitespace, javascript: scheme, no-protocol
 *   form, and 'https://' with no host (new URL('https://') throws).
 */

function isValidUrl(url) {
  if (typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (trimmed.length === 0) return false;
  if (trimmed.toLowerCase().startsWith('javascript:')) return false;
  // No protocol → reject (new URL('example.com') would throw; but
  // '//example.com' parses to host without a protocol we accept).
  if (!/^[a-z]+:\/\//i.test(trimmed)) return false;
  let parsed;
  try {
    parsed = new URL(trimmed);
  } catch {
    return false;
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return false;
  if (!parsed.host || parsed.host.length === 0) return false;
  return true;
}

module.exports = { isValidUrl };