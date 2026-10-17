/**
 * Loads mock/ into Supabase (content tables only). The tables are read-only for the app, so
 * run it with a key that may insert: the service_role key (SUPABASE_KEY), never a NEXT_PUBLIC_ one.
 *
 *   SUPABASE_URL=... SUPABASE_KEY=<service_role> npm run seed
 *
 * It does not delete; empty the content tables first when re-seeding (or resume a failed
 * run with SKIP=table1,table2).
 */
import { contentMock as c } from "../mock";

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_KEY;
if (!url || !key) throw new Error("Set SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) and SUPABASE_KEY.");

const headers: Record<string, string> = { apikey: key, "Content-Type": "application/json" };
// legacy JWT keys also go in Authorization; new sb_* keys must not
if (key.startsWith("eyJ")) headers.Authorization = `Bearer ${key}`;
// optional one-time token for a temporary insert policy (see git history of this setup)
if (process.env.SEED_TOKEN) headers["x-seed-token"] = process.env.SEED_TOKEN;

type Row = Record<string, unknown>;

const skip = (process.env.SKIP || "").split(",");

async function insert(table: string, rows: Row[], returning = false): Promise<Row[]> {
  const out: Row[] = [];
  if (skip.includes(table)) return out;
  for (let i = 0; i < rows.length; i += 500) {
    const res = await fetch(`${url}/rest/v1/${table}`, {
      method: "POST",
      headers: { ...headers, Prefer: returning ? "return=representation" : "return=minimal" },
      body: JSON.stringify(rows.slice(i, i + 500)),
    });
    if (!res.ok) throw new Error(`${table}: ${res.status} ${await res.text()}`);
    if (returning) out.push(...((await res.json()) as Row[]));
  }
  console.log(`${table}: ${rows.length}`);
  return out;
}

const idx = <T>(a: readonly T[]) => a.map((x, sort) => [x, sort] as const);

