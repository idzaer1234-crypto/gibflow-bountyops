---
name: gibflow-bounty-planner
description: Convert a GitHub Issue into a reviewable Gibwork bounty plan, validate its title, source URL, reward amount, and tags, then produce a side-effect-free Gibwork SDK task payload for dry-run review. Use when an agent or maintainer needs to turn an existing GitHub Issue into a structured bounty proposal without signing or broadcasting a transaction.
license: MIT
tags: [github, gibwork, bounties, developer-tools, dry-run]
---

# GibFlow Bounty Planner

## Use When
- A maintainer wants to turn an existing GitHub Issue into a structured Gibwork bounty proposal.
- An agent needs a deterministic GitHub Issue -> bounty plan workflow.
- A user wants to inspect the proposed title, source URL, reward, tags, and SDK request before any live financial action.

## Don't Use When
- The user wants to create, fund, sign, or broadcast a live bounty transaction.
- The source is not a GitHub Issue URL or repository reference.
- A private key, wallet signature, or transaction submission is required.
- The task requires replacing the official Gibwork execution layer rather than preparing an upstream plan.

## Workflow
1. Identify the GitHub repository and issue number.
2. Fetch the issue metadata and preserve its canonical GitHub HTTPS URL.
3. Build a deterministic bounty plan:
   - title: "[GitHub #<issue>] <issue title>"
   - content: source issue URL, issue body, and a review reminder
   - tags: "GitHub", "Developer", plus cleaned issue labels, capped at 8 unique tags
   - reward amount: the explicitly supplied amount, defaulting to 25 when using the repository CLI
4. Validate the plan:
   - title and content must be non-empty
   - sourceIssue must begin with https://github.com/
   - amount must be a positive decimal string
   - amounts above 1000 produce a warning for manual review
   - missing tags produce a warning
5. If valid, convert the plan to the @gibwork/sdk tasks.create input shape.
6. Return the result as a dry-run proposal and clearly indicate that it is unsigned and not broadcast.
7. Require an explicit, separate authorization and the official Gibwork tooling for any live financial operation.

## Rules
- Always preserve source traceability to the original GitHub Issue.
- Always validate the reward amount before presenting a live-action proposal.
- Always treat the generated SDK request as a dry-run unless a separate live workflow is explicitly authorized.
- Never request, store, expose, or infer a private key.
- Never claim that a bounty was created, funded, signed, escrowed, or settled from a dry-run.
- Keep the review boundary visible: scope, reward, deadline, and acceptance criteria should be checked before live execution.
- Use the official @gibwork/sdk or official Gibwork tooling for any eventual execution step.

## Examples
- "Turn GitHub issue 42 into a bounty" -> fetch issue 42, build the plan, validate it, and return the SDK-compatible dry-run.
- "Show me what this bounty would create" -> return the generated title, content, tags, reward, source URL, and unsigned SDK request.
- "Create and fund this bounty now" -> stop at the validated plan unless an explicitly authorized live execution workflow using official Gibwork tooling is available.

## Edge Cases
- If the issue has no body, use "No description provided." in the generated content.
- If an issue label is empty or whitespace-only, omit it.
- If a label exceeds 40 characters, trim it to 40 characters after whitespace normalization.
- If more than 8 unique tags would be produced, keep only the first 8.
- If the reward is above 1000, keep the plan valid but emit a warning requiring manual review.
- If the source URL is not an HTTPS GitHub URL, reject the plan.
- If validation fails, do not generate a Gibwork task request.

## References
See the repository source files `src/planner.ts`, `src/validator.ts`, `src/gibwork.ts`, and `src/cli.ts` for the implementation details and CLI workflow.
