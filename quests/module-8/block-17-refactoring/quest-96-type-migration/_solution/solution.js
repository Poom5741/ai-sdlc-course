/**
 * Quest 17.4: Type Migration Assistant — REFERENCE solution
 */

function addTypeAnnotations(code) {
  if (!code) return '';

  let result = code;

  // Convert var to let/const
  result = result.replace(/\bvar\b/g, 'const');

  // Add type annotations to function parameters and return types
  result = result.replace(
    /function\s+(\w+)\s*\(([^)]*)\)\s*\{([^}]*)\}/g,
    (match, name, params, body) => {
      const typedParams = params.split(',').map(p => {
        const trimmed = p.trim();
        if (!trimmed) return trimmed;
        const paramName = trimmed.split('=')[0].trim();
        // Infer type from usage in body
        let type = 'any';
        if (new RegExp(`\\b${paramName}\\s*\\+\\s*["']|["']\\s*\\+\\s*${paramName}|["'].*\\$\\{${paramName}\\}|${paramName}\\.length|${paramName}\\.concat|\\.concat\\(\\s*${paramName}`).test(body)) {
          type = 'string';
        } else if (new RegExp(`\\b${paramName}\\s*[\\*\\+\\-\\/]|${paramName}\\s*[<>]=?|${paramName}\\s*===?\\s*\\d`).test(body)) {
          type = 'number';
        }
        return `${paramName}: ${type}`;
      }).join(', ');

      // Infer return type
      let returnType = 'void';
      if (/return\s+["']|return\s+`/.test(body)) returnType = 'string';
      else if (/return\s+\d|return\s+\w+\s*[\*\+\-\/]/.test(body)) returnType = 'number';
      else if (/return\s+true|return\s+false/.test(body)) returnType = 'boolean';
      else if (/return\s+/.test(body)) returnType = 'any';

      return `function ${name}(${typedParams}): ${returnType} {${body}}`;
    }
  );

  return result;
}

module.exports = { addTypeAnnotations };
