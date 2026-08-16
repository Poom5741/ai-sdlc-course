/**
 * Quest 5.4: Hierarchical Agent Team — problem.js (learner edits this)
 *
 * Block: 11 - Agentic Workflows | Difficulty: 🔴 Hard | Time: 45 minutes
 *
 * Tool skill: manager-worker agent hierarchy.
 * Engineering habit: HIERARCHY ENABLES SCALE — one manager decomposes work,
 * many workers execute in parallel. But the manager must validate results.
 *
 * Goal: write `createTeam(manager, workers)` that builds a hierarchy.
 *
 *   manager.decompose(task) → subtasks[]
 *   manager.assign(subtasks, workers) → assignments[]
 *   manager.validate(results) → { accepted, rejected }
 *
 * Returns: { execute(task) → { results, summary } }
 *
 * Edge case: naive AI assigns work but doesn't validate results.
 * The manager MUST validate worker output before accepting it.
 */

// TODO: implement createTeam(manager, workers) here.
function createTeam(manager, workers) {
  return {
    execute: (task) => ({ results: [], summary: 'stub' }),
  };
}

module.exports = { createTeam };
