import type { Content } from "@/types";

/**
 * Module-level content store. The game generators are plain functions that read
 * the learning content synchronously, so `ContentGate` loads it (mock today,
 * Supabase later) and calls `setContent` once before any screen renders.
 */
export const content = {} as Content;

interface Derived {
  verbSet: Set<string>;
  adjSet: Set<string>;
  otherSet: Set<string>;
  /** every "opposite" word, used as a distractor pool */
  allOpposites: string[];
  jobPlaces: string[];
  jobActions: string[];
  jobNames: string[];
  jobTools: string[];
}

export const derived = {} as Derived;

export function setContent(c: Content) {
  Object.assign(content, c);
  const s = c.sentences;
  Object.assign(derived, {
    verbSet: new Set(c.posWords.v),
    adjSet: new Set(c.posWords.a),
    otherSet: new Set(c.posWords.x),
    allOpposites: [...new Set(Object.values(c.opposites).flatMap((l) => l.map((p) => p.opp)))],
    jobPlaces: [...new Set(s.map((x) => x.p))],
    jobActions: s.filter((x) => x.a).map((x) => x.a),
    jobNames: s.map((x) => x.j),
    jobTools: [...new Set(s.flatMap((x) => x.t))],
  } satisfies Derived);
}
