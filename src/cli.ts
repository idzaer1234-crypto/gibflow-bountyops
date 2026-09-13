import { getIssue } from "./github.js";
import { dryRunCreateBounty } from "./gibwork.js";
import { makePlan } from "./planner.js";
import { validatePlan } from "./validator.js";

function getFlag(name: string, fallback?: string): string | undefined {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] ?? fallback : fallback;
}

function usage(): never {
  console.log(`GibFlow BountyOps\n\nUsage:\n  npm run gibflow -- --repo owner/repository --issue 123 [--amount 25]\n\nDefault behavior is dry-run. No wallet, signature, or transaction is used.`);
  process.exit(0);
}

async function main() {
  if (process.argv.includes("--help")) usage();

  const repo = getFlag("--repo");
  const issueRaw = getFlag("--issue");
  const amount = getFlag("--amount", "25")!;

  if (!repo || !issueRaw) {
    console.error("Missing --repo or --issue. Use --help for usage.");
    process.exit(2);
  }

  const issueNumber = Number(issueRaw);
  const issue = await getIssue(repo, issueNumber);
  const plan = makePlan(issue, amount);
  const validation = validatePlan(plan);

  console.log(JSON.stringify({
    workflow: "github-issue -> bounty-plan -> validation -> gibwork-sdk-dry-run",
    validation,
    plan,
    gibwork: validation.valid ? dryRunCreateBounty(plan) : null
  }, null, 2));

  if (!validation.valid) process.exit(1);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
