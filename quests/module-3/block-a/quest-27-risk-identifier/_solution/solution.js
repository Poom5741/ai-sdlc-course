function identifyRisks(description) {
  const risks = [];
  if (/api|third.party/i.test(description)) {
    risks.push({ risk: 'Third-party API dependency', severity: 'high', mitigation: 'Implement circuit breaker and fallback' });
  }
  if (/payment|billing/i.test(description)) {
    risks.push({ risk: 'Payment processing failures', severity: 'high', mitigation: 'Implement retry logic and audit logging' });
  }
  if (/user|auth/i.test(description)) {
    risks.push({ risk: 'Authentication security vulnerabilities', severity: 'medium', mitigation: 'Use established auth library and conduct security review' });
  }
  if (risks.length === 0) {
    risks.push({ risk: 'Scope creep', severity: 'medium', mitigation: 'Define clear requirements and change control process' });
  }
  return risks;
}
module.exports = { identifyRisks };
