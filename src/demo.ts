import { makePlan } from "./planner.js";

const issue = {
  number: 1,
  title: "Test Issue",
  body: "Description here",
  html_url: "https://github.com/test",
  labels: [],
  repository: { full_name: "test/repo" }
};

const plan = makePlan(issue, "100");
console.log("Bounty Plan Generated:", JSON.stringify(plan, null, 2));
