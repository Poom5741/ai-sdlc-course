/**
 * Quest 4.15: IaC Generator — problem.js (learner edits this)
 *
 * Block: 10 - DevOps & Deployment | Difficulty: 🟡 Medium | Time: 25 minutes
 *
 * Tool skill: generate infrastructure-as-code (Terraform-style).
 * Engineering habit: INFRASTRUCTURE AS CODE — if you can't version control
 * it, you can't review it, test it, or roll it back.
 *
 * Goal: write `generateIaC(infra)` that returns a Terraform HCL string.
 *
 *   infra: { provider, resources: [{ type, name, config }] }
 *
 * Returns: string (Terraform HCL)
 *
 * Requirements:
 *   - Provider block at the top
 *   - Each resource as a terraform resource block
 *   - Variables for sensitive values
 *   - Outputs for resource IDs
 *
 * Edge case: naive AI hardcodes values like passwords and API keys in
 * resource blocks. The generator MUST use variables for sensitive data.
 */

// TODO: implement generateIaC(infra) here.
function generateIaC(infra) {
  return '# stub';
}

module.exports = { generateIaC };
