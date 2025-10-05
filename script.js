const projects = [
  {
    title: 'Clinical Operations Analytics Modernization',
    description:
      "Partnered with BC Children's Hospital leadership to unify patient flow, utilization, and staffing insights.",
    impact:
      'Cut reporting lag by 30% by orchestrating automated Python ETL jobs and Power BI refresh schedules.',
    highlights: [
      'Productionized pandas and SQL Server scripts to ingest 15+ departmental data sources nightly.',
      'Built drill-down dashboards surfacing census, acuity, and OR throughput with row-level security.',
      'Facilitated bi-weekly briefings translating analytics into equipment and staffing adjustments.'
    ],
    tags: ['Python', 'SQL Server', 'Power BI', 'ETL Automation'],
    focus: ['analytics'],
    links: {}
  },
  {
    title: 'Langara Predictive Analytics Curriculum',
    description:
      'Designed an applied machine learning toolkit for diploma and continuing studies cohorts.',
    impact:
      'Enabled 60+ learners to deliver regression and classification projects with reproducible notebooks.',
    highlights: [
      'Created labs that introduce pandas, NumPy, Matplotlib, and scikit-learn through real datasets.',
      'Packaged starter projects covering churn, recommendation, and forecasting scenarios.',
      'Mentored students through model evaluation, debugging, and communication best practices.'
    ],
    tags: ['Python', 'pandas', 'NumPy', 'scikit-learn'],
    focus: ['ml'],
    links: {}
  },
  {
    title: 'WorksBC Device Deployment Command Center',
    description:
      'Built a repeatable imaging and rollout framework for provincial employment service centres.',
    impact:
      'Reduced workstation turnaround from days to hours with standardized MDT and WDS playbooks.',
    highlights: [
      'Scripted deployment checklists and PowerShell automations for laptops, desktops, and kiosks.',
      'Maintained live asset and repair dashboards to inform lifecycle planning and purchasing.',
      'Coordinated after-hours cutovers and staff enablement to keep service centres online.'
    ],
    tags: ['WDS', 'MDT', 'PowerShell', 'Process Automation'],
    focus: ['analytics'],
    links: {}
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

  let impact;
  if (project.impact) {
    impact = document.createElement('p');
    impact.className = 'project-impact';
    impact.textContent = project.impact;
  }

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

  const highlights = document.createElement('ul');
  highlights.className = 'project-highlights';
  if (Array.isArray(project.highlights)) {
    project.highlights.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      highlights.appendChild(li);
    });
  }

  const labelMap = {
    repo: 'View code',
    demo: 'Live demo',
    caseStudy: 'Read case study',
    writeup: 'Read case study'
  };

  Object.entries(project.links || {}).forEach(([key, url]) => {
    if (!url) return;
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.target = '_blank';
    anchor.rel = 'noreferrer';
    anchor.textContent = labelMap[key] || 'Learn more';
    links.appendChild(anchor);
  });

  card.append(title, desc);

  if (impact) {
    card.appendChild(impact);
  }

  if (highlights.childElementCount) {
    card.appendChild(highlights);
  }

  card.append(meta);

  if (links.childElementCount) {
    card.appendChild(links);
  }
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
