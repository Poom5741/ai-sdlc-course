/**
 * Quest 4.7: Dependency Vulnerability Auditor — REFERENCE solution (do NOT import or read during the exercise)
 */

function semverSatisfies(installed, vulnerable) {
  // Simple semver range matching
  if (installed.startsWith('^')) {
    const target = installed.slice(1);
    const [maj, min] = target.split('.').map(Number);
    const [iMaj, iMin] = vulnerable.split('.').map(Number);
    return iMaj === maj && (iMaj > maj || iMin >= min);
  }
  if (installed.startsWith('~')) {
    const target = installed.slice(1);
    const [maj, min, pat] = target.split('.').map(Number);
    const [iMaj, iMin, iPat] = vulnerable.split('.').map(Number);
    return iMaj === maj && iMin === min && iPat >= pat;
  }
  return installed === vulnerable;
}

function auditDependencies(packageJson, vulnDb) {
  const results = [];
  const deps = { ...packageJson.dependencies };
  const devDeps = { ...packageJson.devDependencies };

  for (const [pkg, version] of Object.entries(deps)) {
    if (vulnDb[pkg]) {
      const isVulnerable = vulnDb[pkg].versions.some(v => semverSatisfies(version, v));
      if (isVulnerable) {
        results.push({
          package: pkg,
          installed: version,
          severity: vulnDb[pkg].severity,
          fix: vulnDb[pkg].fix,
          devOnly: false,
        });
      }
    }
  }

  for (const [pkg, version] of Object.entries(devDeps)) {
    if (vulnDb[pkg]) {
      const isVulnerable = vulnDb[pkg].versions.some(v => semverSatisfies(version, v));
      if (isVulnerable) {
        results.push({
          package: pkg,
          installed: version,
          severity: vulnDb[pkg].severity,
          fix: vulnDb[pkg].fix,
          devOnly: true,
        });
      }
    }
  }

  const sevOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  results.sort((a, b) => sevOrder[a.severity] - sevOrder[b.severity]);

  return {
    total: Object.keys(deps).length + Object.keys(devDeps).length,
    vulnerable: results.length,
    results,
  };
}

module.exports = { auditDependencies };
