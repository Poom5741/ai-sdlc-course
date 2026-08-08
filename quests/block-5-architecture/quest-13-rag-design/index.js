/**
 * Quest 5.1: RAG Design
 * 
 * Block: 5 - Architecture
 * Difficulty: 🟡 Medium
 * Time: 20 minutes
 * 
 * Goal: Design a Retrieval-Augmented Generation system
 * 
 * Instructions:
 * 1. Understand RAG architecture
 * 2. Design the components
 * 3. Implement a basic RAG pipeline
 * 4. Test with sample documents
 */

// TODO: Implement Document Store
class DocumentStore {
  constructor() {
    this.documents = [];
    this.embeddings = new Map();
  }

  async addDocument(doc) {
    // Your implementation here
  }

  async search(query, topK = 3) {
    // Your implementation here
    return [];
  }
}

// TODO: Implement Embedding Service
class EmbeddingService {
  async embed(text) {
    // Your implementation here
    return [];
  }

  async similarity(a, b) {
    // Your implementation here
    return 0;
  }
}

// TODO: Implement RAG Pipeline
class RAGPipeline {
  constructor(documentStore, embeddingService) {
    this.documentStore = documentStore;
    this.embeddingService = embeddingService;
  }

  async retrieve(query) {
    // Your implementation here
    return [];
  }

  async generate(query, context) {
    // Your implementation here
    return '';
  }

  async query(question) {
    // Your implementation here
    return { answer: '', sources: [] };
  }
}

module.exports = {
  DocumentStore,
  EmbeddingService,
  RAGPipeline,
};
