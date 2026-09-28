import type { Trade } from "./types";

export const TRADES: Trade[] = ["Plumber", "Electrician", "Builder", "Painter", "Gardener", "Cleaner", "Handyman"];

// Typical call-out plus first hour, used to give the owner a ballpark before quotes come back.
export const TRADE_ESTIMATES: Record<Trade, number> = {
  Plumber: 280,
  Electrician: 240,
  Builder: 650,
  Painter: 420,
  Gardener: 180,
  Cleaner: 160,
  Handyman: 200,
};
