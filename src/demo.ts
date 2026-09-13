import { dryRunCreateBounty } from "./gibwork.js";
import { makePlan } from "./planner.js";
import { validatePlan } from "./validator.js";
import type { GitHubIssue } from "./types.js";

const issue: GitHubIssue = {
  number: 42,
  title: "Add request validation to the API client",
  body: "Validate repository and issue inputs before creating a bounty plan.",
  html_url: "https://github.com/example/project/issues/42",
  labels: [{ name: "bug" }, { name: "developer" }],
  repository: { full_name: "example/project" }
};

const plan = makePlan(issue, "25");
const validation = validatePlan(plan);
const dryRun = dryRunCreateBounty(plan);

console.log(JSON.stringify({ validation, dryRun }, null, 2));
