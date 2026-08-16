function refinePrompt(badPrompt) {
  if (badPrompt.length > 50) return badPrompt;
  return `${badPrompt} that takes specific input parameters, has clear type definitions, handles edge cases, and includes a brief docstring explaining the purpose.`;
}
module.exports = { refinePrompt };
