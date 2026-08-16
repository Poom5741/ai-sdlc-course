/**
 * Quest 18.4: Monolith Splitter — REFERENCE solution
 */

function analyzeMonolith(modules) {
  if (!modules || modules.length === 0) return [];

  // Group modules by shared dependencies
  const depGroups = {};
  for (const mod of modules) {
    const key = mod.dependencies.sort().join(',');
    if (!depGroups[key]) depGroups[key] = [];
    depGroups[key].push(mod.name);
  }

  const services = [];
  let serviceIndex = 1;

  for (const [deps, moduleNames] of Object.entries(depGroups)) {
    const depList = deps.split(',').filter(Boolean);
    let reason;

    if (depList.includes('users-db')) {
      reason = 'User domain — shares user database';
    } else if (depList.includes('orders-db')) {
      reason = 'Order domain — shares order database';
    } else if (depList.includes('inventory-db')) {
      reason = 'Inventory domain — shares inventory database';
    } else {
      reason = `Shared dependencies: ${depList.join(', ') || 'none'}`;
    }

    services.push({
      service: `service-${serviceIndex}`,
      modules: moduleNames,
      reason,
    });
    serviceIndex++;
  }

  return services;
}

module.exports = { analyzeMonolith };
