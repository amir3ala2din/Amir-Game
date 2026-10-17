import type { Grade, Pos } from "./content.types";

interface BaseQuestion {
  prompt: string;
  promptAr: string;
  /** main text; may start with an emoji that is rendered large */
  big: string;
  ans: string;
  exp: string;
  expAr: string;
  /** text read aloud instead of the default */
  say?: string;
  /** disable reading aloud */
  nosay?: boolean;
  /** shown as the correct answer instead of `ans` (e.g. "cat = قطة") */
  show?: string;
  /** button labels for option values */
  lab?: Record<string, string>;
  /** other accepted answers (typed questions) */
  alts?: string[];
}

export interface McQuestion extends BaseQuestion {
  type: "mc";
  opts: string[];
}

export interface TypedQuestion extends BaseQuestion {
  type: "ty";
  /** scrambled letters shown as hints */
  letters?: string[];
}

export interface OrderQuestion extends BaseQuestion {
  type: "ord";
  words: string[];
}

export type Question = McQuestion | TypedQuestion | OrderQuestion;

export interface Game {
  id: string;
  n: string;
  nAr: string;
  e: string;
  gen: () => Question[];
}

export type TopicKind = "v" | "g" | "e";

export interface Topic {
  id: string;
  n: string;
  ar: string;
  e: string;
  /** 0 = must-know, 1-3 = school term */
  term: number;
  c: Grade;
  k: TopicKind;
  /** word type tab; "m" = mixed */
  pos?: Pos | "m";
  games: Game[];
}

export interface LogEntry {
  q: string;
  a: string;
  c: string;
  ok: boolean;
  ar: string;
  w: string;
}

export interface GameResult {
  s: number;
  t: number;
  log: LogEntry[];
}

/** A word the learner got wrong, remembered per grade. */
export interface MissedWord {
  en: string;
  ar: string;
  e?: string;
  c: Grade;
}

export type BestScores = Record<string, number>;
