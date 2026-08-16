/**
 * Quest 19.1: AI Bias Auditor — REFERENCE solution
 */

function computeFairnessMetrics(predictions) {
  if (!predictions || predictions.length === 0) {
    return { demographicParity: 0, equalizedOdds: 0, groups: {} };
  }

  // Group predictions
  const groups = {};
  for (const p of predictions) {
    if (!groups[p.group]) groups[p.group] = [];
    groups[p.group].push(p);
  }

  const groupNames = Object.keys(groups);
  const groupStats = {};

  for (const name of groupNames) {
    const preds = groups[name];
    const total = preds.length;
    const positivePredicted = preds.filter(p => p.predicted).length;
    const actualPositive = preds.filter(p => p.actual);
    const truePositives = actualPositive.filter(p => p.predicted).length;

    groupStats[name] = {
      positiveRate: total > 0 ? positivePredicted / total : 0,
      truePositiveRate: actualPositive.length > 0 ? truePositives / actualPositive.length : 0,
    };
  }

  // Demographic parity: max difference in positive prediction rates
  const positiveRates = groupNames.map(g => groupStats[g].positiveRate);
  const demographicParity = Math.max(...positiveRates) - Math.min(...positiveRates);

  // Equalized odds: max difference in true positive rates
  const tprRates = groupNames.map(g => groupStats[g].truePositiveRate);
  const equalizedOdds = Math.max(...tprRates) - Math.min(...tprRates);

  return {
    demographicParity: Math.round(demographicParity * 1000) / 1000,
    equalizedOdds: Math.round(equalizedOdds * 1000) / 1000,
    groups: groupStats,
  };
}

module.exports = { computeFairnessMetrics };
