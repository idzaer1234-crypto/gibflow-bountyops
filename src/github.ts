import type { GitHubIssue } from "./types.js";

export async function getIssue(repo: string, issueNumber: number): Promise<GitHubIssue> {
  if (!/^[^/\s]+\/[^/\s]+$/.test(repo)) {
    throw new Error(`Invalid repository: ${repo}. Expected owner/repository.`);
  }
  if (!Number.isInteger(issueNumber) || issueNumber < 1) {
    throw new Error("Issue number must be a positive integer.");
  }

  const url = `https://api.github.com/repos/${repo}/issues/${issueNumber}`;
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "gibflow-bountyops",
      "X-GitHub-Api-Version": "2022-11-28"
    }
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`GitHub API error ${response.status}: ${detail.slice(0, 300)}`);
  }

  const data = (await response.json()) as GitHubIssue & {
    repository_url?: string;
  };

  if (!data.html_url || !data.title) {
    throw new Error("GitHub returned an incomplete issue payload.");
  }

  // GitHub's Issue endpoint does not guarantee an embedded `repository` object.
  // Normalize it from the requested repo so the rest of GibFlow has a stable shape.
  const fullName = data.repository?.full_name ?? repo;

  return {
    ...data,
    body: data.body ?? null,
    labels: Array.isArray(data.labels) ? data.labels : [],
    repository: { full_name: fullName }
  };
}
