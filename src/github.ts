import type { GitHubIssue } from "./types.js";

export async function getIssue(repo: string, issueNumber: number): Promise<GitHubIssue> {
  const url = `https://api.github.com/repos/${repo}/issues/${issueNumber}`;
  const response = await fetch(url, {
    headers: { "Accept": "application/vnd.github+json", "User-Agent": "gibflow-bountyops" }
  });
  if (!response.ok) throw new Error(`GitHub API Error: ${response.status}`);
  return response.json();
}
