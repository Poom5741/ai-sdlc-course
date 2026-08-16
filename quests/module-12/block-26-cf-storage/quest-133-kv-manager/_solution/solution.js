/**
 * Quest 26.1: REFERENCE solution (do NOT read during the exercise)
 *
 * Generates namespaced KV keys with proper TTL.
 */

const ACTION_TTL = {
  read: 0,
  write: 3600,
  delete: 0,
};

function buildKVKey(namespace, entity, id, action) {
  // Validate inputs
  if (!namespace || namespace.trim() === '') {
    return { key: '', error: 'namespace is required' };
  }
  if (!entity || entity.trim() === '') {
    return { key: '', error: 'entity is required' };
  }
  if (!id || id.trim() === '') {
    return { key: '', error: 'id is required' };
  }
  if (!ACTION_TTL.hasOwnProperty(action)) {
    return { key: '', error: `invalid action: ${action}` };
  }

  // Generate namespaced key: namespace:entity:id
  const key = `${namespace}:${entity}:${id}`;
  const ttl = ACTION_TTL[action];

  return { key, ttl };
}

module.exports = { buildKVKey };
