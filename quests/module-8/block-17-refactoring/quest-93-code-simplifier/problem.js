/**
 * Quest 17.1: Code Simplifier — REFERENCE solution
 */

function simplify(code) {
  if (!code) return '';

  let result = code;

  // Simplify if/else returning true/false → return condition directly
  result = result.replace(
    /if\s*\(([^)]+)\)\s*\{\s*return\s+true;?\s*\}\s*else\s*\{\s*return\s+false;?\s*\}/g,
    'return $1'
  );

  // Remove redundant else after return
  result = result.replace(
    /return\s+([^;]+);\s*\}\s*else\s*\{/g,
    'return $1; } else {'
  );

  // Simplify if/else both returning → early returns
  result = result.replace(
    /if\s*\(([^)]+)\)\s*\{\s*return\s+([^;]+);\s*\}\s*else\s*\{\s*return\s+([^;]+);\s*\}/g,
    'if ($1) return $2;\n  return $3;'
  );

  return result;
}

module.exports = { simplify };
