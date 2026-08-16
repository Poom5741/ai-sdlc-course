/**
 * Quest 3.6: Sprint Planner — problem.js (learner edits this)
 *
 * Block: 3 - Planning & Requirements | Difficulty: 🔴 Hard | Time: 30 minutes
 *
 * Tool skill: break features into sprint-sized tasks.
 * Engineering habit: DECOMPOSE WORK — large features must be broken into
 * small, estimable tasks that can be completed in a sprint.
 *
 * Goal: write `planSprint(features, teamCapacity)` that breaks features
 * into tasks with estimates.
 *
 * Return: { tasks: Array<{ name: string, estimate: number, priority: string }>,
 *            totalEstimate: number, fitsInSprint: boolean }
 */
function planSprint(features, teamCapacity) {
  return { tasks: [], totalEstimate: 0, fitsInSprint: false };
}
module.exports = { planSprint };
