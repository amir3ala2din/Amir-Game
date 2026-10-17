import type { BestScores, Grade, MissedWord } from "@/types";
import { ensureUser, getSupabase, isMocked } from "@/utils";

// Each handler uses Supabase (per-user rows, anonymous sign-in) unless NEXT_PUBLIC_MOCK=true or
// anonymous sign-ins are disabled, in which case progress lives in localStorage (same keys as
// the original app, so saved progress survives).
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

/** Supabase client when progress is remote, otherwise null (use localStorage). */
const remote = async () => (!isMocked && (await ensureUser()) ? getSupabase() : null);

const MISSED_PER_GRADE = 80;
const missKey = (g: Grade) => "ta_miss_" + g;

export const getBestHandler = async (): Promise<BestScores> => {
  const db = await remote();
  if (!db) return read<BestScores>("ta_best", {});
  const { data, error } = await db.from("game_best").select("game_id, pct");
  if (error) throw error;
  return Object.fromEntries(data.map((r) => [r.game_id, r.pct]));
};

/** Keeps the highest score (percent) per game and returns all scores. */
export const saveBestHandler = async ({ gameId, pct }: { gameId: string; pct: number }): Promise<BestScores> => {
  const db = await remote();
  if (!db) {
    const best = read<BestScores>("ta_best", {});
    const next = { ...best, [gameId]: Math.max(best[gameId] || 0, pct) };
    write("ta_best", next);
    return next;
  }
  const { error } = await db.rpc("save_best", { p_game_id: gameId, p_pct: pct });
  if (error) throw error;
  return getBestHandler();
};

export const getMissesHandler = async (grades: Grade[]): Promise<MissedWord[]> => {
  const db = await remote();
  if (!db) return grades.flatMap((g) => read<MissedWord[]>(missKey(g), []));
  const perGrade = await Promise.all(
    grades.map(async (c) => {
      const { data, error } = await db
        .from("missed_words")
        .select("en, ar, emoji")
        .eq("grade", c)
        .order("created_at", { ascending: false })
        .limit(MISSED_PER_GRADE);
      if (error) throw error;
      // oldest first, like the localStorage list
      return data.reverse().map((r): MissedWord => ({ en: r.en, ar: r.ar, e: r.emoji ?? undefined, c }));
    })
  );
  return perGrade.flat();
};

export const saveMissHandler = async (w: MissedWord): Promise<void> => {
  const db = await remote();
  if (!db) {
    const a = read<MissedWord[]>(missKey(w.c), []);
    if (!a.some((x) => x.en === w.en)) a.push(w);
    return write(missKey(w.c), a.slice(-MISSED_PER_GRADE));
  }
  // ponytail: rows beyond the newest 80 per grade are ignored on read, not deleted
  const { error } = await db
    .from("missed_words")
    .upsert({ grade: w.c, en: w.en, ar: w.ar, emoji: w.e ?? null }, { onConflict: "user_id,grade,en", ignoreDuplicates: true });
  if (error) throw error;
};

export const dropMissHandler = async (w: MissedWord): Promise<void> => {
  const db = await remote();
  if (!db) return write(missKey(w.c), read<MissedWord[]>(missKey(w.c), []).filter((x) => x.en !== w.en));
  const { error } = await db.from("missed_words").delete().eq("grade", w.c).eq("en", w.en);
  if (error) throw error;
};

export const getMuteHandler = async (): Promise<boolean> => {
  const db = await remote();
  if (!db) return localStorage.getItem("ta_mute") === "1";
  const { data, error } = await db.from("user_prefs").select("muted").maybeSingle();
  if (error) throw error;
  return data?.muted ?? false;
};

export const setMuteHandler = async (muted: boolean): Promise<boolean> => {
  const db = await remote();
  if (!db) {
    try {
      localStorage.setItem("ta_mute", muted ? "1" : "0");
    } catch {}
    return muted;
  }
  const { error } = await db.from("user_prefs").upsert({ muted }, { onConflict: "user_id" });
  if (error) throw error;
  return muted;
};
