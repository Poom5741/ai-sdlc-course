/**
 * Quest 21.4: Feature Flag System — REFERENCE solution
 */

function createFeatureFlag(name, config = {}) {
  return {
    name,
    config: {
      percentage: config.percentage || 0,
      rules: config.rules || [],
    },
    status: config.percentage > 0 ? 'active' : 'inactive',
  };
}

function simpleHash(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) & 0x7fffffff;
  }
  return hash % 100;
}

function evaluateFlag(flag, context) {
  if (!flag || !context) return { enabled: false, reason: 'invalid input' };

  // Check rules first
  for (const rule of flag.config.rules || []) {
    if (context[rule.key] === rule.value) {
      return { enabled: true, reason: `rule matched: ${rule.key}=${rule.value}` };
    }
  }

  // Percentage-based rollout using stable hash
  const hash = simpleHash(context.userId);
  const enabled = hash < (flag.config.percentage || 0);

  return {
    enabled,
    reason: enabled
      ? `user in rollout bucket (${hash} < ${flag.config.percentage}%)`
      : `user not in rollout bucket (${hash} >= ${flag.config.percentage}%)`,
  };
}

module.exports = { createFeatureFlag, evaluateFlag };
