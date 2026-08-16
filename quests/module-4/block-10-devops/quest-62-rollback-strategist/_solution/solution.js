/**
 * Quest 4.20: Rollback Strategist — REFERENCE solution (do NOT import or read during the exercise)
 */

function deploymentManager() {
  const deployments = {};
  const envOrder = ['dev', 'staging', 'prod'];

  function deploy(version, changes) {
    const id = `deploy-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    deployments[id] = {
      version,
      changes,
      environment: 'dev',
      history: [{ env: 'dev', at: Date.now(), action: 'deployed' }],
      previousVersions: [],
    };
    return id;
  }

  function promote(deployId, targetEnv) {
    const d = deployments[deployId];
    if (!d) return false;

    const currentIdx = envOrder.indexOf(d.environment);
    const targetIdx = envOrder.indexOf(targetEnv);

    // Must promote sequentially — can't skip stages
    if (targetIdx !== currentIdx + 1) return false;

    d.previousVersions.push({ version: d.version, env: d.environment });
    d.environment = targetEnv;
    d.history.push({ env: targetEnv, at: Date.now(), action: 'promoted' });
    return true;
  }

  function rollback(deployId) {
    const d = deployments[deployId];
    if (!d) return { success: false, previousVersion: null, message: 'not found' };

    const prev = d.previousVersions.pop();
    if (!prev) return { success: false, previousVersion: null, message: 'nothing to rollback to' };

    const previousVersion = d.version;
    d.version = prev.version;
    d.environment = prev.env;
    d.history.push({ env: prev.env, at: Date.now(), action: 'rolled back' });

    return { success: true, previousVersion, message: `Rolled back to ${prev.version} in ${prev.env}` };
  }

  function getStatus(deployId) {
    return deployments[deployId] || null;
  }

  return { deploy, promote, rollback, getStatus };
}

module.exports = { deploymentManager };
