/**
 * Quest 5.2: Tool Registry System — REFERENCE solution (do NOT import or read during the exercise)
 */

function createToolRegistry() {
  const tools = new Map();

  function register(tool) {
    if (!tool.name || tools.has(tool.name)) return false;
    tools.set(tool.name, tool);
    return true;
  }

  function execute(toolName, args) {
    const tool = tools.get(toolName);
    if (!tool) return null;

    // Validate arguments against parameter schema
    if (tool.parameters) {
      for (const [param, type] of Object.entries(tool.parameters)) {
        if (args[param] === undefined) return { error: `Missing parameter: ${param}` };
        if (type === 'number' && typeof args[param] !== 'number') {
          return { error: `Parameter ${param} must be ${type}` };
        }
        if (type === 'string' && typeof args[param] !== 'string') {
          return { error: `Parameter ${param} must be ${type}` };
        }
      }
    }

    try {
      return tool.execute(args);
    } catch (e) {
      return { error: e.message };
    }
  }

  function listTools() {
    return Array.from(tools.values()).map(t => ({
      name: t.name,
      description: t.description,
      parameters: t.parameters,
    }));
  }

  function findTools(query) {
    const q = query.toLowerCase();
    return listTools().filter(t =>
      t.name.toLowerCase().includes(q) || (t.description && t.description.toLowerCase().includes(q))
    );
  }

  return { register, execute, listTools, findTools };
}

module.exports = { createToolRegistry };
