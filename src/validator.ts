import type { BountyPlan } from "./types.js";

export type ValidationResult = {
  valid: boolean;
  errors: string[];
  warnings: string[];
};

export function validatePlan(plan: BountyPlan): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!plan.title.trim()) errors.push("title is required");
  if (!plan.content.trim()) errors.push("content is required");
  if (!plan.sourceIssue.startsWith("https://github.com/")) errors.push("sourceIssue must be a GitHub HTTPS URL");
  if (!/^\d+(\.\d+)?$/.test(plan.amount) || Number(plan.amount) <= 0) {
    errors.push("amount must be a positive decimal string");
  }
  if (plan.amount !== "0" && Number(plan.amount) > 1000) {
    warnings.push("amount is above 1000; verify the intended reward before any live action");
  }
  if (plan.tags.length === 0) warnings.push("no tags were generated");

  return { valid: errors.length === 0, errors, warnings };
}
