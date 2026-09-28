import type { Condition } from "@/lib/types";
import { CONDITIONS } from "@/lib/conditions";

export default function ConditionPill({ condition }: { condition: Condition | null }) {
  const tone = condition ? CONDITIONS[condition].tone : "border-line bg-surface-2 text-ink-faint";
  return (
    <span
      className={`shrink-0 rounded-full border px-2 py-1 text-[0.68rem] leading-none font-bold tracking-[0.05em] whitespace-nowrap uppercase ${tone}`}
    >
      {condition ? CONDITIONS[condition].label : "Not done"}
    </span>
  );
}
