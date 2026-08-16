/**
 * Quest 5.8: Prompt Version Manager — REFERENCE solution (do NOT import or read during the exercise)
 */

function createPromptManager() {
  const versions = {}; // name → [{ id, prompt, deployed, metrics }]
  let counter = 0;

  function create(name, prompt) {
    if (!versions[name]) versions[name] = [];
    const id = `v${++counter}`;
    versions[name].push({ id, prompt, deployed: false, metrics: { uses: 0, avgScore: 0, successRate: 0 } });
    return id;
  }

  function deploy(versionId) {
    for (const name of Object.keys(versions)) {
      for (const v of versions[name]) {
        if (v.id === versionId) {
          // Undeploy others
          versions[name].forEach(x => x.deployed = false);
          v.deployed = true;
          return true;
        }
      }
    }
    return false;
  }

  function abTest(name, variants) {
    if (!variants || variants.length === 0) return null;
    return variants.reduce((best, v) => (v.score > (best?.score || 0)) ? v : best);
  }

  function getMetrics(versionId) {
    for (const name of Object.keys(versions)) {
      for (const v of versions[name]) {
        if (v.id === versionId) return v.metrics;
      }
    }
    return { uses: 0, avgScore: 0, successRate: 0 };
  }

  function rollback(name) {
    const vers = versions[name];
    if (!vers || vers.length < 2) return null;
    const deployed = vers.find(v => v.deployed);
    const prevIndex = deployed ? vers.indexOf(deployed) - 1 : vers.length - 2;
    if (prevIndex < 0) return null;
    vers.forEach(v => v.deployed = false);
    vers[prevIndex].deployed = true;
    return vers[prevIndex].id;
  }

  return { create, deploy, abTest, getMetrics, rollback };
}

module.exports = { createPromptManager };
