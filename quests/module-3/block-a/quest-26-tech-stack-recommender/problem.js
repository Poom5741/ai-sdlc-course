/**
 * Quest 3.4: Tech Stack Recommender — problem.js (learner edits this)
 *
 * Block: 3 - Planning & Requirements | Difficulty: 🟡 Medium | Time: 25 minutes
 *
 * Tool skill: recommend tech stack based on requirements.
 * Engineering habit: MATCH TOOLS TO PROBLEMS — different projects need
 * different stacks; make recommendations based on constraints.
 *
 * Goal: write `recommendStack(requirements)` that suggests a tech stack.
 *
 * Parameters: requirements: { scale, teamSize, complexity, domain }
 * Return: { frontend, backend, database, deployment, rationale }
 *
 * Edge case: naive AI always recommends the same stack regardless of requirements.
 */
function recommendStack(requirements) {
  return { frontend: '', backend: '', database: '', deployment: '', rationale: '' };
}
module.exports = { recommendStack };
