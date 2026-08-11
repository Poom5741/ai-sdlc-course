/**
 * Quest 4.3: REFERENCE solution (do NOT read during the exercise)
 *
 * buildPipeline wires each role (codeWriter, testWriter, testRunner) into the
 * matching stage, keeps the role functions referenced on the pipeline object
 * (so callers can inspect them), and CRUCIALLY keeps testWriter and testRunner
 * as the distinct objects passed in — anti-bamboozle.
 */

function buildPipeline({ codeWriter, testWriter, testRunner }) {
  return {
    codeWriter,
    testWriter,
    testRunner,
    writeCode(task) {
      return codeWriter(task);
    },
    writeTests(code) {
      return testWriter(code);
    },
    runTests(tests) {
      return testRunner(tests);
    },
  };
}

module.exports = { buildPipeline };