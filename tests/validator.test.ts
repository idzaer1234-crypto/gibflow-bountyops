import assert from "node:assert/strict";
import { makePlan } from "../src/planner.js";
import { validatePlan } from "../src/validator.js";
import type { GitHubIssue } from "../src/types.js";

const issue: GitHubIssue = {
  number: 12,
  title: "Add request validation",
  body: "Validate issue input before creating a bounty plan.",
  html_url: "https://github.com/acme/project/issues/12",
  labels: [{ name: "bug" }],
  repository: { full_name: "acme/project" }
};

const validPlan = makePlan(issue, "25");
assert.equal(validatePlan(validPlan).valid, true);

const invalidAmount = { ...validPlan, amount: "0" };
assert.equal(validatePlan(invalidAmount).valid, false);
assert.ok(validatePlan(invalidAmount).errors.some((error) => error.includes("amount")));

const invalidSource = { ...validPlan, sourceIssue: "not-a-url" };
assert.equal(validatePlan(invalidSource).valid, false);

const emptyTitle = { ...validPlan, title: "" };
assert.equal(validatePlan(emptyTitle).valid, false);

const highAmount = { ...validPlan, amount: "1001" };
const highAmountResult = validatePlan(highAmount);
assert.equal(highAmountResult.valid, true);
assert.ok(highAmountResult.warnings.length > 0);

console.log("validator tests passed");
