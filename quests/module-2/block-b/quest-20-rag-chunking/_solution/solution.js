/**
 * Quest 2.8: RAG Chunking Strategist — REFERENCE solution
 */
function chunkDocument(text, options = {}) {
  const { maxChunkSize = 500, overlap = 0, splitBy = 'paragraph' } = options;
  
  let segments;
  if (splitBy === 'paragraph') {
    segments = text.split(/\n\n+/);
  } else if (splitBy === 'sentence') {
    segments = text.split(/(?<=[.!?])\s+/);
  } else {
    segments = text.split(/\s+/);
  }
  
  const chunks = [];
  let current = '';
  
  for (const seg of segments) {
    if (current.length + seg.length + 1 > maxChunkSize && current.length > 0) {
      chunks.push(current.trim());
      current = overlap > 0 ? current.slice(-overlap) + ' ' + seg : seg;
    } else {
      current = current ? current + ' ' + seg : seg;
    }
  }
  
  if (current.trim()) chunks.push(current.trim());
  return chunks.length > 0 ? chunks : [text];
}
module.exports = { chunkDocument };
