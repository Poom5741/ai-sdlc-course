/**
 * Quest 5.10: Production Readiness Checker — REFERENCE solution (do NOT import or read during the exercise)
 */

function checkReadiness(config) {
  const checks = [
    { item: 'hasTests', severity: 'required', label: 'Automated tests' },
    { item: 'hasCI', severity: 'required', label: 'CI/CD pipeline' },
    { item: 'hasMonitoring', severity: 'important', label: 'Monitoring and alerting' },
    { item: 'hasRollback', severity: 'important', label: 'Rollback capability' },
    { item: 'hasLogging', severity: 'critical', label: 'Structured logging' },
    { item: 'hasAuth', severity: 'critical', label: 'Authentication and authorization' },
    { item: 'hasRateLimit', severity: 'important', label: 'Rate limiting' },
    { item: 'hasHealthCheck', severity: 'critical', label: 'Health check endpoint' },
    { item: 'documentation', severity: 'required', label: 'Documentation', test: (c) => c.documentation === 'complete' },
    { item: 'sla', severity: 'important', label: 'SLA defined', test: (c) => !!c.sla },
  ];

  const checklist = checks.map(check => {
    const passed = check.test ? check.test(config) : !!config[check.item];
    return { item: check.label, passed, severity: check.severity,
      message: passed ? `${check.label} is configured` : `${check.label} is missing` };
  });

  const passedCount = checklist.filter(c => c.passed).length;
  const score = Math.round((passedCount / checklist.length) * 100);

  const criticalPassed = checklist.filter(c => c.severity === 'critical').every(c => c.passed);
  const ready = criticalPassed && score >= 70;

  return { ready, score, checklist };
}

module.exports = { checkReadiness };
