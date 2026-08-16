/**
 * Quest 4.14: Dockerfile Generator — problem.js (learner edits this)
 *
 * Block: 10 - DevOps & Deployment | Difficulty: 🟢 Easy | Time: 20 minutes
 *
 * Tool skill: generate optimized Dockerfiles from project descriptions.
 * Engineering habit: OPTIMIZE CONTAINERS — small, secure images = faster
 * deploys and smaller attack surface. Use multi-stage builds and non-root.
 *
 * Goal: write `generateDockerfile(project)` that returns a Dockerfile string.
 *
 *   project: { language, framework, port, hasDB, hasRedis }
 *
 * Returns: string (complete Dockerfile content)
 *
 * Requirements:
 *   - Multi-stage build (builder + production)
 *   - Non-root user (USER node or similar)
 *   - EXPOSE the correct port
 *   - HEALTHCHECK instruction
 *   - .dockerignore patterns as comment
 *
 * Edge case: naive AI generates a single-stage Dockerfile running as root.
 * The generator MUST produce multi-stage builds and non-root user.
 */

// TODO: implement generateDockerfile(project) here.
function generateDockerfile(project) {
  return '# stub';
}

module.exports = { generateDockerfile };
