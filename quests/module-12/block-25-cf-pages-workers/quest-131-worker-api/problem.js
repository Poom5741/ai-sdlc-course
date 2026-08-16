/**
 * Quest 25.3: REFERENCE solution (do NOT read during the exercise)
 *
 * Builds Worker API routes with KV/D1 storage and error handling.
 */

function buildWorkerRoute(method, path, env) {
  let storage = 'none';
  let handler = '';
  const errorHandling = [];

  if (path.startsWith('/kv/')) {
    storage = 'kv';
    handler = `kv-${method.toLowerCase()}`;
    errorHandling.push('Handle KV namespace not found');
    errorHandling.push('Handle key not found (404)');
  } else if (path.startsWith('/d1/')) {
    storage = 'd1';
    handler = `d1-${method.toLowerCase()}`;

    // D1 requires special error handling in preview environments
    if (env.isPreview) {
      errorHandling.push('Handle database not ready in preview environment');
      errorHandling.push('Handle D1 binding not configured');
      errorHandling.push('Return friendly error for preview DB errors');
    } else {
      errorHandling.push('Handle D1 query errors');
      errorHandling.push('Handle database connection timeout');
    }

    // D1 specific method handling
    if (method === 'POST' || method === 'PUT') {
      errorHandling.push('Validate request body before D1 insert');
      errorHandling.push('Handle unique constraint violations');
    }
  } else {
    handler = `api-${method.toLowerCase()}`;
    errorHandling.push('Handle method not allowed');
  }

  return {
    handler,
    storage,
    errorHandling,
    status: 200,
  };
}

module.exports = { buildWorkerRoute };
