import type { CefrLevel, Game, Grade, GrammarKey, LevelDef, Pos, Question, Topic, TopicKind, Word } from "@/types";
import { content } from "./content";
import { obSB, c1SB, cauSB, condSB, eqSB, impSB, linkSB, modSB, paspSB, pasSB, pfxSB, ppwSB, punG, utSB, whSB, wfSB } from "./generators/banks";
import { addS, beSB, compSB, correctS, irregular, pastSB, plurSB, ppT, prepSB, presentSB, supSB, tenseSB, tmSB } from "./generators/grammar";
import { bemG, dlgG, edG, ordG, readG, sendG } from "./generators/practice";
import { actQ, antDoc, fillJob, formsG, meaning, missG, oddG, opposites, picG, relDoc, s3G, scramble, synG, toolQ, translate, tf, typDoc, typeG, wherework } from "./generators/vocab";
import { gradeWords, posOf } from "./words";

const G = (id: string, n: string, nAr: string, e: string, gen: () => Question[]): Game => ({ id, n, nAr, e, gen });

const mkT = (c: Grade, id: string, n: string, ar: string, e: string, term: number, games: Game[], k: TopicKind = "v", pos?: Topic["pos"]): Topic => ({
  id: c + id,
  n,
  ar,
  e,
  term,
  c,
  k,
  pos,
  games: games.map((g) => ({ ...g, id: c + g.id })),
});

/** Standard vocabulary games for a word list. */
const STD = (p: string, db: Word[]): Game[] => [
  G(p + "v", "Vocabulary Matching", "مطابقة المفردات", "🧩", meaning(db)),
  G(p + "t", "Yes or No", "", "✅", tf(db)),
  G(p + "w", "Write in English", "اكتب بالإنجليزية", "✏️", translate(db)),
  ...(db.filter((x) => !x.en.includes(" ") && x.en.length > 2).length >= 3 ? [G(p + "s", "Spelling Scramble", "رتّب الحروف", "🔤", scramble(db))] : []),
  ...(db.filter((x) => content.synonyms[x.en]).length >= 4 ? [G(p + "y", "Synonyms", "المرادفات", "🔁", synG(db))] : []),
];

const SBG = (id: string, gen: () => Question[]) => G(id, "Sentence Builder", "بناء الجمل", "✍️", gen);

/** Games per grammar topic. */
const GRAMMAR_GAMES: Record<GrammarKey, () => Game[]> = {
  wf: () => [SBG("wf", wfSB)],
  eq: () => [SBG("eq", eqSB)],
  pasp: () => [SBG("pa4", paspSB)],
  wh: () => [SBG("wh", whSB)],
  cau: () => [SBG("cu", cauSB)],
  ppw: () => [SBG("pw", ppwSB)],
  sup: () => [SBG("su", supSB)],
  pfx: () => [SBG("px", pfxSB)],
  imp: () => [SBG("im", impSB)],
  c1: () => [SBG("c1", c1SB)],
  ob: () => [SBG("ob", obSB)],
  ut: () => [SBG("ut", utSB)],
  link: () => [SBG("lk", linkSB)],
  cond: () => [SBG("cd", condSB)],
  pas: () => [SBG("pv", pasSB)],
  comp: () => [SBG("cm", compSB)],
  plur: () => [SBG("pl", plurSB)],
  mod: () => [SBG("md", modSB)],
  tm: () => [SBG("tm", tmSB)],
  prep: () => [SBG("pr", prepSB)],
  be: () => [SBG("be", beSB)],
  pres: () => [SBG("ps", presentSB), G("pc", "Which is Correct?", "أيّ جملة صحيحة؟", "🧐", correctS("p")), G("pa", "Add -s / -es", "أضف s / es", "➕", addS)],
  past: () => [SBG("ts", pastSB), G("tc", "Which is Correct?", "أيّ جملة صحيحة؟", "🧐", correctS("t")), G("ti", "Irregular Verbs", "الأفعال الشاذة", "🔥", irregular)],
  pc: () => [SBG("x1", tenseSB("pc"))],
  pastc: () => [SBG("x2", tenseSB("pastc"))],
  fut: () => [SBG("x3", tenseSB("fut"))],
  pp: () => [SBG("x4", tenseSB("pp")), G("pt", "Past Participle", "التصريف الثالث", "🔠", ppT)],
};

const POSN: Record<Pos, [string, string, string]> = {
  n: ["Nouns", "الأسماء", "📦"],
  v: ["Verbs", "الأفعال", "🏃"],
  a: ["Adjectives", "الصفات", "✨"],
  x: ["Words", "كلمات", "🔤"],
};
const POS_LIST: Pos[] = ["n", "v", "a", "x"];

