/**
 * Quest 5.4: Hierarchical Agent Team — REFERENCE solution (do NOT import or read during the exercise)
 */

function createTeam(manager, workers) {
  function execute(task) {
    const subtasks = manager.decompose(task);
    const assignments = manager.assign(subtasks, workers);

    const results = assignments.map(({ subtask, worker }) => {
      const w = workers.find(w => w.name === worker);
      const output = w ? w.execute(subtask) : { output: 'error: worker not found' };
      return { subtask, worker, ...output };
    });

    const { accepted, rejected } = manager.validate(results);

    const allResults = results.map(r => ({
      ...r,
      status: accepted.includes(r) ? 'accepted' : 'rejected',
    }));

    return {
      results: allResults,
      summary: `Executed ${subtasks.length} subtasks: ${accepted.length} accepted, ${rejected.length} rejected`,
    };
  }

  return { execute };
}

module.exports = { createTeam };
