/**
 * Quest 21.2: Multi-Tool Workflow Orchestrator — REFERENCE solution
 */

function orchestrateWorkflow(tools, input) {
  const steps = [];
  let current = input;

  for (const tool of tools) {
    const stepInput = current;
    try {
      current = tool.process(current);
      steps.push({ tool: tool.name, input: stepInput, output: current });
    } catch (err) {
      steps.push({ tool: tool.name, input: stepInput, output: null, error: err.message });
      return { result: null, steps, error: err.message };
    }
  }

  return { result: current, steps };
}

module.exports = { orchestrateWorkflow };
