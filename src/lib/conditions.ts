import type { Condition } from "./types";

export const CONDITION_ORDER: Condition[] = ["good", "fair", "attention", "damaged"];

// `tone` is the full class string so Tailwind can see it at build time.
export const CONDITIONS: Record<Condition, { label: string; tone: string }> = {
  good: { label: "Good", tone: "border-good bg-good-wash text-good" },
  fair: { label: "Fair", tone: "border-fair bg-fair-wash text-fair" },
  attention: { label: "Needs attention", tone: "border-attn bg-attn-wash text-attn" },
  damaged: { label: "Damaged", tone: "border-dmg bg-dmg-wash text-dmg" },
};

export const needsAction = (condition: Condition | null) => condition === "attention" || condition === "damaged";
