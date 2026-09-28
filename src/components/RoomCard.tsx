"use client";

import { useState } from "react";
import type { Photo, Room, Trade } from "@/lib/types";
import type { InspectionAction } from "@/lib/inspection";
import { CONDITIONS, CONDITION_ORDER } from "@/lib/conditions";
import { TRADES } from "@/lib/trades";
import { nextId } from "@/lib/id";
import ConditionPill from "./ConditionPill";
import PhotoThumb from "./PhotoThumb";

interface RoomCardProps {
  room: Room;
  index: number;
  open: boolean;
  onToggle: () => void;
  dispatch: React.Dispatch<InspectionAction>;
}

export default function RoomCard({ room, index, open, onToggle, dispatch }: RoomCardProps) {
  const [draft, setDraft] = useState("");
  const [trade, setTrade] = useState<Trade>(TRADES[0]);
  const bodyId = `room-${room.id}`;
  const done = room.condition !== null;

  const addPhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).filter((f) => f.type.startsWith("image/"));
    if (files.length) {
      dispatch({
        type: "addPhotos",
        roomId: room.id,
        photos: files.map((f) => ({ id: nextId("photo"), kind: "upload", url: URL.createObjectURL(f), name: f.name })),
      });
    }
    e.target.value = ""; // let the same photo be picked again after removal
  };

  const removePhoto = (photo: Photo) => {
    if (photo.kind === "upload") URL.revokeObjectURL(photo.url);
    dispatch({ type: "removePhoto", roomId: room.id, photoId: photo.id });
  };

  const addMaintenance = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = draft.trim();
    if (!title) return;
    dispatch({ type: "addMaintenance", roomId: room.id, item: { id: nextId("mnt"), title, trade } });
    setDraft("");
  };

  return (
    <div className={`min-w-0 overflow-hidden rounded-[7px] border bg-surface ${done ? "border-teal" : "border-line"}`}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={bodyId}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left hover:bg-surface-2"
      >
        <span
          className={`grid size-[1.9rem] shrink-0 place-items-center rounded-[5px] border font-mono text-[0.78rem] font-semibold ${
            done ? "border-teal bg-teal text-on-teal" : "border-line bg-surface-2 text-ink-faint"
          }`}
        >
          {index + 1}
        </span>
        <span className="min-w-0 flex-1 font-semibold">
          {room.name}
          <span className="mt-0.5 block text-[0.78rem] font-normal text-ink-faint">{room.scope}</span>
        </span>
        <ConditionPill condition={room.condition} />
        <svg
          className={`size-[15px] shrink-0 text-ink-faint transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M3 6l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div id={bodyId} className="flex flex-col gap-4 border-t border-line-soft px-4 pt-4 pb-5">
          <fieldset className="min-w-0">
            <legend className="label-caps mb-2">Condition</legend>
            <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
              {CONDITION_ORDER.map((c) => {
                const selected = room.condition === c;
                return (
                  <button
                    key={c}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => dispatch({ type: "setCondition", roomId: room.id, condition: c })}
                    className={`rounded-[5px] border-[1.5px] px-1.5 py-2 text-center text-[0.82rem] font-semibold transition-colors ${
                      selected ? CONDITIONS[c].tone : "border-line bg-surface text-ink-soft hover:border-ink-faint"
                    }`}
                  >
                    {CONDITIONS[c].label}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <label className="flex flex-col gap-2">
            <span className="label-caps">Notes</span>
            <textarea
              value={room.note}
              onChange={(e) => dispatch({ type: "setNote", roomId: room.id, note: e.target.value })}
              rows={3}
              placeholder="What did you see? This text goes straight into the owner report."
              className="field min-h-[4.5rem] resize-y leading-normal"
            />
          </label>

          <div>
            <span className="label-caps mb-2">Photos ({room.photos.length})</span>
            <div className="flex flex-wrap gap-2">
              {room.photos.map((photo, i) => (
                <PhotoThumb
                  key={photo.id}
                  photo={photo}
                  alt={`${room.name}, photo ${i + 1}`}
                  onRemove={() => removePhoto(photo)}
                />
              ))}
              <label className="flex size-22 shrink-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-[5px] border-[1.5px] border-dashed border-line bg-surface-2 text-[0.7rem] font-semibold text-ink-faint transition-colors hover:border-teal hover:text-teal focus-within:border-teal">
                <svg className="size-[19px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M3 8.5A1.5 1.5 0 0 1 4.5 7h2.2l1.1-2h8.4l1.1 2h2.2A1.5 1.5 0 0 1 21 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5z" />
                  <circle cx="12" cy="13" r="3.4" />
                </svg>
                Add photo
                {/* capture="environment" opens the rear camera directly on phones */}
                <input type="file" accept="image/*" capture="environment" multiple onChange={addPhotos} className="sr-only" />
              </label>
            </div>
          </div>

          <div>
            <span className="label-caps mb-2">Maintenance needed?</span>
            <form onSubmit={addMaintenance} className="flex flex-wrap gap-2">
              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="e.g. Shower seal perished"
                aria-label="Maintenance item"
                className="field min-w-0 flex-[1_1_11rem]"
              />
              <select
                value={trade}
                onChange={(e) => setTrade(e.target.value as Trade)}
                aria-label="Trade"
                className="field"
              >
                {TRADES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
              <button type="submit" className="btn btn-ghost btn-sm">
                Add item
              </button>
            </form>
            {room.maintenance.length > 0 && (
              <ul className="mt-2 flex flex-col gap-1.5">
                {room.maintenance.map((m) => (
                  <li
                    key={m.id}
                    className="flex items-center gap-2.5 rounded-[5px] border border-attn bg-attn-wash px-2.5 py-2 text-[0.88rem]"
                  >
                    <span className="flex-1 font-medium">{m.title}</span>
                    <span className="font-mono text-[0.7rem] font-semibold tracking-[0.06em] text-attn uppercase">
                      {m.trade}
                    </span>
                    <button
                      type="button"
                      onClick={() => dispatch({ type: "removeMaintenance", roomId: room.id, itemId: m.id })}
                      aria-label={`Remove ${m.title}`}
                      className="px-0.5 text-base leading-none text-attn"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
