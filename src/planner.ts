import type { BountyPlan, GitHubIssue } from "./types.js";

export function makePlan(issue: GitHubIssue, amount: string): BountyPlan {
  return {
    title: `[GitHub #${issue.number}] ${issue.title}`,
    content: `Source: ${issue.html_url}\n\n${issue.body ?? "No description provided."}`,
    tags: ["GitHub", "Developer"],
    amount,
    sourceIssue: issue.html_url
  };
}
