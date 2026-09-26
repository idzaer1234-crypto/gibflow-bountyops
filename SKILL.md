---
name: gibflow-bounty-planner
description: Convert a GitHub Issue into a reviewable Gibwork bounty plan, validate its title, source URL, reward amount, and tags, then produce a side-effect-free Gibwork SDK task payload for dry-run review.
---

# GibFlow Bounty Planner

Use this skill when an agent needs to turn an existing GitHub Issue into a structured Gibwork bounty proposal.

## Workflow
1. Identify the GitHub repository and issue number.
2. Fetch the issue metadata and preserve its canonical GitHub HTTPS URL.
3. Build a deterministic bounty plan with title, source URL, issue content, tags, and reward amount.
4. Validate the title, GitHub source URL, positive reward amount, and tags.
5. Convert a valid plan to the @gibwork/sdk tasks.create input shape.
6. Return a dry-run proposal only. Clearly state that it is unsigned and not broadcast.

## Safety
- Never request, store, expose, or infer a private key.
- Never claim that a bounty was created, funded, signed, escrowed, or settled from a dry-run.
- Preserve traceability to the original GitHub Issue.
- Use official Gibwork tooling for any eventual live execution.