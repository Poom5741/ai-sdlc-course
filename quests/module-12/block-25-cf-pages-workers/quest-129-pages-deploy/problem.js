/**
 * Quest 25.1: REFERENCE solution (do NOT read during the exercise)
 *
 * Generates wrangler.toml for Cloudflare Pages deployment.
 */

function generateWranglerConfig(projectName, buildCmd, outputDir) {
  const errors = [];

  if (!projectName || projectName.trim() === '') {
    errors.push('project name is required');
  }
  if (!outputDir || outputDir.trim() === '') {
    errors.push('output directory is required');
  }

  if (errors.length > 0) {
    return { toml: '', isValid: false, errors };
  }

  const toml = `[project]
name = "${projectName}"
compatibility_date = "2024-01-01"
pages_build_output_dir = "${outputDir}"
build_command = "${buildCmd}"
`;

  return {
    toml,
    isValid: true,
    errors: [],
  };
}

module.exports = { generateWranglerConfig };