const jobTopics = (c: Grade): Topic[] => {
  const { family, jobs } = content.jobTopicWords;
  return [
    mkT(c, "fm", "Family Members", "أفراد العائلة", "👨‍👩‍👧", 1, STD("fm", family)),
    mkT(c, "jb", "Jobs", "المهن", "💼", 1, STD("jb", jobs)),
    mkT(c, "wp", "Workplaces", "أماكن العمل", "🏢", 1, [G("ww", "Where does he work?", "أين يعمل؟", "🏢", wherework)]),
    mkT(c, "tl", "Tools", "الأدوات", "🛠️", 1, [G("tq", "What does he have?", "ماذا يملك؟", "🛠️", toolQ)]),
    mkT(c, "ac", "What do they do?", "ماذا يفعلون؟", "⚙️", 1, [G("aq", "What does he do?", "ماذا يفعل؟", "⚙️", actQ)]),
    mkT(c, "rd", "Read & Complete", "اقرأ وأكمل", "📖", 1, [G("fj", "Who is he?", "من هو؟", "🕵️", fillJob)]),
  ];
};
const jobTopicsP = (c: Grade) => jobTopics(c).map((t, i): Topic => ({ ...t, pos: i === 4 ? "v" : "n" }));

/** Extra games for a word list of part of speech `q`; `pool` = distractors for "odd one out". */
const posGames = (p: string, ws: Word[], q: Pos, pool: Word[]): Game[] => {
  const ex: Game[] = [];
  if (q === "v") {
    const f = ws.filter((x) => content.verbs.some((v) => v.en === x.en));
    if (f.length >= 3) ex.push(G(p + "f", "Past Forms", "صيغ الماضي", "⏪", formsG(f)));
    const t = ws.filter((x) => !x.en.includes(" "));
    if (t.length >= 3) ex.push(G(p + "e", "Add -s / -es", "أضف s / es", "➕", s3G(t)));
  }
  if (q === "a") {
    const ao = content.adjPairs.filter((a) => ws.some((x) => x.en === a.en));
    if (ao.length >= 3) ex.push(G(p + "o", "Opposites", "الأضداد", "↔️", opposites(ao)));
  }
  return [
    ...STD(p, ws),
    ...(ws.filter((x) => !x.en.includes(" ") && x.en.length > 2).length >= 3 ? [G(p + "m", "Missing Letter", "الحرف الناقص", "🔡", missG(ws))] : []),
    ...(ws.filter((x) => x.e).length >= 4 ? [G(p + "i", "Picture Match", "صورة وكلمة", "🖼️", picG(ws))] : []),
    ...(ws.length >= 3 && pool.filter((x) => !ws.includes(x)).length >= 1 ? [G(p + "d", "Odd One Out", "الكلمة الشاذة", "🧐", oddG(ws, pool))] : []),
    ...ex,
  ];
};

const adjDocTopics = (c: Grade): Topic[] => {
  const dict = Object.fromEntries(content.vocab[c].map((x) => [x.en, x]));
  const all = gradeWords(c).filter((x) => posOf(x.en) === "a");
  return content.adjTopics.map(([n, ar, e, term, ws], k) => {
    const nm = ws.split(",");
    const w = nm.map((x) => dict[x]).filter(Boolean);
    const it = content.adjDocs.filter((x) => nm.includes(x.en));
    const ant = it.filter((x) => x.ant.length);
    return mkT(
      c,
      "ad" + k,
      n,
      ar,
      e,
      term,
      [
        ...posGames("ad" + k, w, "a", all).filter((g) => g.n !== "Opposites"),
        ...(ant.length >= 4 ? [G("od", "Opposites (your list)", "الأضداد", "↔️", antDoc(it))] : []),
        G("rl", "Synonym or Opposite?", "مرادف أم ضد؟", "🔀", relDoc(it)),
        G("tp", "Write a Synonym / Opposite", "اكتب المرادف أو الضد", "✏️", typDoc(it)),
      ],
      "v",
      "a"
    );
  });
};

