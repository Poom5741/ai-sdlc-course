function reactAgent(goal, tools) {
  const observation = `Goal: ${goal}. Available tools: ${tools.map(t => t.name).join(', ')}`;
  const reasoning = `To achieve "${goal}", I need to use available tools. Let me select the most appropriate one.`;
  const action = tools[0] || null;
  const result = action ? action.handler() : null;
  return { observation, reasoning, action, result };
}
module.exports = { reactAgent };
