function prioritizeFiles(files, task, maxTokens) {
  const sorted = [...files].sort((a, b) => b.relevance - a.relevance);
  let tokensUsed = 0;
  const selected = [];
  for (const f of sorted) {
    if (tokensUsed + f.tokens <= maxTokens) {
      selected.push(f.name);
      tokensUsed += f.tokens;
    }
  }
  return selected;
}
module.exports = { prioritizeFiles };
