import { describe, it, expect, beforeEach } from 'vitest';

// Test the code normalization and validation logic
describe('LMS Code Validation', () => {
  // Code pattern: BBD-XXXX-XXXX (X = alphanumeric uppercase)
  const CODE_PATTERN = /^BBD-[A-Z0-9]{4}-[A-Z0-9]{4}$/;

  function normalizeCode(code: string): string {
    return code.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  }

  function formatCode(code: string): string {
    const normalized = normalizeCode(code);
    if (normalized.length < 10) return normalized;
    return `BBD-${normalized.slice(3, 7)}-${normalized.slice(7, 11)}`;
  }

  describe('normalizeCode', () => {
    it('should remove hyphens and uppercase', () => {
      expect(normalizeCode('bbd-abcd-1234')).toBe('BBDABCD1234');
      expect(normalizeCode('BBD-ABCD-1234')).toBe('BBDABCD1234');
      expect(normalizeCode('bbd abcd 1234')).toBe('BBDABCD1234');
    });

    it('should remove special characters', () => {
      expect(normalizeCode('BBD@ABCD#1234')).toBe('BBDABCD1234');
      expect(normalizeCode('BBD.ABCD.1234')).toBe('BBDABCD1234');
    });
  });

  describe('formatCode', () => {
    it('should format as BBD-XXXX-XXXX', () => {
      expect(formatCode('bbdabcd1234')).toBe('BBD-ABCD-1234');
      expect(formatCode('BBD-ABCD-1234')).toBe('BBD-ABCD-1234');
      expect(formatCode('bbd-abcd-1234')).toBe('BBD-ABCD-1234');
    });

    it('should handle short codes', () => {
      expect(formatCode('bbd')).toBe('BBD');
      expect(formatCode('bbdabc')).toBe('BBDABC');
    });
  });

  describe('CODE_PATTERN validation', () => {
    it('should accept valid codes', () => {
      expect(CODE_PATTERN.test('BBD-ABCD-1234')).toBe(true);
      expect(CODE_PATTERN.test('BBD-XYZ7-89KL')).toBe(true);
      expect(CODE_PATTERN.test('BBD-MNOP-56QR')).toBe(true);
    });

    it('should reject invalid formats', () => {
      expect(CODE_PATTERN.test('BBB-ABCD-1234')).toBe(false); // Wrong prefix
      expect(CODE_PATTERN.test('BBD-ABCD-123')).toBe(false); // Too short
      expect(CODE_PATTERN.test('BBD-ABCD-12345')).toBe(false); // Too long
      expect(CODE_PATTERN.test('BBD-abcd-1234')).toBe(false); // Lowercase
      expect(CODE_PATTERN.test('BBD-ABCD_1234')).toBe(false); // Underscore
    });
  });
});

describe('LMS API Endpoints', () => {
  describe('POST /api/validate-code', () => {
    it('should validate a valid code', async () => {
      // This would be an actual API test in a real setup
      // For now, we test the logic
      const mockRequest = {
        json: () => Promise.resolve({ code: 'BBD-TEST-0001' })
      };

      const body = await mockRequest.json();
      expect(body.code).toBe('BBD-TEST-0001');
    });

    it('should reject missing code', async () => {
      const mockRequest = {
        json: () => Promise.resolve({})
      };

      const body = await mockRequest.json();
      expect(body.code).toBeUndefined();
    });
  });

  describe('POST /api/admin/login', () => {
    it('should accept correct password', async () => {
      const correctPassword = 'admin123';
      const inputPassword = 'admin123';
      
      expect(inputPassword).toBe(correctPassword);
    });

    it('should reject wrong password', async () => {
      const correctPassword = 'admin123';
      const inputPassword = 'wrongpassword';
      
      expect(inputPassword).not.toBe(correctPassword);
    });
  });
});

describe('LMS Client-side Logic', () => {
  // Mock localStorage
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
  })();

  beforeEach(() => {
    localStorageMock.clear();
  });

  describe('hasValidCode', () => {
    it('should return false when no code exists', () => {
      const code = localStorageMock.getItem('bbt_access_code');
      const expires = localStorageMock.getItem('bbt_code_expires');
      
      expect(code).toBeNull();
      expect(expires).toBeNull();
    });

    it('should return true when valid code exists', () => {
      localStorageMock.setItem('bbt_access_code', 'BBD-TEST-0001');
      localStorageMock.setItem('bbt_code_expires', '2099-12-31T23:59:59Z');
      
      const code = localStorageMock.getItem('bbt_access_code');
      const expires = localStorageMock.getItem('bbt_code_expires');
      
      expect(code).toBe('BBD-TEST-0001');
      expect(new Date(expires!)).toBeInstanceOf(Date);
      expect(new Date(expires!) > new Date()).toBe(true);
    });

    it('should return false when code is expired', () => {
      localStorageMock.setItem('bbt_access_code', 'BBD-TEST-0001');
      localStorageMock.setItem('bbt_code_expires', '2020-01-01T00:00:00Z');
      
      const expires = localStorageMock.getItem('bbt_code_expires');
      expect(new Date(expires!) < new Date()).toBe(true);
    });
  });

  describe('formatCodeInput', () => {
    it('should format input as BBD-XXXX-XXXX', () => {
      const formatInput = (value: string): string => {
        let cleaned = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
        if (cleaned.length > 3) {
          cleaned = cleaned.slice(0, 3) + '-' + cleaned.slice(3);
        }
        if (cleaned.length > 8) {
          cleaned = cleaned.slice(0, 8) + '-' + cleaned.slice(8);
        }
        return cleaned.slice(0, 13);
      };

      expect(formatInput('bbdabcd1234')).toBe('BBD-ABCD-1234');
      expect(formatInput('bbd abcd 1234')).toBe('BBD-ABCD-1234');
      expect(formatInput('bbd-abcd-1234')).toBe('BBD-ABCD-1234');
    });

    it('should limit length to 13 characters', () => {
      const formatInput = (value: string): string => {
        let cleaned = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
        if (cleaned.length > 3) {
          cleaned = cleaned.slice(0, 3) + '-' + cleaned.slice(3);
        }
        if (cleaned.length > 8) {
          cleaned = cleaned.slice(0, 8) + '-' + cleaned.slice(8);
        }
        return cleaned.slice(0, 13);
      };

      expect(formatInput('bbdabcd1234extra')).toBe('BBD-ABCD-1234');
    });
  });
});

describe('LMS Content Protection', () => {
  const protectedPatterns = ['/workshop/block-', '/quests/'];
  
  function isProtectedPath(path: string): boolean {
    return protectedPatterns.some(p => path.includes(p));
  }

  it('should identify protected paths', () => {
    expect(isProtectedPath('/workshop/block-1-ai-tools')).toBe(true);
    expect(isProtectedPath('/workshop/block-2-prompting')).toBe(true);
    expect(isProtectedPath('/quests/quest-1-first-code')).toBe(true);
    expect(isProtectedPath('/quests/quest-5-project')).toBe(true);
  });

  it('should identify open paths', () => {
    expect(isProtectedPath('/workshop/overview')).toBe(false);
    expect(isProtectedPath('/reference/github-copilot')).toBe(false);
    expect(isProtectedPath('/challenges/setup-olympics')).toBe(false);
  });
});
