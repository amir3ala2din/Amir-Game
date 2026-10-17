import type { BestScores, Grade, MissedWord } from "@/types";
import { isMocked } from "@/utils";

// Mock branch persists in localStorage (same keys as the original app, so saved progress survives).
// TODO(supabase): replace the `else` branches with per-user rows once auth exists.
const read = <T>(key: string, fallback: T): T => {
  try {
    return JSON.parse(localStorage.getItem(key) ?? "null") ?? fallback;
  } catch {
    return fallback;
  }
};
const write = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
};
const notWired = (): never => {
  throw new Error("Supabase progress is not wired yet. Set NEXT_PUBLIC_MOCK=true.");
};

const missKey = (g: Grade) => "ta_miss_" + g;

export const getBestHandler = async (): Promise<BestScores> => {
  if (isMocked) return read<BestScores>("ta_best", {});
  return notWired();
};

/** Keeps the highest score (percent) per game. */
export const saveBestHandler = async ({ gameId, pct }: { gameId: string; pct: number }): Promise<BestScores> => {
  if (!isMocked) return notWired();
  const best = read<BestScores>("ta_best", {});
  const next = { ...best, [gameId]: Math.max(best[gameId] || 0, pct) };
  write("ta_best", next);
  return next;
};

export const getMissesHandler = async (grades: Grade[]): Promise<MissedWord[]> => {
  if (isMocked) return grades.flatMap((g) => read<MissedWord[]>(missKey(g), []));
  return notWired();
};

export const saveMissHandler = async (w: MissedWord): Promise<void> => {
  if (!isMocked) return notWired();
  const a = read<MissedWord[]>(missKey(w.c), []);
  if (!a.some((x) => x.en === w.en)) a.push(w);
  write(missKey(w.c), a.slice(-80));
};

export const dropMissHandler = async (w: MissedWord): Promise<void> => {
  if (!isMocked) return notWired();
  write(missKey(w.c), read<MissedWord[]>(missKey(w.c), []).filter((x) => x.en !== w.en));
};

export const getMuteHandler = async (): Promise<boolean> => {
  if (isMocked) return localStorage.getItem("ta_mute") === "1";
  return notWired();
};

export const setMuteHandler = async (muted: boolean): Promise<boolean> => {
  if (!isMocked) return notWired();
  try {
    localStorage.setItem("ta_mute", muted ? "1" : "0");
  } catch {}
  return muted;
};