async function main() {
  const grades = Object.keys(c.stageOfGrade) as (keyof typeof c.stageOfGrade)[];
  await insert("grades", idx(grades).map(([code, sort]) => ({ code, stage: c.stageOfGrade[code], sort })));

  const levels = [
    ...c.schoolLevels.map((l, sort) => ({ path: "school", l, sort })),
    ...c.generalLevels.map((l, sort) => ({ path: "general", l, sort })),
  ];
  await insert("levels", levels.map(({ path, l, sort }) => ({ key: l[2], path, label_en: l[0], label_ar: l[1], emoji: l[3], sort })));
  await insert(
    "level_grades",
    Object.entries(c.generalToGrades).flatMap(([level_key, gs]) => gs.map((grade, sort) => ({ level_key, grade, sort })))
  );

  const word = (w: { en: string; ar: string; e?: string }, sort: number) => ({ en: w.en, ar: w.ar, emoji: w.e ?? null, sort });
  await insert("words", [
    ...Object.entries(c.vocab).flatMap(([grade, ws]) => ws.map((w, i) => ({ grade, stage: null, pos: null, ...word(w, i) }))),
    ...Object.entries(c.extraWords).flatMap(([stage, byPos]) =>
      Object.entries(byPos).flatMap(([pos, ws]) => ws.map((w, i) => ({ grade: null, stage, pos, ...word(w, i) })))
    ),
  ]);
  await insert(
    "grade_opposites",
    Object.entries(c.opposites).flatMap(([grade, ps]) => ps.map((p, sort) => ({ grade, en: p.en, ar: p.ar, opp: p.opp, opp_ar: p.oppAr, sort })))
  );
  await insert("adjective_pairs", c.adjPairs.map((p, sort) => ({ en: p.en, ar: p.ar, opp: p.opp, opp_ar: p.oppAr, tag: p.g ?? null, sort })));
  await insert("verbs", c.verbs.map((v, sort) => ({ en: v.en, past: v.past, ar: v.ar, obj: v.obj, tag: v.g ?? null, sort })));
  await insert("grade_verbs", Object.entries(c.gradeVerbs).flatMap(([grade, vs]) => vs.map((verb, sort) => ({ grade, verb, sort }))));
  await insert(
    "topic_groups",
    Object.entries(c.groups).flatMap(([grade, gs]) =>
      gs.map(([name_en, name_ar, emoji, term, words], sort) => ({ grade, name_en, name_ar, emoji, term, words: words.split(","), sort }))
    )
  );
  await insert("grammar_topics", Object.entries(c.topicNames).map(([key, [name_en, name_ar, emoji]]) => ({ key, name_en, name_ar, emoji })));
  await insert(
    "grammar_plan",
    Object.entries(c.grammarPlan).flatMap(([grade, ps]) => ps.map(([topic_key, term], sort) => ({ grade, topic_key, term, sort })))
  );
  await insert(
    "pos_words",
    Object.entries(c.posWords).flatMap(([pos, ws]) => ws.map((word, sort) => ({ pos, word, sort })))
  );
  await insert("synonyms", Object.entries(c.synonyms).map(([en, syn]) => ({ en, syn })));
  await insert("adjective_docs", c.adjDocs.map((d, sort) => ({ en: d.en, synonyms: d.syn, antonyms: d.ant, sort })));
  await insert(
    "adjective_topics",
    c.adjTopics.map(([name_en, name_ar, emoji, term, words], sort) => ({ name_en, name_ar, emoji, term, words: words.split(","), sort }))
  );
  await insert(
    "job_words",
    Object.entries(c.jobTopicWords as unknown as Record<string, Parameters<typeof word>[0][]>).flatMap(([set_key, ws]) => ws.map((w, i) => ({ set_key, ...word(w, i) })))
  );
  await insert(
    "job_sentences",
    c.sentences.map((s, sort) => ({ job: s.j, place: s.p, place_phrase: s.pp, tools: s.t, action: s.a, full_text: s.rest, blanked_text: s.b, sort }))
  );
  const pairs = (kind: string, ps: readonly (readonly [string, string])[]) => ps.map(([a, b], sort) => ({ kind, a, b, sort }));
  await insert("word_pairs", [
    ...pairs("comparative", c.comparatives),
    ...pairs("plural", c.plurals),
    ...pairs("time_marker", c.timeMarkers),
    ...pairs("ed_sound", c.edSounds),
    ...pairs("s_sound", c.sSounds),
  ]);
  await insert("prepositions", c.prepositions.map(([sentence, answer, ar], sort) => ({ sentence, answer, ar, sort })));
  const hints = (kind: string, h: Record<string, [string, string]>) => Object.entries(h).map(([key, [en, ar]]) => ({ kind, key, en, ar }));
  await insert("hints", [...hints("modal", c.modalHints), ...hints("link", c.linkHints), ...hints("cause", c.causeHints)]);
  await insert("bad_verbs", Object.entries(c.badVerbs).flatMap(([tense, vs]) => vs.map((verb, sort) => ({ tense, verb, sort }))));
  await insert(
    "question_bank",
    Object.entries(c.banks).flatMap(([bank, rows]) =>
      rows.map(([question, answer, wrong, hint_key], sort) => ({ bank, question, answer, wrong, hint_key: hint_key ?? null, sort }))
    )
  );
  await insert("dialogues", c.dialogues.map(([question, answer, wrong], sort) => ({ question, answer, wrong, sort })));

  // texts first (need their ids), then their questions
  const texts = [
    ...Object.entries(c.reading).flatMap(([stage, ts]) => ts.map(([body, qs], i) => ({ kind: "reading", stage, body, sort: i, qs }))),
    ...c.bemReading.map(([body, qs], i) => ({ kind: "bem", stage: null, body, sort: i, qs })),
  ];
  const saved = await insert(
    "reading_texts",
    texts.map(({ kind, stage, body, sort }) => ({ kind, stage, body, sort })),
    true
  );
  const key2 = (r: Row) => `${r.kind}|${r.stage}|${r.sort}`;
  const idOf = new Map(saved.map((r) => [key2(r), r.id as number]));
  await insert(
    "reading_questions",
    texts.flatMap((t) => {
      const text_id = idOf.get(key2(t as unknown as Row))!;
      return (t.qs as readonly (readonly string[])[]).map((q, sort) =>
        t.kind === "reading"
          ? { text_id, question: q[0], answer: q[1], wrong: q[2], evidence: null, sort }
          : { text_id, question: q[0], answer: q[1], wrong: null, evidence: q[2], sort }
      );
    })
  );
  const sentences = (kind: string, ss: string[]) => ss.map((body, sort) => ({ kind, body, sort }));
  await insert("example_sentences", [
    ...sentences("prim", c.primSentences),
    ...sentences("mid", c.midSentences),
    ...sentences("sec", c.secSentences),
    ...sentences("bem", c.bemSentences),
  ]);
  await insert(
    "sequences",
    Object.entries(c.sequences).flatMap(([grade, ts]) => (ts ?? []).map(([title_en, title_ar], i) => ({ grade, term: i + 1, title_en, title_ar })))
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
