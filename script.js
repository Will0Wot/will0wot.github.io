const projects = [
  {
    title: 'Grocery Trends Analysis Platform',
    description:
      'Combined pandas, SQL, and Power BI to surface demand seasonality and top-selling items, guiding strategic inventory decisions for grocers.',
    tags: ['Python', 'pandas', 'SQL', 'Power BI', 'Excel'],
    focus: ['analytics'],
    links: {
      repo: 'https://github.com/Will0Wot/Groccery-Price-Analysis-'
    }
  },
  {
    title: 'NBA Matchup Prediction Engine',
    description:
      'This project provides a small Python package for analysing NBA player game logs and building a matchup-level model that estimates the probability of a team winning against a specific opponent. The workflow extracts team strengths from player‑level statistics, trains a logistic regression model, and produces actionable insights about the most important matchup factors.',
    tags: ['Pandas', 'Scikit-Learn', 'Matplotlib', 'NBA API'],
    focus: ['ml', 'analytics'],
    links: {
      repo: 'https://github.com/Will0Wot/nba_project_ML_predict'
    }
  },
  {
    title: 'Legend of Zelda: 2D Escape',
    description:
      'Top-down 2D maze/puzzle game inspired by The Legend of Zelda. Implemented player movement, collision, enemy behaviors, pickups, and level progression; documented the design with UML and applied OOP patterns. Wrote unit and integration tests and managed tasks/bugs in Jira to deliver a stable, polished build.',
    tags: ['C++', 'Maven', 'Apache', 'Jira'],
    focus: ['se'],
    links: {
      repo: 'https://github.com/Will0Wot/Maze_Game'
    }
  }
];

const projectList = document.getElementById('project-list');
const filterButtons = document.querySelectorAll('.filter-btn');
const navToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const yearEl = document.getElementById('year');

// --- Responsive/device helpers & accessibility live region ---
// Create a polite live region for screen readers to announce updates.
const srLive = document.createElement('div');
srLive.setAttribute('role', 'status');
srLive.setAttribute('aria-live', 'polite');
// Visually hidden but readable by assistive tech
srLive.style.position = 'absolute';
srLive.style.width = '1px';
srLive.style.height = '1px';
srLive.style.padding = '0';
srLive.style.margin = '-1px';
srLive.style.overflow = 'hidden';
srLive.style.clip = 'rect(0, 0, 0, 0)';
srLive.style.whiteSpace = 'nowrap';
srLive.style.border = '0';
document.body.appendChild(srLive);

function announceUpdate(message) {
  srLive.textContent = message;
}

// Fix mobile Safari 100vh issues by setting a custom --vh unit.
function setViewportHeightVar() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Apply device capability/orientation classes for CSS to adapt layouts.
function updateTouchClass() {
  const isTouch =
    'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  document.documentElement.classList.toggle('is-touch', Boolean(isTouch));
}

function updateOrientationClass() {
  const portrait = window.matchMedia('(orientation: portrait)').matches;
  document.documentElement.classList.toggle('is-portrait', portrait);
  document.documentElement.classList.toggle('is-landscape', !portrait);
}

// Debounced resize/orientation handling
let _resizeTimer;
function onResizeDebounced() {
  window.clearTimeout(_resizeTimer);
  _resizeTimer = window.setTimeout(() => {
    setViewportHeightVar();
    updateOrientationClass();
  }, 150);
}

// Enhance keyboard navigation for filter buttons on small screens.
function setupFilterKeyboardNav() {
  const buttons = Array.from(filterButtons);
  buttons.forEach((btn, idx) => {
    // Ensure buttons can be focused in all browsers
    btn.setAttribute('tabindex', '0');
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const dir = e.key === 'ArrowRight' ? 1 : -1;
        const next = buttons[(idx + dir + buttons.length) % buttons.length];
        next.focus();
      }
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });
}

// Initialize responsive helpers
setViewportHeightVar();
updateTouchClass();
updateOrientationClass();
window.addEventListener('resize', onResizeDebounced);
window.matchMedia('(orientation: portrait)').addEventListener('change', updateOrientationClass);
window.addEventListener('touchstart', updateTouchClass, { once: true });
setupFilterKeyboardNav();
/**
 * Inject CSS so full-height sections size correctly on mobile.
 * Apply to any sections you consider "full height" in your HTML:
 *   <section class="hero"> ... </section>
 *   <section class="full-height-section"> ... </section>
 */
(function injectViewportHeightCSS() {
  const style = document.createElement('style');
  style.setAttribute('data-injected', 'vh-fix');
  style.textContent = `
    .hero,
    .full-height-section {
      height: calc(var(--vh, 1vh) * 100);
    }
  `;
  document.head.appendChild(style);
})();
// --- End responsive/device helpers ---

function createProjectCard(project) {
  const card = document.createElement('article');
  card.className = 'project-card';
  card.dataset.category = project.focus.join(' · ');
  card.setAttribute('role', 'listitem');

  const title = document.createElement('h3');
  title.textContent = project.title;

  const desc = document.createElement('p');
  desc.textContent = project.description;

  const meta = document.createElement('div');
  meta.className = 'project-meta';
  project.tags.forEach((tag) => {
    const badge = document.createElement('span');
    badge.className = 'tag';
    badge.textContent = tag;
    meta.appendChild(badge);
  });

  const links = document.createElement('div');
  links.className = 'project-links';
  Object.entries(project.links).forEach(([key, url]) => {
    if (!url) return;
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    anchor.textContent = key === 'repo' ? 'View code' : key === 'demo' ? 'Live demo' : 'Read paper';
    links.appendChild(anchor);
  });

  card.append(title, desc, meta, links);
  return card;
}

function renderProjects(filter = 'all') {
  projectList.innerHTML = '';
  const filtered =
    filter === 'all' ? projects : projects.filter((project) => project.focus.includes(filter));

  if (!filtered.length) {
    const emptyState = document.createElement('p');
    emptyState.textContent = 'No projects found for this focus area just yet. Check back soon!';
    emptyState.className = 'empty-state';
    projectList.appendChild(emptyState);
    announceUpdate(`No projects found for "${filter}" focus yet.`);
    return;
  }

  filtered.forEach((project) => projectList.appendChild(createProjectCard(project)));
  const label = filter === 'all' ? 'all focus areas' : `"${filter}"`;
  announceUpdate(`${filtered.length} project${filtered.length === 1 ? '' : 's'} shown for ${label}.`);
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((btn) => btn.classList.toggle('is-active', btn === button));
    renderProjects(filter);
  });
});

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

renderProjects();

// CSS tip:
// Use height: calc(var(--vh, 1vh) * 100) on full-height sections to ensure proper sizing
// across mobile browsers (especially iOS Safari).
