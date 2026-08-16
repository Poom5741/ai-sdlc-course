/**
 * Quest 18.1: API Migration Tool — REFERENCE solution
 */

function restToGraphQL(routes) {
  const schemaLines = ['type Query {', 'type Mutation {'];
  const resolvers = { Query: {}, Mutation: {} };

  for (const route of routes) {
    const paramsStr = route.params.map(p => `$${p}: String!`).join(', ');
    const argsStr = route.params.map(p => `${p}: String!`).join(', ');
    const fieldDef = `${route.name}(${argsStr}): String`;

    if (route.method === 'GET') {
      schemaLines.push(`  ${fieldDef}`);
      resolvers.Query[route.name] = (parent, args) => {
        return `Result for ${route.name}`;
      };
    } else if (route.method === 'POST') {
      schemaLines.push(`  ${fieldDef}`);
      resolvers.Mutation[route.name] = (parent, args) => {
        return `Created via ${route.name}`;
      };
    }
  }

  schemaLines.push('}');
  schemaLines.push('}');

  return {
    schema: schemaLines.join('\n'),
    resolvers,
  };
}

module.exports = { restToGraphQL };
