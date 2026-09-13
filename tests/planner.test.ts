import assert from "node:assert/strict";
import { makePlan } from "../src/planner.js";
import { toGibworkTaskInput, dryRunCreateBounty } from "../src/gibwork.js";
import { validatePlan } from "../src/validator.js";
import type { GitHubIssue } from "../src/types.js";

const issue: GitHubIssue = {
  number: 7,
  title: "Improve CLI output",
  body: "Add machine-readable output.",
  html_url: "https://github.com/acme/project/issues/7",
  labels: [{ name: "CLI" }, { name: "CLI" }],
  repository: { full_name: "acme/project" }
};

const plan = makePlan(issue, "10");
assert.equal(plan.issueNumber, 7);
assert.deepEqual(plan.tags, ["GitHub", "Developer", "CLI"]);
assert.equal(validatePlan(plan).valid, true);
assert.equal(toGibworkTaskInput(plan).payment.amount, "10");
assert.equal(dryRunCreateBounty(plan).broadcast, false);
assert.equal(dryRunCreateBounty(plan).signed, false);

console.log("planner tests passed");
