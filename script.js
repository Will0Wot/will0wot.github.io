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
    title: 'NBA MVP Prediction Model',
    description:
      'Engineered scikit-learn pipelines and Power BI visualizations to predict MVP candidates using historical box score data and efficiency metrics.',
    tags: ['Pandas', 'PyTorch', 'NBA API', 'Scikit-Learn', 'PowerBI', 'Kaggle'],
    focus: ['ml', 'analytics'],
    links: {
      repo: 'https://github.com/WilliamDesa/nba-mvp-prediction'
    }
  },
  {
    title: 'Legend of Zelda: 2D Escape',
    description:
      '- Applied Scrum methodology for development, incorporating Object-Oriented Design principles and UML diagrams.\n- Wrote integration and unit tests, identifying and documenting bugs using Jira during the testing phases.\n- Refactored code to resolve hierarchy problems and code smells, improving maintainability and extensibility.',
    tags: ['C++', 'Maven', 'Apache', 'Jira'],
    focus: ['ml'],
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
    anchor.rel = 'noreferrer';
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
    return;
  }

  filtered.forEach((project) => projectList.appendChild(createProjectCard(project)));
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
