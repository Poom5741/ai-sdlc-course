/**
 * Quest 5.3: Multi-Agent Debate System — REFERENCE solution (do NOT import or read during the exercise)
 */

function debate(agents, topic, maxRounds = 3) {
  const rounds = [];
  const concessions = {};

  for (const a of agents) concessions[a.name] = 0;

  for (let round = 1; round <= maxRounds; round++) {
    for (const agent of agents) {
      const history = rounds.map(r => ({
        agent: r.agent,
        argument: r.argument,
        round: r.round,
      }));

      const argument = agent.argue(history);
      rounds.push({ agent: agent.name, argument, round });

      // Track concessions (simplified: if argument contains "concede" or "agree")
      if (/(?:concede|agree|you.?re right|good point)/i.test(argument)) {
        // Find the most recent opposing argument's agent
        const opposing = rounds.filter(r =>
          r.agent !== agent.name && r.round < round
        ).pop();
        if (opposing) concessions[opposing.agent] = (concessions[opposing.agent] || 0) + 1;
      }
    }
  }

  const stances = agents.map(a => a.stance);
  const allSame = stances.every(s => s === stances[0]);
  const consensus = allSame;

  const winnerEntry = Object.entries(concessions).sort((a, b) => b[1] - a[1])[0];
  const winner = winnerEntry && winnerEntry[1] > 0 ? winnerEntry[0] : null;

  return { rounds, consensus, winner };
}

module.exports = { debate };
