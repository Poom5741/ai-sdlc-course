/**
 * Quest 3.3: Security Architecture
 * 
 * Block: 3 - Security
 * Difficulty: 🔴 Hard
 * Time: 25 minutes
 * 
 * Goal: Design a secure system architecture
 * 
 * Instructions:
 * 1. Choose a system to secure (chatbot, API, etc.)
 * 2. Identify security requirements
 * 3. Design security controls
 * 4. Document the architecture
 */

// TODO: Implement a Security Architecture Designer
class SecurityArchitect {
  constructor(systemName) {
    this.systemName = systemName;
    this.controls = [];
    this.threats = [];
  }

  addControl(name, type, description) {
    this.controls.push({ name, type, description });
  }

  addThreat(name, severity, mitigation) {
    this.threats.push({ name, severity, mitigation });
  }

  generateDocument() {
    return {
      system: this.systemName,
      controls: this.controls,
      threats: this.threats,
      recommendations: this.controls.map(c => `Implement ${c.type}: ${c.name}`),
    };
  }

  validateRequirements(requirements) {
    const required = ['authentication', 'authorization', 'encryption'];
    const missing = required.filter(r => !this.controls.some(c => c.type === r));
    return { valid: missing.length === 0, missing };
  }
}

// TODO: Implement specific security controls
class AuthenticationControl {
  constructor() {
    this.type = 'authentication';
  }

  async authenticate(credentials) {
    if (!credentials || !credentials.username || !credentials.password) {
      return { authenticated: false, token: null };
    }
    const token = Buffer.from(JSON.stringify({ user: credentials.username })).toString('base64');
    return { authenticated: true, token };
  }
}

class AuthorizationControl {
  constructor() {
    this.type = 'authorization';
  }

  async authorize(token, resource, action) {
    if (!token) return { authorized: false };
    // Simple authorization - in production use proper RBAC
    return { authorized: true };
  }
}

class EncryptionControl {
  constructor() {
    this.type = 'encryption';
  }

  async encrypt(data) {
    const crypto = require('crypto');
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return { encrypted, key: key.toString('hex'), iv: iv.toString('hex') };
  }

  async decrypt(encryptedData) {
    const crypto = require('crypto');
    const { encrypted, key, iv } = encryptedData;
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return { decrypted: JSON.parse(decrypted) };
  }
}

module.exports = {
  SecurityArchitect,
  AuthenticationControl,
  AuthorizationControl,
  EncryptionControl,
};
