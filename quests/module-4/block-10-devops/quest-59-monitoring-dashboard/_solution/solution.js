/**
 * Quest 4.17: Monitoring Dashboard Builder — REFERENCE solution
 */

function percentile(sorted, p) {
  const idx = Math.ceil((p / 100) * sorted.length) - 1;
  return sorted[Math.max(0, idx)];
}

function buildDashboard(metrics) {
  const grouped = {};
  for (const m of metrics) {
    if (!grouped[m.name]) grouped[m.name] = [];
    grouped[m.name].push(m);
  }

  const summary = {};
  const alerts = [];
  const trends = [];

  for (const [name, items] of Object.entries(grouped)) {
    const values = items.map(i => i.value).sort((a, b) => a - b);
    const avg = values.reduce((s, v) => s + v, 0) / values.length;
    const p95 = percentile(values, 95);

    summary[name] = {
      avg: Math.round(avg),
      min: values[0],
      max: values[values.length - 1],
      p95,
      count: values.length,
    };

    if (p95 > 1000) {
      alerts.push({ metric: name, severity: 'high', message: `p95 latency ${p95}ms exceeds 1000ms threshold` });
    }

    const first = values[0];
    const last = values[values.length - 1];
    const direction = last > first * 1.5 ? 'up' : last < first * 0.5 ? 'down' : 'stable';
    trends.push({ metric: name, direction, change: ((last - first) / first * 100).toFixed(1) + '%' });
  }

  return { summary, alerts, trends };
}

module.exports = { buildDashboard };
