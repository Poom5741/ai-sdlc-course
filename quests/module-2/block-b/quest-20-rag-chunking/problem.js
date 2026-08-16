/**
 * Quest 2.8: RAG Chunking Strategist — problem.js (learner edits this)
 *
 * Block: 2 - Advanced Capabilities | Difficulty: 🟡 Medium | Time: 25 minutes
 *
 * Tool skill: implement document chunking for RAG systems.
 * Engineering habit: CHUNK WISELY — how you split documents affects
 * retrieval quality. Too small loses context, too large dilutes relevance.
 *
 * Goal: write `chunkDocument(text, options)` that splits text into chunks.
 *
 * Parameters:
 *   - text: string — the document to chunk
 *   - options: { maxChunkSize?: number, overlap?: number, splitBy?: 'paragraph' | 'sentence' | 'words' }
 *
 * Return: string[] — array of text chunks
 *
 * Edge case: naive AI splits in the middle of words or sentences without
 * respecting boundaries.
 */

// TODO: implement chunkDocument(text, options).
function chunkDocument(text, options) {
  return [text];
}

module.exports = { chunkDocument };
