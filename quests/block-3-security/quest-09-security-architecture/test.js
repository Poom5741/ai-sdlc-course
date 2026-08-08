/**
 * Quest 3.3: Security Architecture - Test Suite
 */

const {
  SecurityArchitect,
  AuthenticationControl,
  AuthorizationControl,
  EncryptionControl,
} = require('./index.js');

let passed = 0;
let failed = 0;

console.log("Quest 3.3: Security Architecture\n");
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
  // SecurityArchitect tests
  test('SecurityArchitect can be instantiated', () => {
    const architect = new SecurityArchitect('Test System');
    assert(architect instanceof SecurityArchitect);
    assert(architect.systemName === 'Test System');
  });

  test('SecurityArchitect has addControl method', () => {
    const architect = new SecurityArchitect('Test System');
    assert(typeof architect.addControl === 'function');
  });

  test('SecurityArchitect has addThreat method', () => {
    const architect = new SecurityArchitect('Test System');
    assert(typeof architect.addThreat === 'function');
  });

  test('SecurityArchitect has generateDocument method', () => {
    const architect = new SecurityArchitect('Test System');
    assert(typeof architect.generateDocument === 'function');
  });

  test('SecurityArchitect has validateRequirements method', () => {
    const architect = new SecurityArchitect('Test System');
    assert(typeof architect.validateRequirements === 'function');
  });

  // AuthenticationControl tests
  test('AuthenticationControl can be instantiated', () => {
    const auth = new AuthenticationControl();
    assert(auth instanceof AuthenticationControl);
    assert(auth.type === 'authentication');
  });

  test('AuthenticationControl has authenticate method', () => {
    const auth = new AuthenticationControl();
    assert(typeof auth.authenticate === 'function');
  });

  // AuthorizationControl tests
  test('AuthorizationControl can be instantiated', () => {
    const authz = new AuthorizationControl();
    assert(authz instanceof AuthorizationControl);
    assert(authz.type === 'authorization');
  });

  test('AuthorizationControl has authorize method', () => {
    const authz = new AuthorizationControl();
    assert(typeof authz.authorize === 'function');
  });

  // EncryptionControl tests
  test('EncryptionControl can be instantiated', () => {
    const encryption = new EncryptionControl();
    assert(encryption instanceof EncryptionControl);
    assert(encryption.type === 'encryption');
  });

  test('EncryptionControl has encrypt method', () => {
    const encryption = new EncryptionControl();
    assert(typeof encryption.encrypt === 'function');
  });

  test('EncryptionControl has decrypt method', () => {
    const encryption = new EncryptionControl();
    assert(typeof encryption.decrypt === 'function');
  });

  console.log(`\nResults: ${passed} passed, ${failed} failed`);

  if (failed === 0) {
    console.log("\n🎉 Quest 3.3 Complete! You've designed a secure architecture.");
    process.exit(0);
  } else {
    console.log("\n💡 Hint: Security architecture requires authentication, authorization, and encryption controls.");
    process.exit(1);
  }
}

runTests();
