/**
 * Quest 6.5: Prompt Chainer — REFERENCE solution
 */

function createChain(steps) {
  return {
    run(input) {
      const record = [];
      let current = input;
      let failedStep = null;
      let error = null;

      for (const step of steps) {
        try {
          const prompt = step.prompt(current);
          const output = step.parse(current);
          record.push({ name: step.name, input: current, output });
          current = output;
        } catch (e) {
          record.push({ name: step.name, input: current, output: null, error: e.message });
          failedStep = step.name;
          error = e.message;
          break;
        }
      }

      return {
        finalOutput: error ? null : current,
        steps: record,
        failedStep,
        error,
      };
    },
  };
}

module.exports = { createChain };
