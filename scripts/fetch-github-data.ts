import { writeFileSync } from 'fs';
import { resolve } from 'path';

const REPOS = ['minhduc5a15/HELIX', 'minhduc5a15/duckpass'];
const OUTPUT_PATH = resolve(process.cwd(), 'public/github-data.json');

const fetchGithubData = async (repo: string) => {
  console.log(`Fetching data for ${repo}...`);
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
  };

  if (process.env.GITHUB_TOKEN) {
    console.log(`Using GITHUB_TOKEN for ${repo}`);
    headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
  } else {
    console.warn('No GITHUB_TOKEN found. Requests may be rate-limited.');
  }

  try {
    const [repoRes, commitsRes, contentsRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${repo}`, { headers }),
      fetch(`https://api.github.com/repos/${repo}/commits?per_page=1`, {
        headers,
      }),
      fetch(`https://api.github.com/repos/${repo}/contents`, { headers }),
    ]);

    if (!repoRes.ok || !commitsRes.ok || !contentsRes.ok) {
      throw new Error(`Failed to fetch ${repo}. Status: ${repoRes.status}`);
    }

    const repoData = await repoRes.json();
    const commitsData = await commitsRes.json();
    const contentsData = await contentsRes.json();

    const files = Array.isArray(contentsData) ? contentsData : [];
    files.sort((a, b) => {
      if (a.type === b.type) return a.name.localeCompare(b.name);
      return a.type === 'dir' ? -1 : 1;
    });

    return {
      name: repoData.name,
      ownerAvatar: repoData.owner?.avatar_url || '',
      ownerLogin: repoData.owner?.login || '',
      defaultBranch: repoData.default_branch || 'main',
      latestCommit: {
        message:
          commitsData[0]?.commit?.message?.split('\n')[0] || 'Initial commit',
        hash: commitsData[0]?.sha?.substring(0, 7) || '0000000',
        date:
          commitsData[0]?.commit?.committer?.date || new Date().toISOString(),
        author:
          commitsData[0]?.author?.login || repoData.owner?.login || 'unknown',
        authorAvatar:
          commitsData[0]?.author?.avatar_url ||
          repoData.owner?.avatar_url ||
          '',
      },
      files: files,
    };
  } catch (error) {
    console.error(`Error processing ${repo}:`, error);
    return null;
  }
};

const main = async () => {
  const data: Record<string, unknown> = {};

  for (const repo of REPOS) {
    const repoData = await fetchGithubData(repo);
    if (repoData) {
      data[repo] = repoData;
    }
  }

  writeFileSync(OUTPUT_PATH, JSON.stringify(data, null, 2));
  console.log(`Successfully wrote GitHub data to ${OUTPUT_PATH}`);
};

main().catch(console.error);
