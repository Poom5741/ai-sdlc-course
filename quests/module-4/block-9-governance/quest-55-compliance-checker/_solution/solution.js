/**
 * Quest 4.13: Compliance Checklist Automator — REFERENCE solution (do NOT import or read during the exercise)
 */

function checkCompliance(codebase, checklist) {
  const results = [];
  const files = codebase.files || {};

  for (const item of checklist) {
    const regex = new RegExp(item.check, 'i');
    let found = false;
    let evidence = '';

    for (const [path, content] of Object.entries(files)) {
      if (regex.test(content)) {
        found = true;
        evidence = `Found in ${path}`;
        break;
      }
    }

    if (!found) {
      evidence = `Not found in any file (checked ${Object.keys(files).length} files)`;
    }

    results.push({
      id: item.id,
      name: item.name,
      status: found ? 'passed' : 'failed',
      severity: item.severity,
      category: item.category,
      evidence,
    });
  }

  return {
    passed: results.filter(r => r.status === 'passed').length,
    failed: results.filter(r => r.status === 'failed').length,
    skipped: 0,
    results,
  };
}

module.exports = { checkCompliance };
