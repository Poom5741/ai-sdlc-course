/**
 * Quest 26.4: REFERENCE solution (do NOT read during the exercise)
 *
 * Generates complete Cloudflare deployment configuration.
 */

function generateFullStackConfig(projectConfig) {
  const errors = [];
  const bindings = {};
  const migrations = [];

  if (!projectConfig.name || projectConfig.name.trim() === '') {
    errors.push('project name is required');
  }
  if (!projectConfig.environment || !['preview', 'production'].includes(projectConfig.environment)) {
    errors.push('environment must be "preview" or "production"');
  }
  if (!Array.isArray(projectConfig.features)) {
    errors.push('features must be an array');
  }

  if (errors.length > 0) {
    return { wranglerToml: '', migrations: [], bindings: {}, errors };
  }

  const { name, features, environment } = projectConfig;
  const envSuffix = environment === 'preview' ? '_preview' : '';

  // Generate wrangler.toml sections
  let toml = `name = "${name}"
compatibility_date = "2024-01-01"
pages_build_output_dir = "./dist"
`;

  // KV binding
  if (features.includes('kv')) {
    bindings['KV'] = `kv-${name}${envSuffix}`;
    toml += `
[[kv_namespaces]]
binding = "KV"
id = "kv-${name}-${environment}"
preview_id = "kv-${name}-preview"
`;
  }

  // D1 binding
  if (features.includes('d1')) {
    bindings['DB'] = `d1-${name}${envSuffix}`;
    toml += `
[[d1_databases]]
binding = "DB"
database_name = "${name}-db"
database_id = "d1-${name}-${environment}"
`;
    // Generate migration SQL
    migrations.push(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);`);
  }

  // R2 binding
  if (features.includes('r2')) {
    bindings['MY_BUCKET'] = `r2-${name}${envSuffix}`;
    toml += `
[[r2_buckets]]
binding = "MY_BUCKET"
bucket_name = "${name}-bucket-${environment}"
`;
  }

  // Pages Functions
  if (features.includes('pages-functions')) {
    toml += `
# Cloudflare Pages Functions
[build]
command = "npm run build"
`;
  }

  // Add environment marker
  toml += `
# Environment: ${environment}
`;

  return {
    wranglerToml: toml,
    migrations,
    bindings,
    errors: [],
  };
}

module.exports = { generateFullStackConfig };
