"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import type { ReportMeta } from "@/lib/types";
import { inspectionReducer } from "@/lib/inspection";
import { summarise } from "@/lib/report";
import { SAMPLE_PROPERTY, SAMPLE_ROOMS } from "@/lib/sample-property";
import Logo from "./Logo";
import PropertyHeader from "./PropertyHeader";
import RoomCard from "./RoomCard";
import SummaryRail from "./SummaryRail";
import OwnerReport from "./OwnerReport";

type View = "inspect" | "report";

export default function InspectionApp() {
  const [rooms, dispatch] = useReducer(inspectionReducer, SAMPLE_ROOMS);
  const [openRoomId, setOpenRoomId] = useState<string | null>(null);
  const [view, setView] = useState<View>("inspect");
  const [report, setReport] = useState<ReportMeta | null>(null);
  const [quotesSent, setQuotesSent] = useState(false);
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const summary = summarise(rooms);

  const showReport = () => {
    const now = Date.now();
    setReport({ generatedAt: now, elapsedSeconds: Math.max(0, Math.floor((now - startedAt.current) / 1000)) });
    setQuotesSent(false);
    setView("report");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showInspection = () => {
    setView("inspect");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="pb-20 lg:pb-0">
      <div className="no-print sticky top-0 z-40 border-b border-line bg-surface">
        <div className="site-wrap flex items-center justify-between gap-4 py-2.5">
          <Logo />
          {view === "inspect" ? (
            <button type="button" onClick={showReport} className="btn btn-primary btn-sm">
              View owner report
            </button>
          ) : (
            <button type="button" onClick={showInspection} className="btn btn-ghost btn-sm">
              ← Back to inspection
            </button>
          )}
        </div>
      </div>

      {/* Both views stay mounted so the timer and half-typed maintenance items survive a trip to the report. */}
      <div hidden={view !== "inspect"}>
        <PropertyHeader property={SAMPLE_PROPERTY} startedAt={startedAt} />
        <main className="site-wrap py-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
              <div
                className="h-full bg-teal transition-[width] duration-300"
                style={{ width: `${(summary.done / summary.total) * 100}%` }}
              />
            </div>
            <span className="font-mono text-[0.8rem] font-semibold whitespace-nowrap text-ink-soft">
              {summary.done} / {summary.total} rooms
            </span>
          </div>

          <div className="grid items-start gap-6 lg:grid-cols-[1fr_19.5rem]">
            <div className="flex min-w-0 flex-col gap-2.5">
              {rooms.map((room, i) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  index={i}
                  open={openRoomId === room.id}
                  onToggle={() => setOpenRoomId(openRoomId === room.id ? null : room.id)}
                  dispatch={dispatch}
                />
              ))}
            </div>
            <SummaryRail summary={summary} onGenerate={showReport} />
          </div>
        </main>
      </div>

      {report && (
        <div hidden={view !== "report"}>
          <OwnerReport
            property={SAMPLE_PROPERTY}
            rooms={rooms}
            meta={report}
            quotesSent={quotesSent}
            onSendQuotes={() => setQuotesSent(true)}
            onBack={showInspection}
          />
        </div>
      )}

      <div className="no-print fixed inset-x-0 bottom-0 z-50 flex border-t border-line bg-surface px-3 py-2.5 shadow-[0_-2px_14px_rgb(10_25_25/0.1)] lg:hidden">
        {view === "inspect" ? (
          <button type="button" onClick={showReport} className="btn btn-primary flex-1">
            View owner report
          </button>
        ) : (
          <button type="button" onClick={showInspection} className="btn btn-ghost flex-1">
            ← Back to inspection
          </button>
        )}
      </div>
    </div>
  );
}
