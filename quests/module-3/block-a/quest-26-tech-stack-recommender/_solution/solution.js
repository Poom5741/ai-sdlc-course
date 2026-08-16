function recommendStack(req) {
  const stacks = {
    small: { frontend: 'React/Vue', backend: 'Express/Flask', database: 'SQLite/PostgreSQL', deployment: 'Vercel/Railway', rationale: 'Simple stack for small team' },
    enterprise: { frontend: 'React/Angular', backend: 'Node/Java/Spring', database: 'PostgreSQL/MongoDB', deployment: 'AWS/GCP/K8s', rationale: 'Scalable stack for large teams' }
  };
  return stacks[req.scale] || stacks.small;
}
module.exports = { recommendStack };
