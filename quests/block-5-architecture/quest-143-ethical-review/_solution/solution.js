/**
 * Solution for Ethical Review quest
 */

/**
 * Audits code for ethical concerns
 * @param {string} code - The code to audit
 * @param {object} context - Context about the code
 * @param {string} context.domain - Application domain
 * @param {boolean} context.hasUserData - Whether code processes user data
 * @returns {{ issues: object[], score: number, recommendations: string[] }}
 */
function auditCode(code, context) {
  const issues = [];
  const recommendations = [];
  let score = 100;
  const { domain, hasUserData } = context;

  // Check for gender bias
  const genderPatterns = [
    /gender\s*===?\s*['"]male['"]/i,
    /gender\s*===?\s*['"]female['"]/i,
    /gender\s*===?\s*['"]other['"]/i,
    /\b(male|female)\b.*(?:salary|pay|wage|rate|discount)/i
  ];

  for (const pattern of genderPatterns) {
    if (pattern.test(code)) {
      issues.push({
        type: 'bias',
        description: 'Code makes decisions based on gender',
        severity: 'high',
        details: 'Gender-based differentiation may violate anti-discrimination laws'
      });
      score -= 25;
      break;
    }
  }

  // Check for racial/ethnic bias
  const racePatterns = [
    /race\s*===?\s*['"](?:white|black|asian|hispanic|latino)['"]/i,
    /\b(white|black|asian|hispanic)\b.*(?:rate|price|discount|eligible)/i
  ];

  for (const pattern of racePatterns) {
    if (pattern.test(code)) {
      issues.push({
        type: 'bias',
        description: 'Code makes decisions based on race/ethnicity',
        severity: 'critical',
        details: 'Race-based differentiation is illegal in most jurisdictions'
      });
      score -= 30;
      break;
    }
  }

  // Check for age discrimination
  const agePatterns = [
    /age\s*[><=]+\s*\d+/i,
    /\bage\b.*(?:eligible|qualify|eligible|require)/i
  ];

  if (domain === 'hiring' || domain === 'finance') {
    for (const pattern of agePatterns) {
      if (pattern.test(code)) {
        issues.push({
          type: 'bias',
          description: 'Code may discriminate based on age',
          severity: 'medium',
          details: 'Age-based restrictions may violate age discrimination laws'
        });
        score -= 15;
        break;
      }
    }
  }

  // Check for hardcoded PII
  const piiPatterns = [
    { pattern: /\b\d{3}-\d{2}-\d{4}\b/, type: 'SSN' },
    { pattern: /\b\w+@\w+\.\w+\b/, type: 'email' },
    { pattern: /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/, type: 'phone' },
    { pattern: /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/, type: 'credit card' }
  ];

  for (const { pattern, type } of piiPatterns) {
    if (pattern.test(code)) {
      issues.push({
        type: 'privacy',
        description: `Hardcoded ${type} detected`,
        severity: 'high',
        details: 'Hardcoded PII should never be in source code'
      });
      score -= 20;
    }
  }

  // Check for missing consent (if processing user data)
  if (hasUserData) {
    const hasConsentCheck = /consent|permission|opt.?in|agree/i.test(code);
    if (!hasConsentCheck) {
      issues.push({
        type: 'privacy',
        description: 'No consent mechanism detected for user data',
        severity: 'medium',
        details: 'User data collection should include consent mechanisms'
      });
      score -= 10;
      recommendations.push('Add explicit consent mechanism before collecting user data');
    }
  }

  // Check for transparency issues
  if (hasUserData && domain !== 'general') {
    const hasLogging = /log|audit|track|record/i.test(code);
    if (!hasLogging) {
      issues.push({
        type: 'transparency',
        description: 'No logging or audit trail for data processing',
        severity: 'low',
        details: 'Data processing should be logged for accountability'
      });
      score -= 5;
      recommendations.push('Add logging for data processing operations');
    }
  }

  // Domain-specific recommendations
  if (domain === 'healthcare') {
    recommendations.push('Ensure HIPAA compliance for health data');
    recommendations.push('Add human review for medical decisions');
  }

  if (domain === 'finance') {
    recommendations.push('Ensure compliance with fair lending laws');
    recommendations.push('Document algorithmic decision criteria');
  }

  if (domain === 'hiring') {
    recommendations.push('Audit for disparate impact across demographics');
    recommendations.push('Ensure human review of hiring decisions');
  }

  // General recommendations
  if (issues.length > 0) {
    recommendations.push('Consider implementing algorithmic impact assessment');
    recommendations.push('Document decision criteria for transparency');
  }

  // Ensure score stays within bounds
  score = Math.max(0, Math.min(100, score));

  return {
    issues,
    score,
    recommendations: [...new Set(recommendations)] // Remove duplicates
  };
}

module.exports = { auditCode };
