# GibFlow BountyOps — Submission Checklist

## Repository

- [x] Repository is public.
- [x] README explains the project and workflow.
- [x] Installation and usage commands are documented.
- [x] Security model is documented.
- [x] Limitations are stated clearly.
- [x] Hackathon report is included.

## Functional verification

Run from the repository root:

```bash
npm install
npm run check
npm test
npm run demo
```

Expected test result:

```text
planner tests passed
validator tests passed
```

The demo should report:

```text
mode: dry-run
signed: false
broadcast: false
```

## Real GitHub Issue verification

Use a public or accessible GitHub repository and issue:

```bash
npm run gibflow -- --repo owner/repository --issue 42 --amount 25
```

Confirm that the command:

- fetches the issue;
- generates a deterministic bounty plan;
- validates the plan;
- prints the Gibwork SDK-compatible task input;
- remains in dry-run mode.

## Submission claims

Only claim functionality that is actually implemented and tested.

Safe claims for the current version:

- GitHub Issue retrieval works.
- Issue data is normalized into a bounty plan.
- Plan validation is implemented and tested.
- The plan is mapped to the official Gibwork SDK task input shape.
- The default workflow is dry-run only.
- No private key is required for the demo.

Do **not** claim that the current demo:

- creates a live Gibwork bounty;
- funds an escrow;
- signs a transaction;
- broadcasts an on-chain transaction;
- automatically pays a contributor.

## Demo evidence

Recommended evidence for the hackathon submission:

1. Terminal showing `npm test` passing.
2. Terminal showing `npm run check` passing.
3. Terminal showing `npm run demo` with `signed: false` and `broadcast: false`.
4. Terminal showing `npm run gibflow -- --repo ... --issue ...` against a real GitHub Issue.
5. GitHub repository URL.

Avoid publishing private keys, seed phrases, access tokens, or other credentials in screenshots, logs, issues, or the repository.

## Final submission

- [ ] Update the existing Gibwork submission rather than creating a duplicate.
- [ ] Confirm the submitted GitHub repository URL is correct.
- [ ] Confirm the project description matches the current implementation.
- [ ] Mention dry-run status explicitly.
- [ ] Include the strongest verification evidence available.
- [ ] Do not include fabricated transaction hashes, payout records, wallet activity, or performance metrics.
