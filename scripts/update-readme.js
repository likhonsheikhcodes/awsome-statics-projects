const fs = require('fs');
const path = require('path');

const projectsData = JSON.parse(fs.readFileSync('projects.json', 'utf8'));

let readmeContent = `# Awesome Static Projects

A curated collection of awesome static web projects.

## Projects

`;

projectsData.forEach(project => {
  readmeContent += `### [${project.name}](./projects/${project.name})
- **Description**: ${project.description}
- **Technologies**: ${project.technologies.join(', ')}
- **Category**: ${project.category}
- **Author**: ${project.author}

`;
});

fs.writeFileSync('README.md', readmeContent);

console.log('README.md has been updated with project information.');

