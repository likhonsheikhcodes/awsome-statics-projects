const fs = require('fs');
const path = require('path');

try {
  // Load and parse the projects data
  const projectsDataPath = path.resolve('projects.json');
  if (!fs.existsSync(projectsDataPath)) {
    throw new Error('projects.json file is missing. Please ensure it exists in the project root.');
  }
  const projectsData = JSON.parse(fs.readFileSync(projectsDataPath, 'utf8'));

  // Sort projects alphabetically by name
  const sortedProjects = projectsData.sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
  );

  // Group projects by category
  const projectsByCategory = sortedProjects.reduce((acc, project) => {
    const category = project.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(project);
    return acc;
  }, {});

  // Calculate stats
  const totalProjects = projectsData.length;
  const uniqueCategories = Object.keys(projectsByCategory).length;

  // Generate README content
  let readmeContent = `# Awesome Static Projects

A curated collection of awesome static web projects.

## Stats
- **Total Projects**: ${totalProjects}
- **Categories**: ${uniqueCategories}

## Table of Contents
`;

  // Add table of contents
  Object.keys(projectsByCategory).forEach((category, index) => {
    readmeContent += `${index + 1}. [${category}](#${category.toLowerCase().replace(/\s+/g, '-')})\n`;
  });

  readmeContent += `\n## Projects\n\n`;

  // Add projects grouped by category
  for (const [category, projects] of Object.entries(projectsByCategory)) {
    readmeContent += `### ${category}\n\n`;
    projects.forEach((project) => {
      readmeContent += `- [**${project.name}**](./projects/${project.name}): ${project.description}\n`;
      readmeContent += `  - **Technologies**: ${project.technologies.join(', ')}\n`;
      readmeContent += `  - **Author**: ${project.author}\n\n`;
    });
  }

  // Write the generated content to README.md
  fs.writeFileSync('README.md', readmeContent);
  console.log('README.md has been successfully updated with project information.');

} catch (error) {
  console.error(`Error updating README.md: ${error.message}`);
}
