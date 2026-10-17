/** Algerian school grades. 3AP = 3rd year primary … 3AS = 3rd year secondary (BAC). */
export type Grade =
  | "3AP"
  | "4AP"
  | "5AP"
  | "1AM"
  | "2AM"
  | "3AM"
  | "4AM"
  | "1AS"
  | "2AS"
  | "3AS";

/** CEFR levels of the "general English" path. */
export type CefrLevel = "A1" | "A2" | "B1" | "B2";

/** Programme stage: Primary / Middle / Secondary. */
export type Stage = "P" | "M" | "S";

/** Part of speech: noun, verb, adjective, other ("x"). */
export type Pos = "n" | "v" | "a" | "x";

export interface Word {
  en: string;
  ar: string;
  /** emoji */
  e?: string;
}

export interface Verb {
  en: string;
  past: string;
  ar: string;
  /** typical object / complement, e.g. "to school" */
  obj: string;
  /** source tag (kept from the original data, informational) */
  g?: string;
}

/** Adjective with its opposite. */
export interface OppPair {
  en: string;
  ar: string;
  opp: string;
  oppAr: string;
  g?: string;
}

/** [nameEn, nameAr, emoji, term (1-3, 0 = any), comma-separated english words] */
export type GroupDef = [string, string, string, number, string];

/** Tense / grammar topic keys that have a game set. */
export type GrammarKey =
  | "wf" | "eq" | "pasp" | "wh" | "cau" | "ppw" | "sup" | "pfx" | "imp" | "c1"
  | "ob" | "ut" | "link" | "cond" | "pas" | "comp" | "plur" | "mod" | "tm"
  | "prep" | "be" | "pres" | "pc" | "past" | "pastc" | "pp" | "fut";

export type BankKey =
  | "modal" | "link" | "cond" | "passive" | "usedTo" | "equality" | "passivePast"
  | "whenWhile" | "cause" | "presentPerfectAdv" | "prefix" | "imperative"
  | "cond1" | "obligation" | "punctuation" | "wordForm";

/** [topic, term] */
export type GrammarPlan = [GrammarKey, number];

/** [question with ___, answer, wrong options, optional explanation key] */
export type McRow = [string, string, string[], string?];

/** [english, arabic] explanation pair */
export type Pair = [string, string];

export interface SentenceRow {
  /** job */
  j: string;
  /** place */
  p: string;
  /** "in a workshop" */
  pp: string;
  /** tools */
  t: string[];
  /** action */
  a: string;
  /** full text */
  rest: string;
  /** text with the job blanked */
  b: string;
}

export interface AdjDoc {
  en: string;
  syn: string[];
  ant: string[];
}

export type ReadingQ = [question: string, answer: string, wrong: string[]];
export type ReadingText = [text: string, questions: ReadingQ[]];
/** [statement, answer (True/False/Not mentioned), evidence] */
export type BemQ = [string, string, string];
export type BemText = [text: string, questions: BemQ[]];

/** [label en, label ar, key, emoji] — one tile on the level picker */
export type LevelDef = [string, string, string, string];

export interface JobTopicWords {
  family: Word[];
  jobs: Word[];
}

/** Everything the game needs; today served by mocks, later by Supabase. */
export interface Content {
  vocab: Record<Grade, Word[]>;
  extraWords: Record<Stage, Record<Pos, Word[]>>;
  opposites: Record<Grade, OppPair[]>;
  groups: Record<Grade, GroupDef[]>;
  grammarPlan: Record<Grade, GrammarPlan[]>;
  gradeVerbs: Record<Grade, string[]>;
  stageOfGrade: Record<Grade, Stage>;
  verbs: Verb[];
  adjPairs: OppPair[];
  posWords: { v: string[]; a: string[]; x: string[] };
  synonyms: Record<string, string>;
  adjDocs: AdjDoc[];
  adjTopics: GroupDef[];
  jobTopicWords: JobTopicWords;
  sentences: SentenceRow[];
  comparatives: Pair[];
  plurals: Pair[];
  modalHints: Record<string, Pair>;
  linkHints: Record<string, Pair>;
  causeHints: Record<string, Pair>;
  badVerbs: Record<string, string[]>;
  timeMarkers: Pair[];
  prepositions: [string, string, string][];
  banks: Record<BankKey, McRow[]>;
  dialogues: [string, string, string[]][];
  reading: Record<Stage, ReadingText[]>;
  bemReading: BemText[];
  edSounds: Pair[];
  sSounds: Pair[];
  primSentences: string[];
  midSentences: string[];
  secSentences: string[];
  bemSentences: string[];
  topicNames: Record<string, [string, string, string]>;
  schoolLevels: LevelDef[];
  generalLevels: LevelDef[];
  generalToGrades: Record<CefrLevel, Grade[]>;
  /** term titles shown for grades that follow the national sequences */
  sequences: Partial<Record<Grade, Pair[]>>;
}
