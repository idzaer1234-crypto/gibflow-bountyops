import type { BountyPlan, GitHubIssue } from "./types.js";

function cleanLabel(name: string | undefined): string | null {
  if (!name) return null;
  const value = name.trim().replace(/\s+/g, " ");
  return value.length > 0 ? value.slice(0, 40) : null;
}

export function makePlan(issue: GitHubIssue, amount: string): BountyPlan {
  const labels = issue.labels.map((label) => cleanLabel(label.name)).filter((x): x is string => Boolean(x));
  const tags = ["GitHub", "Developer", ...labels].filter((tag, index, all) => all.indexOf(tag) === index).slice(0, 8);
  const body = issue.body?.trim() || "No description provided.";

  return {
    title: `[GitHub #${issue.number}] ${issue.title.trim()}`,
    content: [
      `Source issue: ${issue.html_url}`,
      "",
      body,
      "",
      "GibFlow note: this is a generated plan. Review the scope, reward, deadline, and acceptance criteria before creating a live Gibwork bounty."
    ].join("\n"),
    tags,
    amount,
    sourceIssue: issue.html_url,
    sourceRepository: issue.repository.full_name,
    issueNumber: issue.number
  };
}
