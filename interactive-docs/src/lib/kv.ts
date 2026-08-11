// Cloudflare KV helper for LMS
// In development, we'll use an in-memory store
// In production, this uses Cloudflare KV binding

interface KVNamespace {
  get(key: string, type?: string): Promise<any>;
  put(key: string, value: string): Promise<void>;
  delete(key: string): Promise<void>;
  list(options?: { prefix?: string; limit?: number }): Promise<{ keys: { name: string }[] }>;
}

// In-memory fallback for development
class InMemoryKV implements KVNamespace {
  private store = new Map<string, string>();

  async get(key: string, type?: string): Promise<any> {
    const value = this.store.get(key);
    if (!value) return null;
    
    if (type === 'json') {
      try {
        return JSON.parse(value);
      } catch {
        return null;
      }
    }
    return value;
  }

  async put(key: string, value: string): Promise<void> {
    this.store.set(key, value);
  }

  async delete(key: string): Promise<void> {
    this.store.delete(key);
  }

  async list(options?: { prefix?: string; limit?: number }): Promise<{ keys: { name: string }[] }> {
    const keys = Array.from(this.store.keys())
      .filter(key => !options?.prefix || key.startsWith(options.prefix))
      .slice(0, options?.limit || 1000)
      .map(name => ({ name }));
    
    return { keys };
  }
}

// Singleton instance
let kvInstance: KVNamespace | null = null;

export async function getKVNamespace(): Promise<KVNamespace> {
  if (kvInstance) {
    return kvInstance;
  }

  // Check if we're in Cloudflare Workers environment
  // @ts-ignore - Cloudflare Workers globals
  if (typeof globalThis.caches !== 'undefined') {
    // In production, use the KV binding from wrangler
    // This would be configured in wrangler.toml
    // For now, fall back to in-memory
    console.warn('Cloudflare KV not configured, using in-memory store');
  }

  // Use in-memory store for development
  kvInstance = new InMemoryKV();
  
  // Seed some test data
  await seedTestData(kvInstance);
  
  return kvInstance;
}

async function seedTestData(kv: KVNamespace): Promise<void> {
  // Add some test codes
  const testCodes = [
    {
      code: 'BBD-TEST-0001',
      created: new Date().toISOString(),
      used: false,
      expires: '2025-12-31T23:59:59Z',
      plan: 'workshop-2024'
    },
    {
      code: 'BBD-USED-0002',
      created: new Date().toISOString(),
      used: true,
      usedAt: new Date().toISOString(),
      expires: '2025-12-31T23:59:59Z',
      plan: 'workshop-2024'
    }
  ];

  for (const codeData of testCodes) {
    await kv.put(`code:${codeData.code}`, JSON.stringify(codeData));
  }
}
