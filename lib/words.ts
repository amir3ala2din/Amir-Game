import type { Grade, Pos, Verb, Word } from "@/types";
import { content, derived } from "./content";
import { session } from "./session";

/** Vocabulary of a grade plus the extra words of its stage. */
export const gradeWords = (c: Grade): Word[] => {
  const k = content.stageOfGrade[c];
  return [...content.vocab[c], ...(["v", "n", "a", "x"] as const).flatMap((t) => content.extraWords[k][t])];
};

/** For the verb list, keep only the verbs taught in the current grade (if there are enough). */
export const F = <T extends { en: string }>(db: T[]): T[] => {
  if ((db as unknown) !== content.verbs) return db;
  const L = content.gradeVerbs[session.grade] ?? [];
  const f = db.filter((v) => L.includes(v.en));
  return f.length >= 8 ? f : db;
};

export const posOf = (e: string): Pos =>
  derived.verbSet.has(e) ? "v" : derived.adjSet.has(e) ? "a" : derived.otherSet.has(e) ? "x" : "n";

/** Distractors of the same part of speech as `x`. */
export const samePos = (x: Word, db: Word[], k: "en" | "ar"): string[] => {
  const p = posOf(x.en);
  const ne = (d: Word) => d.en !== x.en && d.ar !== x.ar;
  let pl = db.filter((d) => ne(d) && posOf(d.en) === p);
  if (pl.length < 3) pl = gradeWords(session.grade).filter((d) => ne(d) && posOf(d.en) === p);
  if (pl.length < 3) pl = db.filter(ne);
  return pl.map((d) => d[k]);
};

/** Verbs of a grade with their past form, for the result screen. */
export const verbsOf = (g: Grade) =>
  (content.gradeVerbs[g] ?? []).map((e) => {
    const v = content.verbs.find((x) => x.en === e);
    const w = content.vocab[g].find((x) => x.en === e);
    return { en: e, past: v ? v.past : "", ar: w?.ar || v?.ar || "" };
  });

/** Verb that makes sense for tense `k` in generated sentences. */
export const okV = (v: Verb, k: string) => !(content.badVerbs[k] ?? []).includes(v.en);

const PARTICIPLES: Record<string, string> = {
  go: "gone", eat: "eaten", drink: "drunk", write: "written", see: "seen", take: "taken", give: "given",
  speak: "spoken", run: "run", swim: "swum", sing: "sung", forget: "forgotten", come: "come", draw: "drawn",
  know: "known", drive: "driven", fly: "flown", grow: "grown",
};

/** past participle (V3) */
export const pp = (v: Verb) => PARTICIPLES[v.en] || v.past;

/** am / is / are */
export const beF = (s: string, h: boolean | number) => (s === "I" ? "am" : h ? "is" : "are");

/** Sentence subjects with `1` when they take he/she/it forms. */
export const SUBJ: [string, 0 | 1][] = [
  ["I", 0], ["You", 0], ["We", 0], ["They", 0], ["He", 1], ["She", 1], ["The teacher", 1], ["My friends", 0], ["Ali", 1],
];
