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
