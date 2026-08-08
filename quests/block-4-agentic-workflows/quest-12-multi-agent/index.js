/**
 * Quest 4.3: Multi-Agent Pipeline
 * 
 * Block: 4 - Agentic Workflows
 * Difficulty: 🔴 Hard
 * Time: 25 minutes
 * 
 * Goal: Create a pipeline with multiple specialized AI agents
 * 
 * Instructions:
 * 1. Design agent roles and responsibilities
 * 2. Implement agent communication
 * 3. Create a pipeline orchestrator
 * 4. Test with a complex task
 */

// TODO: Define Agent Base Class
class Agent {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }

  async process(input) {
    throw new Error('process() must be implemented');
  }
}

// TODO: Implement Specialized Agents
class PlannerAgent extends Agent {
  constructor() {
    super('Planner', 'Breaks tasks into steps');
  }

  async process(task) {
    // Your implementation here
    return { steps: [], task };
  }
}

class CoderAgent extends Agent {
  constructor() {
    super('Coder', 'Writes code');
  }

  async process(plan) {
    // Your implementation here
    return { code: '', plan };
  }
}

class ReviewerAgent extends Agent {
  constructor() {
    super('Reviewer', 'Reviews code quality');
  }

  async process(code) {
    // Your implementation here
    return { issues: [], score: 0, code };
  }
}

class TesterAgent extends Agent {
  constructor() {
    super('Tester', 'Tests code');
  }

  async process(code) {
    // Your implementation here
    return { passed: false, tests: [], code };
  }
}

// TODO: Implement Pipeline Orchestrator
class Pipeline {
  constructor() {
    this.agents = [];
    this.results = [];
  }

  addAgent(agent) {
    this.agents.push(agent);
  }

  async execute(task) {
    // Your implementation here
    return { success: false, results: [] };
  }
}

module.exports = {
  Agent,
  PlannerAgent,
  CoderAgent,
  ReviewerAgent,
  TesterAgent,
  Pipeline,
};
