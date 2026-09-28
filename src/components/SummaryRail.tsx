import type { Summary } from "@/lib/report";

export default function SummaryRail({ summary, onGenerate }: { summary: Summary; onGenerate: () => void }) {
  const stats = [
    { label: "Rooms completed", value: `${summary.done} / ${summary.total}` },
    { label: "Photos captured", value: summary.photos },
    { label: "Needs attention", value: summary.needsAttention, warn: summary.needsAttention > 0 },
    { label: "Maintenance items", value: summary.maintenance },
  ];

  return (
    <aside className="flex flex-col gap-3 lg:sticky lg:top-[4.4rem]">
      <div className="rounded-[7px] border border-line bg-surface px-4 pt-4 pb-4">
        <h2 className="label-caps mb-3">This inspection</h2>
        <dl>
          {stats.map((s) => (
            <div key={s.label} className="flex items-baseline justify-between border-b border-line-soft py-1.5 text-[0.9rem] last:border-b-0">
              <dt>{s.label}</dt>
              <dd className={`font-mono font-semibold tabular-nums ${s.warn ? "text-attn" : ""}`}>{s.value}</dd>
            </div>
          ))}
        </dl>
        <button type="button" onClick={onGenerate} className="btn btn-primary mt-3 w-full">
          Generate owner report
        </button>
        <p className="mt-2.5 text-[0.78rem] leading-snug text-ink-faint">
          The report is built from what you&rsquo;ve entered so far — you don&rsquo;t have to finish every room to see it.
        </p>
      </div>
      <div className="rounded-[7px] border border-line bg-surface px-4 py-4">
        <h2 className="label-caps mb-2">Try it yourself</h2>
        <p className="text-[0.78rem] leading-snug text-ink-faint">
          Open <b className="text-ink">Bathroom</b>, tap a condition, and add a photo from your phone camera. Then hit{" "}
          <b className="text-ink">Generate owner report</b> and watch it appear in the document.
        </p>
      </div>
    </aside>
  );
}
