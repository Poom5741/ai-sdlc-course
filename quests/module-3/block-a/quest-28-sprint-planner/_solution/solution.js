function planSprint(features, teamCapacity) {
  const tasks = [];
  for (const f of features) {
    const estimate = f.complexity === 'high' ? 8 : f.complexity === 'medium' ? 5 : 3;
    tasks.push({ name: f.name, estimate, priority: f.priority });
  }
  const totalEstimate = tasks.reduce((s, t) => s + t.estimate, 0);
  return { tasks, totalEstimate, fitsInSprint: totalEstimate <= teamCapacity };
}
module.exports = { planSprint };
