/**
 * Quest 1.11: Model Architecture Classifier — REFERENCE solution
 */

function classifyArchitecture(config) {
  if (!config || !config.type || !config.attentionType) return 'UNKNOWN';

  const { type, attentionType } = config;

  if (type === 'encoder-only' && attentionType === 'bidirectional') return 'BERT';
  if (type === 'decoder-only' && attentionType === 'causal') return 'GPT';
  if (type === 'encoder-decoder' && attentionType === 'both') return 'T5';

  return 'UNKNOWN';
}

module.exports = { classifyArchitecture };
