/**
 * Quest 25.2: REFERENCE solution (do NOT read during the exercise)
 *
 * Routes requests to handlers with CORS support.
 */

function routeRequest(method, path, corsEnabled) {
  const handlers = {
    GET: 'list',
    POST: 'create',
    PUT: 'update',
    DELETE: 'delete',
    OPTIONS: 'preflight',
  };

  if (!handlers[method]) {
    return { handler: '', corsHeaders: null, status: 400, error: `Unsupported method: ${method}` };
  }

  const corsHeaders = corsEnabled ? {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  } : null;

  const status = method === 'OPTIONS' ? 204 : 200;

  return {
    handler: handlers[method],
    corsHeaders,
    status,
  };
}

module.exports = { routeRequest };
