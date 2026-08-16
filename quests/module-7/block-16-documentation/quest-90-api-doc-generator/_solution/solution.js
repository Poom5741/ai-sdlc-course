/**
 * Quest 16.3: API Doc Generator — REFERENCE solution
 */

function generateOpenApi(routes) {
  const spec = {
    openapi: '3.0.0',
    info: {
      title: 'Generated API',
      version: '1.0.0',
    },
    paths: {},
  };

  for (const route of routes) {
    const { method, path, description, params } = route;
    const methodLower = method.toLowerCase();

    if (!spec.paths[path]) {
      spec.paths[path] = {};
    }

    const operation = {
      summary: description,
      responses: {
        '200': { description: 'Success' },
      },
    };

    if (params && params.length > 0) {
      operation.parameters = params.map(p => ({
        name: p,
        in: 'query',
        required: true,
        schema: { type: 'string' },
      }));
    }

    spec.paths[path][methodLower] = operation;
  }

  return spec;
}

module.exports = { generateOpenApi };