/** All topics (vocabulary, grammar, exam practice) of one grade. */
const gradeTopics = (c: Grade): Topic[] => {
  const dict = Object.fromEntries(content.vocab[c].map((x) => [x.en, x]));
  const r: Topic[] = [];
  const gw = gradeWords(c).filter((x, i, a) => a.findIndex((y) => y.en === x.en) === i);
  const by = (q: Pos) => gw.filter((x) => posOf(x.en) === q);
  const sm: Record<string, { q: Pos; term: number; ws: Word[] }> = {};

  (content.groups[c] || []).forEach(([n, ar, e, term, ws], k) => {
    const w = ws.split(",").map((x) => dict[x]).filter(Boolean);
    POS_LIST.forEach((q) => {
      const b = w.filter((x) => posOf(x.en) === q);
      if (b.length >= 6) r.push(mkT(c, "g" + k + q, n, ar, e, term, posGames("g" + k + q, b, q, by(q)), "v", q));
      else if (b.length) {
        const key = q + term;
        (sm[key] = sm[key] || { q, term, ws: [] }).ws.push(...b);
      }
    });
  });
  Object.values(sm).forEach((o) => {
    if (o.ws.length >= 5) r.push(mkT(c, "sm" + o.q + o.term, "More Words", "كلمات أخرى", "🧩", o.term, posGames("sm" + o.q + o.term, o.ws, o.q, by(o.q)), "v", o.q));
  });
  POS_LIST.forEach((q) =>
    r.push(
      mkT(
        c,
        "mk" + q,
        "Must-Know " + POSN[q][0],
        "أهم " + POSN[q][1],
        POSN[q][2],
        0,
        [...posGames("mk" + q, by(q), q, []), ...(q === "n" ? [G("pu", "Plurals", "الجمع", "📚", plurSB)] : q === "a" ? [G("cp", "Comparatives", "المقارنة", "⚖️", compSB)] : [])],
        "v",
        q
      )
    )
  );
  if (c === "3AM" || c === "4AM") r.push(...adjDocTopics(c));
  POS_LIST.forEach((q) => {
    const pool = by(q);
    const sz = Math.ceil(pool.length / 3);
    [1, 2, 3].forEach((t) => {
      if (r.some((x) => x.k === "v" && x.pos === q && x.term === t)) return;
      const ws = pool.slice((t - 1) * sz, t * sz);
      if (ws.length >= 4) r.push(mkT(c, "fl" + q + t, "More " + POSN[q][0], "المزيد من " + POSN[q][1], POSN[q][2], t, posGames("fl" + q + t, ws, q, pool), "v", q));
    });
  });
  r.push(mkT(c, "o", "Opposites", "الأضداد", "↔️", 3, [G("op", "Opposites", "الأضداد", "↔️", opposites(content.opposites[c]))], "v", "a"));
  r.push(mkT(c, "mx", "Mixed Challenge", "تحدّي منوّع", "🎯", 0, [...STD("mx", gw), G("mt", "Word Type", "نوع الكلمة", "🏷️", typeG(gw)), G("mm", "Missing Letter", "الحرف الناقص", "🔡", missG(gw))], "v", "m"));
  (content.grammarPlan[c] || []).forEach(([k, term]) => {
    const [n, ar, e] = content.topicNames[k];
    r.push(mkT(c, k, n, ar, e, term, GRAMMAR_GAMES[k](), "g"));
  });
  r.push(
    mkT(c, "xo", "Build the Sentence", "ركّب الجملة", "🧱", 0, [G("os", "Build the Sentence", "ركّب الجملة", "🧱", ordG)], "e"),
    mkT(c, "xd", "Dialogues", "الحوارات", "💬", 0, [G("dl", "Choose the Reply", "اختر الرد", "💬", dlgG)], "e"),
    mkT(c, "xr", "Read & Answer", "اقرأ وأجب", "📖", 0, [G("rd", "Reading Questions", "أسئلة القراءة", "📖", readG)], "e")
  );
  if (c === "4AM")
    r.push(
      mkT(c, "xb", "BEM Reading", "قراءة (BEM)", "📖", 0, [G("bm", "True / False / Not Mentioned", "صح / خطأ / لم يُذكر", "📖", bemG)], "e"),
      mkT(c, "xp", "Pronunciation", "النطق", "🔊", 0, [G("pe", "-ed endings", "نهاية ed", "🔊", edG), G("ps2", "-s endings", "نهاية s", "🔊", sendG)], "e"),
      mkT(c, "xu", "Punctuation", "علامات الترقيم", "✍️", 0, [G("pn", "Punctuation & Capitals", "الترقيم والحروف الكبيرة", "✍️", punG)], "e")
    );
  if (c === "4AP" || c === "5AP") r.push(...jobTopicsP(c));
  return r;
};

/** Grades covered by a level tile (a CEFR level spans several grades). */
export const gradesOf = (l: LevelDef): Grade[] => content.generalToGrades[l[2] as CefrLevel] ?? [l[2] as Grade];

/** Topics of a level; CEFR levels prefix the grade to each title. */
export const topicsFor = (l: LevelDef): Topic[] => {
  const gs = gradesOf(l);
  return gs.flatMap((c) => gradeTopics(c).map((t) => (gs.length > 1 ? { ...t, n: c + " – " + t.n } : t)));
};

/** "My Mistakes" topic built from saved wrong words. */
export const mistakesTopic = (c: Grade, words: Word[]): Topic => ({
  id: "miss",
  n: "My Mistakes",
  ar: "أخطائي",
  e: "🔁",
  term: 0,
  c,
  k: "v",
  pos: "m",
  games: [
    G("missv", "Vocabulary Matching", "مطابقة المفردات", "🧩", meaning(words)),
    G("misst", "Write in English", "اكتب بالإنجليزية", "✏️", translate(words)),
    G("misss", "Spelling Scramble", "رتّب الحروف", "🔤", scramble(words)),
  ],
});
