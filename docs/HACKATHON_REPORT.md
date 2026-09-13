# GibFlow BountyOps — Hackathon Report

## 1. Project summary

GibFlow BountyOps is a terminal-first developer tool that turns a GitHub Issue into a structured, reviewable Gibwork bounty plan.

Core workflow:

`GitHub Issue -> normalize -> validate -> Gibwork SDK task input -> dry-run`

The project intentionally stops before signing or broadcasting a real financial transaction.

## 2. Problem

A GitHub Issue contains useful work context, but creating a bounty also requires a maintainer to review scope, reward, source traceability, and basic validity. Copying this information manually into a bounty workflow is repetitive and can introduce mistakes.

GibFlow provides a deterministic planning layer that can be run from a terminal and inspected before any live Gibwork operation is authorized.

## 3. What was implemented

- GitHub REST API issue retrieval.
- Normalization of the GitHub Issue into an internal `GitHubIssue` type.
- Deterministic `BountyPlan` generation.
- Bounded propagation of GitHub labels into bounty tags.
- Validation of title, source URL, reward amount, and plan integrity.
- Mapping to the documented `@gibwork/sdk` `tasks.create` input shape.
- Safe dry-run output with explicit `signed: false` and `broadcast: false` state.
- TypeScript compilation checks.
- Planner and validator tests.
- Local deterministic demo fixture.

## 4. Gibwork integration

The repository uses the official `@gibwork/sdk` package as the integration boundary. `src/gibwork.ts` converts the internal plan into an SDK-compatible task request.

The current implementation does **not** create, fund, sign, or broadcast a live Gibwork bounty. Live wallet authentication and transaction execution remain outside this demo workflow.

This distinction is intentional: the hackathon prototype demonstrates the developer workflow and SDK integration shape without requiring a private key or real funds.

## 5. Verification evidence

The project has been verified locally with the following commands:

```bash
npm test
npm run check
npm run demo
```

Expected test output includes:

```text
planner tests passed
validator tests passed
```

The deterministic demo produces a valid plan and an SDK task request with:

```text
mode: dry-run
signed: false
broadcast: false
```

A real GitHub Issue was also used during development to verify the GitHub API -> planner -> validation -> SDK dry-run path.

## 6. Security and safety

- No private key is stored in the repository.
- The default workflow does not request a private key.
- The demo does not sign transactions.
- The demo does not broadcast transactions.
- No payout, escrow creation, or settlement is claimed as completed.
- Live financial execution is intentionally separated from the planning workflow.

## 7. Design decisions

### Terminal-first

A terminal workflow is appropriate for developers and maintainers and avoids adding a separate web dashboard for a small automation layer.

### Deterministic planning

The same issue data and reward input should produce the same plan structure, making the output easy to review, test, and integrate with other developer tooling.

### Explicit execution boundary

The Gibwork SDK is treated as the execution boundary rather than reimplementing wallet or transaction handling inside GibFlow.

## 8. Limitations

The current prototype does not:

- create live bounties automatically;
- fund or settle bounties;
- manage wallet keys;
- extract sophisticated acceptance criteria from arbitrary issue text;
- provide a custom web dashboard.

## 9. Future work

- Better extraction from GitHub Issue templates and acceptance criteria.
- Configurable reward and repository policies.
- Repository allowlists and label-based rules.
- Optional MCP-facing planning tools for AI coding agents.
- A separately documented live execution path only when intentionally enabled by an operator.

## 10. Submission positioning

The strongest claim for this prototype is not automatic payout. The differentiator is the **GitHub Issue -> validated bounty plan -> official Gibwork SDK boundary** workflow, delivered as a small terminal-first developer tool.
