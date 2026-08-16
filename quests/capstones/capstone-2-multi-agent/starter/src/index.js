/**
 * Capstone 2: Multi-Agent System — Starter Code
 *
 * Basic agent framework. Extend this with your specialized agents.
 */

class Agent {
  constructor(name, role) {
    this.name = name;
    this.role = role;
    this.tools = [];
  }

  registerTool(tool) {
    this.tools.push(tool);
  }

  async process(input) {
    throw new Error('Agent.process() must be implemented by subclass');
  }
}

class Orchestrator {
  constructor() {
    this.agents = new Map();
  }

  registerAgent(agent) {
    this.agents.set(agent.name, agent);
  }

  async delegate(task) {
    // TODO: Implement task delegation logic
    throw new Error('Orchestrator.delegate() not implemented');
  }
}

module.exports = { Agent, Orchestrator };
