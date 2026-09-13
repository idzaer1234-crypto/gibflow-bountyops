import type { BountyPlan } from "./types.js";

/**
 * Converts our internal plan into the shape expected by @gibwork/sdk task creation.
 * This function is intentionally side-effect free: the hackathon demo never signs
 * or broadcasts a transaction.
 */
export function toGibworkTaskInput(plan: BountyPlan) {
  return {
    title: plan.title,
    content: plan.content,
    tags: plan.tags,
    payment: { amount: plan.amount },
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
