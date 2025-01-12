import { debounce } from './utils.js';

export function initProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    const searchInput = document.getElementById('search-projects');
    const sortNameButton = document.getElementById('sort-name');
    const sortStarsButton = document.getElementById('sort-stars');
    let projects = [];

    async function fetchProjects() {
        try {
            const response = await fetch('https://api.github.com/repos/likhonsheikhcodes/awsome-statics-projects/contents/projects');
            const directories = await response.json();
            projects = await Promise.all(directories.map(async (dir) => {
                const projectResponse = await fetch(`https://api.github.com/repos/likhonsheikhcodes/awsome-statics-projects/contents/projects/${dir.name}/project.json`);
                const projectData = await projectResponse.json();
                const content = atob(projectData.content);
                const project = JSON.parse(content);
                return {
                    ...project,
                    thumbnail_url: `https://raw.githubusercontent.com/likhonsheikhcodes/awsome-statics-projects/main/projects/${dir.name}/thumbnail.png`,
                    demo_url: `https://likhonsheikhcodes.github.io/awsome-statics-projects/projects/${dir.name}/`,
                    github_url: `https://github.com/likhonsheikhcodes/awsome-statics-projects/tree/main/projects/${dir.name}`
                };
            }));
            renderProjects(projects);
        } catch (error) {
            console.error('Error fetching projects:', error);
            projectsGrid.innerHTML = '<p>Failed to load projects. Please try again later.</p>';
        }
    }

    function renderProjects(projectsToRender) {
        projectsGrid.innerHTML = projectsToRender.map(project => `
            <div class="project-card">
                <img src="${project.thumbnail_url}" alt="${project.name}" loading="lazy">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.demo_url}" target="_blank" rel="noopener noreferrer">Demo</a>
                    <a href="${project.github_url}" target="_blank" rel="noopener noreferrer">Source</a>
                </div>
                <div class="project-stars">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    ${project.stars}
                </div>
            </div>
        `).join('');
    }

    function filterProjects() {
        const query = searchInput.value.toLowerCase();
        const filteredProjects = projects.filter(project => 
            project.name.toLowerCase().includes(query) ||
            project.description.toLowerCase().includes(query) ||
            project.technologies.some(tech => tech.toLowerCase().includes(query))
        );
        renderProjects(filteredProjects);
    }

    function sortProjects(key) {
        projects.sort((a, b) => {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        });
        renderProjects(projects);
    }

    searchInput.addEventListener('input', debounce(filterProjects, 300));
    sortNameButton.addEventListener('click', () => sortProjects('name'));
    sortStarsButton.addEventListener('click', () => sortProjects('stars'));

    fetchProjects();
}

Now, let's create the infinite scroll module:

```javascript file="js/modules/infinite-scroll.js"
export function initInfiniteScroll() {
    const projectsGrid = document.getElementById('projects-grid');
    const loadMoreButton = document.getElementById('load-more-button');
    const loadingSpinner = document.getElementById('loading-spinner');
    let page = 1;
    const projectsPerPage = 9;

    function loadMoreProjects() {
        loadingSpinner.style.display = 'block';
        // Simulate loading delay
        setTimeout(() => {
            const fragment = document.createDocumentFragment();
            for (let i = 0; i < projectsPerPage; i++) {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                projectCard.innerHTML = `
                    <img src="/placeholder.jpg" alt="Project ${page * projectsPerPage + i + 1}">
                    <h3>Project ${page * projectsPerPage + i + 1}</h3>
                    <p>Description for Project ${page * projectsPerPage + i + 1}</p>
                `;
                fragment.appendChild(projectCard);
            }
            projectsGrid.appendChild(fragment);
            page++;
            loadingSpinner.style.display = 'none';
        }, 1000);
    }

    loadMoreButton.addEventListener('click', loadMoreProjects);

    // Implement virtual scrolling
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            loadMoreProjects();
        }
    }, { rootMargin: '100px' });

    observer.observe(loadMoreButton);
}

