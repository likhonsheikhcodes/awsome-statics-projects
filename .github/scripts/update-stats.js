const fs = require('fs');
const { Octokit } = require('@octokit/rest');

// Load environment variables
const token = process.env.GITHUB_TOKEN;
const octokit = new Octokit({ auth: token });

// Helper function to fetch stats
async function fetchStats() {
  const owner = 'likhonsheikhcodes';
  const repo = 'awsome-statics-projects';
  const { data } = await octokit.repos.get({ owner, repo });

  return {
    projects_count: fs.readdirSync('./projects').filter((file) => fs.lstatSync(`./projects/${file}`).isDirectory()).length,
    contributors_count: data.open_issues_count,
    stars_count: data.stargazers_count,
    forks_count: data.forks_count,
  };
}

// Update README stats
async function updateStats() {
  const stats = await fetchStats();
  const readmePath = './README.md';

  let content = fs.readFileSync(readmePath, 'utf-8');

  content = content.replace(
    /<!-- BEGIN STATS -->[\s\S]*<!-- END STATS -->/,
    `<!-- BEGIN STATS -->
| Metric | Count |
|--------|-------|
| Total Projects | ${stats.projects_count} |
| Contributors | ${stats.contributors_count} |
| Total Stars | ${stats.stars_count} |
| Total Forks | ${stats.forks_count} |
<!-- END STATS -->`
  );

  fs.writeFileSync(readmePath, content, 'utf-8');
}

updateStats().catch((err) => {
  console.error(err);
  process.exit(1);
});
