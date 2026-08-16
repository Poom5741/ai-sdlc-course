/**
 * Quest 21.3: Production Incident Responder — REFERENCE solution
 */

function respondToIncident(incident) {
  const severityActions = {
    low: ['Monitor the issue', 'Document for next sprint', 'Check if it resolves automatically'],
    medium: ['Investigate root cause', 'Apply temporary fix if available', 'Schedule fix for this sprint'],
    high: ['Immediately investigate', 'Rollback if recent deploy', 'Implement hotfix', 'Notify team lead'],
    critical: ['Page on-call engineer', 'Rollback immediately', 'Halt related deploys', 'War room setup', 'Executive communication'],
  };

  const severityImpact = {
    low: 'Minimal user impact — cosmetic or minor delay',
    medium: 'Partial feature degradation — some users affected',
    high: 'Major feature unavailable — significant user impact',
    critical: 'System-wide outage or data integrity risk — all users affected',
  };

  return {
    triage: `INCIDENT: ${incident.type} (${incident.severity}). Symptoms: ${incident.symptoms.join(', ')}. Immediate classification: ${incident.severity.toUpperCase()}.`,
    actions: severityActions[incident.severity] || severityActions.medium,
    estimatedImpact: severityImpact[incident.severity] || severityImpact.medium,
    communication: `[${incident.severity.toUpperCase()}] We're experiencing ${incident.type}. Impact: ${incident.symptoms[0]}. We're investigating and will update in 30 minutes.`,
    postmortem: `## Postmortem: ${incident.type}\n\n**Date**: TBD\n**Severity**: ${incident.severity}\n**Duration**: TBD\n**Root Cause**: TBD\n**Impact**: ${incident.symptoms.join(', ')}\n**Resolution**: TBD\n**Action Items**: TBD`,
  };
}

module.exports = { respondToIncident };
