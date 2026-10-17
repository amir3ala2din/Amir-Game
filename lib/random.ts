export const shuffle = <T>(a: readonly T[]): T[] => {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
};

export const pick = <T>(a: readonly T[], n: number): T[] => shuffle(a).slice(0, n);

export const norm = (s: unknown) => String(s).trim().toLowerCase();

/** Lower-case a subject unless it is "I" or "Ali". */
export const lc = (s: string) => (s === "I" || s === "Ali" ? s : s.toLowerCase());

/** third-person singular: go → goes, study → studies, have → has */
export const s3 = (v: string) =>
  v === "have" ? "has" : /(s|sh|ch|x|o)$/.test(v) ? v + "es" : /[^aeiou]y$/.test(v) ? v.slice(0, -1) + "ies" : v + "s";

const DOUBLE = ["run", "sit", "swim", "stop", "get", "put"];

/** -ing form */
export const ing = (v: string) =>
  v === "have" ? "having" : /[^e]e$/.test(v) ? v.slice(0, -1) + "ing" : DOUBLE.includes(v) ? v + v.slice(-1) + "ing" : v + "ing";

/**
 * Pick `n` random items, roughly ordered easy → hard
 * (short words first; items without a word are ordered by position).
 */
export const ord = <T>(d: readonly T[], n = 14): T[] => {
  const L = d.length || 1;
  const score = (x: T, i: number) => {
    const en = (x as { en?: unknown } | null)?.en;
    return typeof en === "string" && en ? Math.min(en.length, 12) / 12 + (en.includes(" ") ? 0.2 : 0) : i / L;
  };
  return pick(
    d.map((x, i) => [x, score(x, i) + Math.random() * 0.3] as const),
    n
  )
    .sort((a, b) => a[1] - b[1])
    .map((a) => a[0]);
};
