/**
 * Quest 4.15: IaC Generator — REFERENCE solution (do NOT import or read during the exercise)
 */

function generateIaC(infra) {
  const sensitiveKeys = ['password', 'secret', 'key', 'token', 'credential'];
  let hcl = `# Generated Terraform configuration
# Provider: ${infra.provider}

terraform {
  required_providers {
    ${infra.provider} = {
      source  = "hashicorp/${infra.provider}"
      version = "~> 5.0"
    }
  }
}

provider "${infra.provider}" {
  region = var.region
}

`;

  // Collect variables for sensitive values
  const variables = new Set();
  variables.add('region');

  for (const resource of infra.resources) {
    hcl += `resource "${resource.type}" "${resource.name}" {\n`;
    for (const [key, value] of Object.entries(resource.config)) {
      const isSensitive = sensitiveKeys.some(sk => key.toLowerCase().includes(sk));
      if (isSensitive) {
        const varName = `${resource.name}_${key}`;
        variables.add(varName);
        hcl += `  ${key} = var.${varName}\n`;
      } else {
        hcl += `  ${key} = ${JSON.stringify(value)}\n`;
      }
    }
    hcl += `}\n\n`;
  }

  // Variable declarations
  for (const v of variables) {
    const isSensitive = sensitiveKeys.some(sk => v.includes(sk));
    hcl += `variable "${v}" {\n`;
    if (isSensitive) hcl += `  sensitive = true\n`;
    hcl += `  type      = string\n}\n\n`;
  }

  // Outputs
  for (const resource of infra.resources) {
    hcl += `output "${resource.name}_id" {\n  value = ${resource.type}.${resource.name}.id\n}\n\n`;
  }

  return hcl;
}

module.exports = { generateIaC };
