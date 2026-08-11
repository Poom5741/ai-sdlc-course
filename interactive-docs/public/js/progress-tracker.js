// Progress tracking — adds checkmarks to visited sidebar links
const STORAGE_KEY = 'workshop-visited-pages';

function getVisitedPages() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function markPageVisited(url) {
  const visited = getVisitedPages();
  if (!visited.includes(url)) {
    visited.push(url);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(visited));
  }
}

function addProgressIndicators() {
  const visited = getVisitedPages();
  document.querySelectorAll('.sidebar-item a, [role="list"] a, a[href^="/workshop"], a[href^="/quests"]').forEach(el => {
    const href = el.getAttribute('href');
    if (href && visited.includes(href) && !el.querySelector('.progress-check')) {
      const check = document.createElement('span');
      check.className = 'progress-check';
      check.textContent = ' ✓';
      check.style.color = 'var(--trail-green, #059669)';
      check.style.fontWeight = 'bold';
      check.style.marginLeft = '0.25rem';
      el.appendChild(check);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  markPageVisited(window.location.pathname);
  addProgressIndicators();
});

document.addEventListener('astro:page-load', () => {
  markPageVisited(window.location.pathname);
  addProgressIndicators();
});
