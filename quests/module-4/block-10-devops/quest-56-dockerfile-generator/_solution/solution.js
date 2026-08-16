/**
 * Quest 4.14: Dockerfile Generator — REFERENCE solution (do NOT import or read during the exercise)
 */

function generateDockerfile(project) {
  const { language, framework, port, hasDB, hasRedis } = project;
  const isNode = language === 'node';
  const base = isNode ? 'node:20-alpine' : 'python:3.12-slim';
  const workdir = '/app';

  let dockerfile = `# Multi-stage build for ${framework} on ${language}
# .dockerignore: node_modules, .git, *.md, .env*

# Stage 1: Builder
FROM ${base} AS builder
WORKDIR ${workdir}
`;

  if (isNode) {
    dockerfile += `COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build 2>/dev/null || true
`;
  } else {
    dockerfile += `COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
`;
  }

  dockerfile += `
# Stage 2: Production
FROM ${base}
WORKDIR ${workdir}

# Non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=builder ${workdir} .
`;

  if (isNode) {
    dockerfile += `RUN npm prune --production
`;
  }

  dockerfile += `
USER appuser
EXPOSE ${port}

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \\
  CMD wget --no-verbose --tries=1 --spider http://localhost:${port}/health || exit 1

CMD ["npm", "start"]
`;

  return dockerfile;
}

module.exports = { generateDockerfile };
