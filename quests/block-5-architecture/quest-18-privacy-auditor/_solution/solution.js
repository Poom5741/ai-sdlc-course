/**
 * Solution for Privacy Auditor quest
 */

/**
 * Detects PII in a data string
 * @param {string} data - The data to scan
 * @param {object} options - Detection options
 * @param {boolean} options.detectNames - Whether to detect names
 * @param {boolean} options.strictMode - Whether to use strict matching
 * @returns {{ found: boolean, detections: object[], riskLevel: string }}
 */
function detectPII(data, options = {}) {
  const { detectNames = false, strictMode = false } = options;
  const detections = [];

  // Email detection
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  let match;
  while ((match = emailRegex.exec(data)) !== null) {
    detections.push({
      type: 'email',
      value: match[0],
      position: match.index,
      severity: 'medium'
    });
  }

  // US Phone number detection
  const phoneRegex = strictMode
    ? /\b(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g
    : /(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
  while ((match = phoneRegex.exec(data)) !== null) {
    const value = match[0];
    // Simple check: 10+ digits when stripped
    const digits = value.replace(/[^\d]/g, '');
    if (digits.length >= 10 && digits.length <= 11) {
      detections.push({
        type: 'phone',
        value: value,
        position: match.index,
        severity: 'medium'
      });
    }
  }

  // SSN detection
  const ssnRegex = /\b\d{3}-\d{2}-\d{4}\b/g;
  while ((match = ssnRegex.exec(data)) !== null) {
    detections.push({
      type: 'ssn',
      value: match[0],
      position: match.index,
      severity: 'critical'
    });
  }

  // Credit card detection (Visa, MasterCard, Amex, etc.)
  const ccRegex = /\b(?:\d{4}[-\s]?){3}\d{4}\b/g;
  while ((match = ccRegex.exec(data)) !== null) {
    const value = match[0].replace(/[-\s]/g, '');
    // Simple Luhn check heuristic (not full validation)
    if (value.length >= 13 && value.length <= 19) {
      detections.push({
        type: 'creditcard',
        value: match[0],
        position: match.index,
        severity: 'high'
      });
    }
  }

  // International phone detection
  const intlPhoneRegex = /\+\d{1,3}[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g;
  while ((match = intlPhoneRegex.exec(data)) !== null) {
    // Check if already detected as US phone
    const alreadyDetected = detections.some(d => 
      d.type === 'phone' && d.position === match.index
    );
    if (!alreadyDetected) {
      detections.push({
        type: 'phone',
        value: match[0],
        position: match.index,
        severity: 'medium'
      });
    }
  }

  // Calculate risk level
  let riskLevel = 'none';
  if (detections.length > 0) {
    const hasCritical = detections.some(d => d.severity === 'critical');
    const hasHigh = detections.some(d => d.severity === 'high');
    
    if (hasCritical) {
      riskLevel = 'critical';
    } else if (hasHigh) {
      riskLevel = 'high';
    } else {
      riskLevel = 'medium';
    }
  }

  return {
    found: detections.length > 0,
    detections,
    riskLevel
  };
}

module.exports = { detectPII };
