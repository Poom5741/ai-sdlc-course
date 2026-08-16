/**
 * Quest 19.4: Accessibility Checker — REFERENCE solution
 */

function checkAccessibility(html) {
  if (!html) return [];
  const results = [];
  const lines = html.split('\n');

  lines.forEach((line, i) => {
    // img without alt — but skip decorative images
    if (/<img\b/.test(line) && !/alt\s*=/.test(line) && !/role\s*=\s*["']presentation["']/.test(line)) {
      results.push({ rule: 'img-alt', severity: 'error', line: i + 1, message: 'Image must have alt attribute' });
    }

    // input without label
    if (/<input\b/.test(line) && !/aria-label/.test(line) && !/id\s*=/.test(line)) {
      results.push({ rule: 'input-label', severity: 'error', line: i + 1, message: 'Input must have associated label' });
    }

    // empty button
    if (/<button[^>]*>\s*<\/button>/.test(line)) {
      results.push({ rule: 'button-text', severity: 'error', line: i + 1, message: 'Button must have accessible text' });
    }

  });

  // Check for heading skips across the entire HTML
  const headingRegex = /<h(\d)[^>]*>/gi;
  const headings = [];
  let hm;
  while ((hm = headingRegex.exec(html)) !== null) {
    headings.push({ level: parseInt(hm[1]), index: hm.index });
  }
  for (let i = 1; i < headings.length; i++) {
    if (headings[i].level - headings[i - 1].level > 1) {
      const lineNum = html.substring(0, headings[i].index).split('\n').length;
      results.push({ rule: 'heading-skip', severity: 'warning', line: lineNum, message: `Heading level skip from h${headings[i - 1].level} to h${headings[i].level}` });
    }
  }

  return results;
}

module.exports = { checkAccessibility };
