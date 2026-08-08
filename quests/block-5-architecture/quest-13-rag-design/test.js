/**
 * Quest 5.1: RAG Design - Test Suite
 */

const {
  DocumentStore,
  EmbeddingService,
  RAGPipeline,
} = require('./index.js');

let passed = 0;
let failed = 0;

console.log("Quest 5.1: RAG Design\n");
console.log("Running tests...\n");

function test(description, fn) {
  try {
    fn();
    console.log(`✅ ${description}`);
    passed++;
  } catch (error) {
    console.log(`❌ ${description}`);
    console.log(`   ${error.message}`);
    failed++;
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

async function runTests() {
  // DocumentStore tests
  test('DocumentStore can be instantiated', () => {
    const store = new DocumentStore();
    assert(store instanceof DocumentStore);
  });

  test('DocumentStore has addDocument method', () => {
    const store = new DocumentStore();
    assert(typeof store.addDocument === 'function');
  });

  test('DocumentStore has search method', () => {
    const store = new DocumentStore();
    assert(typeof store.search === 'function');
  });

  // EmbeddingService tests
  test('EmbeddingService can be instantiated', () => {
    const service = new EmbeddingService();
    assert(service instanceof EmbeddingService);
  });

  test('EmbeddingService has embed method', () => {
    const service = new EmbeddingService();
    assert(typeof service.embed === 'function');
  });

  test('EmbeddingService has similarity method', () => {
    const service = new EmbeddingService();
    assert(typeof service.similarity === 'function');
  });

  // RAGPipeline tests
  test('RAGPipeline can be instantiated', () => {
    const store = new DocumentStore();
    const service = new EmbeddingService();
    const pipeline = new RAGPipeline(store, service);
    assert(pipeline instanceof RAGPipeline);
  });

  test('RAGPipeline has retrieve method', () => {
    const store = new DocumentStore();
    const service = new EmbeddingService();
    const pipeline = new RAGPipeline(store, service);
    assert(typeof pipeline.retrieve === 'function');
  });

  test('RAGPipeline has generate method', () => {
    const store = new DocumentStore();
    const service = new EmbeddingService();
    const pipeline = new RAGPipeline(store, service);
    assert(typeof pipeline.generate === 'function');
  });

  test('RAGPipeline has query method', () => {
    const store = new DocumentStore();
    const service = new EmbeddingService();
    const pipeline = new RAGPipeline(store, service);
    assert(typeof pipeline.query === 'function');
  });

  console.log(`\nResults: ${passed} passed, ${failed} failed`);

  if (failed === 0) {
    console.log("\n🎉 Quest 5.1 Complete! You've designed a RAG system.");
    process.exit(0);
  } else {
    console.log("\n💡 Hint: RAG combines retrieval (finding relevant docs) with generation (creating answers).");
    process.exit(1);
  }
}

runTests();
