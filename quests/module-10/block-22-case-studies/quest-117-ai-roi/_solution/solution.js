/**
 * Quest 22.3: AI ROI Calculator — REFERENCE solution
 */

function calculateROI(data) {
  const { teamSize, monthlyCostPerDev, hoursSavedPerDevPerWeek, hourlyRate, weeksInQuarter } = data;

  const totalCost = teamSize * monthlyCostPerDev * 3;
  const totalSavings = teamSize * hoursSavedPerDevPerWeek * hourlyRate * weeksInQuarter;
  const netBenefit = totalSavings - totalCost;
  const roi = totalCost > 0 ? ((totalSavings - totalCost) / totalCost) * 100 : 0;

  let breakEvenWeeks;
  const weeklySavingsPerTeam = teamSize * hoursSavedPerDevPerWeek * hourlyRate;
  if (weeklySavingsPerTeam <= 0 || totalCost <= 0) {
    breakEvenWeeks = Infinity;
  } else {
    breakEvenWeeks = totalCost / weeklySavingsPerTeam;
  }

  // If ROI is negative, break-even is impossible
  if (roi < 0) {
    breakEvenWeeks = Infinity;
  }

  return {
    totalCost,
    totalSavings,
    roi: Math.round(roi * 100) / 100,
    breakEvenWeeks: Math.round(breakEvenWeeks * 10) / 10,
    netBenefit,
  };
}

module.exports = { calculateROI };
