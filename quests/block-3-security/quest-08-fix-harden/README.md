# Quest 3.2: Fix and Harden

**Block**: 3 - Security | **Difficulty**: 🟡 Medium | **Time**: 20 minutes

## 🎯 Learning Objectives

- Fix common security vulnerabilities
- Apply security hardening techniques
- Write secure code

## 📋 Instructions

1. **Review vulnerable code**: Look at the previous quest's findings
2. **Fix each vulnerability**: Apply secure coding practices
3. **Test your fixes**: Verify vulnerabilities are resolved
4. **Document changes**: Record what you fixed and why

## 🚀 Getting Started

### Vulnerabilities to Fix

1. **SQL Injection**: Use parameterized queries
2. **Hardcoded Secrets**: Use environment variables
3. **Weak Hashing**: Use bcrypt or argon2
4. **Input Validation**: Validate all inputs
5. **Path Traversal**: Sanitize file paths
6. **XSS**: Sanitize HTML output

## ✅ Verification

Run the test suite:

```bash
npm test
```

## 💡 Hints

- **Parameterized Queries**: Use `?` placeholders instead of string concatenation
- **Environment Variables**: Use `process.env.SECRET_KEY`
- **Password Hashing**: Use `bcrypt.hash()` instead of MD5
- **Input Validation**: Check types, ranges, and formats
- **Path Sanitization**: Use `path.normalize()` and validate against allowed directories
- **HTML Sanitization**: Use a library like `DOMPurify`

## 🔍 What You'll Learn

- **Secure Coding**: How to write code that resists attacks
- **Defense in Depth**: Multiple layers of protection
- **Input Validation**: Never trust user input

## 📚 Resources

- [OWASP Secure Coding Practices](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)

## ⏭️ Next Quest

[Quest 3.3: Security Architecture](../quest-09-security-architecture/)
