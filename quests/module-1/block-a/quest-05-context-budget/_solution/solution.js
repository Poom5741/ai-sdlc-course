/**
 * Quest 1.5: Context Window Budget Calculator — REFERENCE solution
 */

function calculateBudget({ systemTokens, userTokens, historyTokens, reservedResponse }) {
  const total = 16384;
  const used = systemTokens + userTokens + historyTokens;
  const available = Math.max(0, total - used - reservedResponse);
  const withinBudget = used + reservedResponse <= total;
  const overBy = withinBudget ? 0 : (used + reservedResponse) - total;

  return { total, used, available, withinBudget, overBy };
}

module.exports = { calculateBudget };
