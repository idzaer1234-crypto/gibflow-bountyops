export type GitHubIssue = {
  number: number;
  title: string;
  body: string | null;
  html_url: string;
  labels: Array<{ name?: string }>;
  repository: { full_name: string };
};

export type BountyPlan = {
  title: string;
  content: string;
  tags: string[];
  amount: string;
  sourceIssue: string;
  sourceRepository: string;
  issueNumber: number;
};
