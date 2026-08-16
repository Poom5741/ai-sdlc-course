function createMCPClient(initialTools = []) {
  const tools = new Map(initialTools.map(t => [t.name, t]));
  return {
    registerTool: (tool) => tools.set(tool.name, tool),
    getTools: () => Array.from(tools.values()),
    executeTool: (name, ...args) => {
      const tool = tools.get(name);
      return tool ? tool.handler(...args) : null;
    }
  };
}
module.exports = { createMCPClient };
