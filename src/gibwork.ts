import type { BountyPlan } from "./types.js";

// Solana USDC mint used by the SDK example. GibFlow only places it in a
// dry-run request; it never signs or submits a transaction.
const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

/**
 * Converts our internal plan into the task input shape documented by
 * @gibwork/sdk. This function is intentionally side-effect free.
 */
export function toGibworkTaskInput(plan: BountyPlan) {
  return {
    title: plan.title,
    content: plan.content,
    tags: plan.tags,
    payment: {
      mintAddress: USDC_MINT,
      amount: plan.amount
    },
    sourceIssue: plan.sourceIssue
  };
}

export function dryRunCreateBounty(plan: BountyPlan) {
  return {
    mode: "dry-run" as const,
    provider: "@gibwork/sdk",
    operation: "tasks.create",
    request: toGibworkTaskInput(plan),
    signed: false,
    broadcast: false
  };
}
