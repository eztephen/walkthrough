import type { Room } from "./types";
import { needsAction } from "./conditions";
import { TRADE_ESTIMATES } from "./trades";

export type Summary = {
  done: number;
  total: number;
  photos: number;
  needsAttention: number;
  maintenance: number;
};

export function summarise(rooms: Room[]): Summary {
  return {
    done: rooms.filter((r) => r.condition).length,
    total: rooms.length,
    photos: rooms.reduce((n, r) => n + r.photos.length, 0),
    needsAttention: rooms.filter((r) => needsAction(r.condition)).length,
    maintenance: rooms.reduce((n, r) => n + r.maintenance.length, 0),
  };
}

export type Overall = "Good" | "Fair" | "Poor";

// Damage weighs double. One problem room makes the property "Fair"; three points of trouble make it "Poor".
export function overallCondition(rooms: Room[]): Overall | null {
  const assessed = rooms.filter((r) => r.condition);
  if (!assessed.length) return null;

  let trouble = 0;
  let fair = 0;
  for (const room of assessed) {
    if (room.condition === "damaged") trouble += 2;
    else if (room.condition === "attention") trouble += 1;
    else if (room.condition === "fair") fair += 1;
  }

  if (trouble >= 3) return "Poor";
  if (trouble >= 1 || fair >= 2) return "Fair";
  return "Good";
}

export function maintenanceSchedule(rooms: Room[]) {
  const rows = rooms.flatMap((room) =>
    room.maintenance.map((item) => ({
      id: item.id,
      title: item.title,
      trade: item.trade,
      roomName: room.name,
      estimate: TRADE_ESTIMATES[item.trade],
    })),
  );
  return {
    rows,
    total: rows.reduce((sum, row) => sum + row.estimate, 0),
    trades: [...new Set(rows.map((row) => row.trade))],
  };
}

export function formatElapsed(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = String(seconds % 60).padStart(2, "0");
  return h ? `${h}:${String(m).padStart(2, "0")}:${s}` : `${m}:${s}`;
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h ? `${h} h ${m} m` : `${m} m`;
}

const currency = new Intl.NumberFormat("en-NZ", { style: "currency", currency: "NZD", maximumFractionDigits: 0 });
export const formatCurrency = (amount: number) => currency.format(amount);

const longDate = new Intl.DateTimeFormat("en-NZ", { day: "numeric", month: "long", year: "numeric" });
export const formatLongDate = (ms: number) => longDate.format(ms);

const monthYear = new Intl.DateTimeFormat("en-NZ", { month: "long", year: "numeric" });
export function nextDueLabel(fromMs: number, monthsAhead = 3): string {
  const due = new Date(fromMs);
  due.setMonth(due.getMonth() + monthsAhead);
  return monthYear.format(due);
}
