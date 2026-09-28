import type { Property, ReportMeta, Room } from "@/lib/types";
import {
  formatCurrency,
  formatDuration,
  formatElapsed,
  formatLongDate,
  maintenanceSchedule,
  nextDueLabel,
  overallCondition,
  summarise,
} from "@/lib/report";
import ConditionPill from "./ConditionPill";
import PhotoThumb from "./PhotoThumb";

interface OwnerReportProps {
  property: Property;
  rooms: Room[];
  meta: ReportMeta;
  quotesSent: boolean;
  onSendQuotes: () => void;
  onBack: () => void;
}

const overallTone = { Good: "text-good", Fair: "text-fair", Poor: "text-dmg" } as const;

export default function OwnerReport({ property, rooms, meta, quotesSent, onSendQuotes, onBack }: OwnerReportProps) {
  const summary = summarise(rooms);
  const overall = overallCondition(rooms);
  const schedule = maintenanceSchedule(rooms);
  const assessed = rooms.filter((r) => r.condition);

  const figures = [
    { label: "Overall condition", value: overall ?? "—", tone: overall ? overallTone[overall] : "" },
    { label: "Rooms inspected", value: `${summary.done} of ${summary.total}`, tone: "" },
    { label: "Items needing attention", value: summary.needsAttention, tone: summary.needsAttention ? "text-attn" : "text-good" },
    { label: "Photographs", value: summary.photos, tone: "" },
  ];

  const details = [
    { label: "Address", value: property.address },
    { label: "Property", value: property.description },
    { label: "Tenant", value: property.tenant },
    { label: "Tenancy start", value: property.tenancyStart },
    { label: "Inspection type", value: property.inspectionType },
    { label: "Next due", value: nextDueLabel(meta.generatedAt) },
  ];

  return (
    <div className="site-wrap py-6">
      <p role="status" className="no-print mb-4 rounded-md border border-good bg-good-wash px-4 py-3.5 text-[0.92rem] font-medium text-good">
        <b className="font-bold">Report generated in {formatElapsed(meta.elapsedSeconds)}.</b> By hand, this one takes about{" "}
        {formatDuration(property.manualBaselineMinutes)} — photographing, cropping, typing it into a template and emailing
        it out.
      </p>

      <article className="print-flat overflow-hidden rounded-[7px] border border-line bg-surface">
        <header className="print-band bg-band px-7 py-6 text-white max-sm:px-4">
          <span className="mb-2 block font-mono text-[0.7rem] tracking-[0.14em] uppercase opacity-80">
            {property.inspectionType} inspection report · Ref {property.ref}
          </span>
          <h2 className="text-[clamp(1.4rem,3.6vw,1.95rem)] font-bold tracking-[-0.02em]">{property.address}</h2>
          <p className="mt-2 text-[0.92rem] opacity-90">
            Inspected {formatLongDate(meta.generatedAt)} · Prepared for the owner by {property.agency}
          </p>
        </header>

        <dl className="grid grid-cols-2 gap-px bg-line sm:grid-cols-4">
          {figures.map((f) => (
            <div key={f.label} className="flex flex-col-reverse bg-surface px-3.5 py-4 text-center">
              <dt className="mt-1 text-[0.72rem] font-medium text-ink-faint">{f.label}</dt>
              <dd className={`text-[1.5rem] leading-tight font-bold tracking-[-0.03em] tabular-nums ${f.tone}`}>{f.value}</dd>
            </div>
          ))}
        </dl>

        <section className="border-t border-line px-7 py-6 max-sm:px-4">
          <h3 className="label-caps mb-4">Property &amp; tenancy</h3>
          <dl className="grid grid-cols-[repeat(auto-fit,minmax(11rem,1fr))] gap-4">
            {details.map((d) => (
              <div key={d.label}>
                <dt className="text-[0.72rem] font-semibold tracking-[0.05em] text-ink-faint uppercase">{d.label}</dt>
                <dd className="text-[0.95rem] font-medium">{d.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="border-t border-line px-7 py-6 max-sm:px-4">
          <h3 className="label-caps mb-2">Room by room</h3>
          {assessed.length === 0 && <p className="text-[0.93rem] text-ink-faint italic">No rooms have been assessed yet.</p>}
          {assessed.map((room) => (
            <div key={room.id} className="border-b border-line-soft py-4 last:border-b-0">
              <div className="mb-2 flex flex-wrap items-center gap-3">
                <span className="min-w-36 flex-1 text-[1.02rem] font-bold">{room.name}</span>
                <ConditionPill condition={room.condition} />
              </div>
              <p className={`max-w-[70ch] text-[0.93rem] leading-relaxed ${room.note ? "text-ink-soft" : "text-ink-faint italic"}`}>
                {room.note || "No additional notes recorded for this area."}
              </p>
              {room.photos.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {room.photos.map((photo, i) => (
                    <PhotoThumb key={photo.id} photo={photo} size="sm" alt={`${room.name}, photo ${i + 1}`} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>

        {schedule.rows.length > 0 && (
          <section className="border-t border-line px-7 py-6 max-sm:px-4">
            <h3 className="label-caps mb-4">Maintenance schedule</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[0.92rem]">
                <thead>
                  <tr className="border-b-[1.5px] border-line text-left">
                    {["Item", "Location", "Trade"].map((h) => (
                      <th key={h} className="label-caps px-2.5 py-2">
                        {h}
                      </th>
                    ))}
                    <th className="label-caps px-2.5 py-2 text-right">Est.</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.rows.map((row) => (
                    <tr key={row.id} className="border-b border-line-soft align-top">
                      <td className="px-2.5 py-2.5">{row.title}</td>
                      <td className="px-2.5 py-2.5">{row.roomName}</td>
                      <td className="px-2.5 py-2.5">{row.trade}</td>
                      <td className="px-2.5 py-2.5 text-right font-mono whitespace-nowrap tabular-nums">
                        {formatCurrency(row.estimate)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-[1.5px] border-line font-bold">
                    <td colSpan={3} className="px-2.5 py-2.5">
                      Estimated total
                    </td>
                    <td className="px-2.5 py-2.5 text-right font-mono whitespace-nowrap tabular-nums">
                      {formatCurrency(schedule.total)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="no-print mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-line-soft pt-4">
              <p className="max-w-[44ch] text-[0.9rem] text-ink-soft">
                Quote requests go to the tradespeople already on this property&rsquo;s approved list.
              </p>
              <button type="button" onClick={onSendQuotes} disabled={quotesSent} className="btn btn-primary">
                {quotesSent
                  ? "Requests sent"
                  : `Send ${schedule.rows.length} quote request${schedule.rows.length === 1 ? "" : "s"}`}
              </button>
            </div>
            {quotesSent && (
              <p role="status" className="no-print mt-3 rounded-[5px] border border-good bg-good-wash px-3.5 py-3 text-[0.9rem] font-medium text-good">
                Sent to {schedule.trades.length} trade{schedule.trades.length === 1 ? "" : "s"} —{" "}
                <b>{schedule.trades.join(", ")}</b>. Quotes come back into this property&rsquo;s file, and the owner is
                copied automatically.
              </p>
            )}
          </section>
        )}

        <section className="border-t border-line px-7 py-6 max-sm:px-4">
          <h3 className="label-caps mb-3">Sign-off</h3>
          <p className="text-[0.85rem] leading-relaxed text-ink-faint">
            This report reflects the condition of the property observed on the date of inspection and covers the areas
            listed above. Photographs were taken at the time of inspection and are unedited.
          </p>
          <p className="mt-3 text-[0.85rem] leading-relaxed text-ink-faint">
            Prepared by <b className="text-ink">{property.agency}</b> · Generated automatically from the on-site
            walkthrough.
          </p>
        </section>
      </article>

      <div className="no-print mt-5 flex flex-wrap gap-2">
        <button type="button" onClick={() => window.print()} className="btn btn-primary">
          Download / print PDF
        </button>
        <button type="button" onClick={onBack} className="btn btn-ghost">
          ← Back to inspection
        </button>
      </div>
    </div>
  );
}
