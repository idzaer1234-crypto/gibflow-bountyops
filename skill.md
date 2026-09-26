---
name: gibflow-bounty-planner
description: Convert a GitHub Issue into a reviewable Gibwork bounty plan, validate its title, source URL, reward amount, and tags, then produce a side-effect-free Gibwork SDK task payload for dry-run review. Use when an agent or maintainer needs to turn an existing GitHub Issue into a structured bounty proposal without signing or broadcasting a transaction.
tags: [github, gibwork, bounties, developer-tools, dry-run]
---

# GibFlow Bounty Planner

## Use When
- Turn an existing GitHub Issue into a structured Gibwork bounty proposal.
- Inspect the proposed title, source URL, reward, tags, and SDK request before financial action.

## Don't Use When
- The user wants to create, fund, sign, or broadcast a live bounty transaction.
- A private key, wallet signature, or transaction submission is required.

## Workflow
1. Identify the GitHub repository and issue number.
2. Fetch the issue metadata and preserve its canonical HTTPS GitHub URL.
3. Build a deterministic plan:
   - title: "[GitHub #ISSUE_NUMBER] ISSUE_TITLE"
   - content: source issue URL, issue body, and a review reminder
   - tags: "GitHub", "Developer", plus cleaned issue labels, capped at 8 unique tags
   - reward amount: the explicitly supplied amount, defaulting to 25 when using the repository CLI
4. Validate the plan:
   - title and content must be non-empty
   - sourceIssue must begin with https://github.com/
   - amount must be a positive decimal string
   - amounts above 1000 produce a manual-review warning
   - missing tags produce a warning
5. If valid, convert the plan to the @gibwork/sdk tasks.create input shape.
6. Return a dry-run proposal and clearly state that it is unsigned and not broadcast.
7. Require separate authorization and official Gibwork tooling for any live financial operation.

## Safety Rules
- Preserve traceability to the original GitHub Issue.
- Never request, store, expose, or infer a private key.
- Never claim a bounty was created, funded, signed, escrowed, or settled from a dry-run.
- Keep scope, reward, deadline, and acceptance criteria visible for review.
- Use the official @gibwork/sdk or official Gibwork tooling for eventual execution.

## References
See src/planner.ts, src/validator.ts, src/gibwork.ts, and src/cli.ts for implementation details.
