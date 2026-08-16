/**
 * Quest 25.4: REFERENCE solution (do NOT read during the exercise)
 *
 * Validates Cloudflare Worker bindings and generates .dev.vars.
 */

function validateBindings(tomlContent, envVars) {
  const errors = [];
  const warnings = [];

  // Check for secrets in tomlContent (should be in .dev.vars)
  const secretPatterns = /(?:API_KEY|SECRET|PASSWORD|TOKEN|DATABASE_URL)\s*=\s*["'][^"']+["']/i;
  if (secretPatterns.test(tomlContent)) {
    warnings.push('Secrets detected in wrangler.toml — move them to .dev.vars for security');
  }

  // Check KV bindings
  const kvBindingRegex = /\[kv_namespaces\][\s\S]*?(?=\n\[|\n#|$)/gi;
  const kvMatches = tomlContent.match(kvBindingRegex) || [];
  for (const kv of kvMatches) {
    if (!/id\s*=\s*["'][\w-]+["']/.test(kv)) {
      errors.push('KV namespace missing "id" field');
    }
    if (!/preview_id\s*=\s*["'][\w-]+["']/.test(kv)) {
      errors.push('KV namespace missing "preview_id" field');
    }
  }

  // Check D1 bindings
  const d1BindingRegex = /\[\[d1_databases\]\][\s\S]*?(?=\n\[|\n#|$)/gi;
  const d1Matches = tomlContent.match(d1BindingRegex) || [];
  for (const d1 of d1Matches) {
    if (!/database_id\s*=\s*["'][\w-]+["']/.test(d1)) {
      errors.push('D1 database missing "database_id" field');
    }
  }

  // Check R2 bindings
  const r2BindingRegex = /\[\[r2_buckets\]\][\s\S]*?(?=\n\[|\n#|$)/gi;
  const r2Matches = tomlContent.match(r2BindingRegex) || [];
  for (const r2 of r2Matches) {
    if (!/bucket_name\s*=\s*["'][\w-]+["']/.test(r2)) {
      errors.push('R2 bucket missing "bucket_name" field');
    }
  }

  // Generate .dev.vars content
  const devVars = Object.entries(envVars)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  return {
    valid: errors.length === 0,
    errors,
    devVars,
    warnings,
  };
}

module.exports = { validateBindings };
