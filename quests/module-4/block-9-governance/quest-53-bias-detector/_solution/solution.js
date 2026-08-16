/**
 * Quest 4.11: Bias Detector — REFERENCE solution (do NOT import or read during the exercise)
 */

function detectBias(results, demographics) {
  if (!results.length) return { fair: true, metrics: {}, disparateImpact: 1, flagged: [] };

  const metrics = {};
  const positiveValues = ['approved', 'positive', 'yes', 'true', 'pass', 'selected', 'hired'];

  for (const group of demographics) {
    const groupResults = results.filter(r => r.group === group);
    const positiveCount = groupResults.filter(r =>
      positiveValues.includes(String(r.output).toLowerCase())
    ).length;
    const rate = groupResults.length > 0 ? positiveCount / groupResults.length : 0;
    metrics[group] = { rate, count: groupResults.length };
  }

  const rates = Object.values(metrics).map(m => m.rate).filter(r => !isNaN(r));
  const maxRate = Math.max(...rates);
  const minRate = Math.min(...rates);
  const disparateImpact = maxRate > 0 ? minRate / maxRate : 1;

  const flagged = Object.entries(metrics)
    .filter(([_, m]) => m.rate < maxRate * 0.8)
    .map(([group]) => group);

  return {
    fair: disparateImpact >= 0.75,
    metrics,
    disparateImpact: Math.round(disparateImpact * 1000) / 1000,
    flagged,
  };
}

module.exports = { detectBias };
