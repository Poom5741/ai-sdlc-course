/**
 * Quest 4.4: Auth System Hardener — REFERENCE solution (do NOT import or read during the exercise)
 */

const crypto = require('crypto');

function hashPassword(password) {
  if (password.length < 8) throw new Error('Password must be at least 8 characters');
  if (!/[A-Z]/.test(password) && !/[0-9]/.test(password)) {
    throw new Error('Password must contain uppercase or digit');
  }
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return { hash, salt };
}

function verifyPassword(password, hash, salt) {
  const computed = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return computed === hash;
}

function createToken(userId, secret, expiresInMs) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    userId,
    iat: Date.now(),
    exp: Date.now() + expiresInMs,
  })).toString('base64url');
  const signature = crypto.createHmac('sha256', secret).update(`${header}.${payload}`).digest('base64url');
  return `${header}.${payload}.${signature}`;
}

function verifyToken(token, secret) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return { userId: null, valid: false, reason: 'malformed' };

    const [header, payload, signature] = parts;
    const expectedSig = crypto.createHmac('sha256', secret).update(`${header}.${payload}`).digest('base64url');

    if (signature !== expectedSig) return { userId: null, valid: false, reason: 'invalid signature' };

    const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
    if (Date.now() > data.exp) return { userId: data.userId, valid: false, reason: 'expired' };

    return { userId: data.userId, valid: true };
  } catch {
    return { userId: null, valid: false, reason: 'parse error' };
  }
}

module.exports = { hashPassword, verifyPassword, createToken, verifyToken };
