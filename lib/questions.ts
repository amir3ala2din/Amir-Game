import type { McQuestion, TypedQuestion, Question } from "@/types";
import { pick, shuffle } from "./random";

/** Multiple choice: the answer plus 3 random distractors from `pool`. */
export const mc = (
  prompt: string,
  promptAr: string,
  big: string,
  ans: string,
  pool: readonly string[],
  exp: string,
  expAr: string
): McQuestion => ({
  type: "mc",
  prompt,
  promptAr,
  big,
  opts: shuffle([ans, ...pick([...new Set(pool)].filter((x) => x !== ans), 3)]),
  ans,
  exp,
  expAr,
});

/** Typed answer. */
export const ty = (
  prompt: string,
  promptAr: string,
  big: string,
  ans: string,
  exp: string,
  expAr: string,
  letters?: string[]
): TypedQuestion => ({ type: "ty", prompt, promptAr, big, ans, exp, expAr, letters });

/** Same question, read aloud with `say`. */
export const sy = <Q extends Question>(q: Q, say: string): Q => ({ ...q, say });
