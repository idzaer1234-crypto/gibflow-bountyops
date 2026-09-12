import { getIssue } from "./github.js";
import { makePlan } from "./planner.js";

const args = process.argv.slice(2);
const repo = args[0] || "gibwork/gibwork-sdk";
const issueNum = parseInt(args[1] || "1");

async function run() {
  console.log(`Fetching GitHub issue #${issueNum} from ${repo}...`);
  const issue = await getIssue(repo, issueNum);
  const plan = makePlan(issue, "500");
  console.log("Generated Bounty Plan:", JSON.stringify(plan, null, 2));
}

run().catch(console.error);
