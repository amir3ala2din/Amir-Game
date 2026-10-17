import type { AdjDoc, OppPair, Question, Verb, Word } from "@/types";
import { derived, content } from "../content";
import { mc, sy, ty } from "../questions";
import { ord, pick, s3, shuffle } from "../random";
import { session } from "../session";
import { F, gradeWords, posOf, samePos } from "../words";

type Gen = () => Question[];

export const meaning = (db: Word[]): Gen => () =>
  ord(F(db), 16).map((x, i) =>
    i % 2
      ? mc("Choose the English word", "اختر الكلمة بالإنجليزية", (x.e || "") + " " + x.ar, x.en, samePos(x, db, "en"), `${x.ar} = ${x.en}`, `${x.ar} تعني ${x.en}`)
      : mc("What does it mean?", "ما معنى هذه الكلمة؟", (x.e || "") + " " + x.en, x.ar, samePos(x, db, "ar"), `${x.en} = ${x.ar}`, `${x.en} تعني ${x.ar}`)
  );

export const scramble = (db: Word[]): Gen => () =>
  ord(F(db).filter((x) => !x.en.includes(" ") && x.en.length > 2), 8).map((x) => {
    let a: string[];
    do {
      a = shuffle(x.en.split(""));
    } while (a.join("") === x.en);
    return ty("Unscramble the word", "رتّب الحروف لتكوين كلمة", (x.e || "") + " " + x.ar, x.en, `Correct spelling: ${x.en}`, `الإملاء الصحيح: ${x.en}`, a);
  });

export const opposites = (pairs: OppPair[]): Gen => () =>
  ord(pairs, 10).map((x) =>
    mc(
      `What is the opposite of "${x.en}"?`,
      `ما عكس "${x.ar}"؟`,
      x.en.toUpperCase(),
      x.opp,
      pairs.length >= 4 ? pairs.map((q) => q.opp) : derived.allOpposites,
      `${x.en} ↔ ${x.opp}`,
      `${x.ar} ↔ ${x.oppAr}`
    )
  );

export const tf = (db: Word[]): Gen => () => {
  const d = F(db);
  return ord(d, 16).map((x) => {
    const o = pick(d.filter((y) => y.ar !== x.ar), 1)[0];
    const t = !o || Math.random() < 0.5;
    return {
      ...mc("Is this meaning correct?", "هل هذا المعنى صحيح؟", `${x.e || ""} ${x.en} = ${t ? x.ar : o.ar}`, t ? "True" : "False", ["True", "False"], `${x.en} = ${x.ar}`, `${x.en} تعني ${x.ar}`),
      lab: { True: "✔ Yes", False: "✘ No" },
      show: `${x.en} = ${x.ar}`,
    };
  });
};

export const translate = (db: Word[]): Gen => () => {
  const m: Record<string, string[]> = {};
  gradeWords(session.grade).forEach((w) => {
    (m[w.ar] = m[w.ar] || []).push(w.en);
  });
  return ord(F(db), 16).map((x) => ({
    ...ty("Write it in English", "اكتبها بالإنجليزية", `${x.e || ""} ${x.ar}`, x.en, `${x.ar} = ${x.en}`, `${x.ar} تعني ${x.en}`),
    alts: (m[x.ar] || []).filter((e) => e !== x.en),
  }));
};

export const synG = (db: Word[]): Gen => () => {
  const SYN = content.synonyms;
  const gw = gradeWords(session.grade).filter((x) => SYN[x.en]);
  return ord(db.filter((x) => SYN[x.en]), 10).map((x) => {
    const p = posOf(x.en);
    let pl = db.filter((y) => y.en !== x.en && SYN[y.en] && SYN[y.en] !== x.en);
    if (pl.length < 3) pl = gw.filter((y) => y.en !== x.en && SYN[y.en] !== x.en && posOf(y.en) === p);
    if (pl.length < 3) pl = gw.filter((y) => y.en !== x.en && SYN[y.en] !== x.en);
    return mc("Choose the synonym (same meaning)", "اختر المرادف (نفس المعنى)", `${x.e || ""} ${x.en}`.trim(), SYN[x.en], pl.map((y) => SYN[y.en]), `${x.en} = ${SYN[x.en]}`, `${x.ar} ← ${SYN[x.en]}`);
  });
};

const TYPE_NAMES: Partial<Record<string, [string, string]>> = { n: ["noun", "اسم"], v: ["verb", "فعل"], a: ["adjective", "صفة"] };

export const typeG = (db: Word[]): Gen => () =>
  ord(db.filter((x) => TYPE_NAMES[posOf(x.en)]), 12).map((x) => {
    const t = TYPE_NAMES[posOf(x.en)]!;
    return mc("What type of word is it?", "ما نوع هذه الكلمة؟", `${x.e || ""} ${x.en}`.trim(), t[0], ["noun", "verb", "adjective"], `${x.en} is a ${t[0]}`, `${x.ar}: ${t[1]}`);
  });

export const formsG = (db: Word[]): Gen => () =>
  ord(db.map((x) => content.verbs.find((v) => v.en === x.en)).filter((v): v is Verb => !!v), 10).map((v) =>
    ty("Write the past form", "اكتب صيغة الماضي", `${v.en} → ?`, v.past, `${v.en} → ${v.past}`, `${v.ar}: ${v.en} ← ${v.past}`)
  );

export const s3G = (db: Word[]): Gen => () =>
  ord(db.filter((x) => x.en !== "be"), 10).map((v) =>
    ty("Write the he/she form", "اكتب الفعل مع he / she", `She ___ (${v.en})`, s3(v.en), `${v.en} → ${s3(v.en)}`, `${v.ar}: ${v.en} ← ${s3(v.en)}`)
  );

export const missG = (db: Word[]): Gen => () =>
  ord(db.filter((x) => !x.en.includes(" ") && x.en.length > 2), 12).map((x) => {
    const w = x.en;
    const ix = [...w].map((c, k) => (/[a-z]/i.test(c) && k > 0 ? k : -1)).filter((k) => k > 0);
    const i = pick(ix.length ? ix : [1], 1)[0];
    const ch = w[i];
    const up = ch === ch.toUpperCase();
    const V = "aeiou";
    const pl = "abcdefghijklmnopqrstuvwxyz"
      .split("")
      .filter((l) => l !== ch.toLowerCase() && V.includes(l) === V.includes(ch.toLowerCase()))
      .map((l) => (up ? l.toUpperCase() : l));
    return {
      ...mc("Choose the missing letter", "اختر الحرف الناقص", `${x.e || ""} ${[...w].map((c, k) => (k === i ? "_" : c)).join(" ")}`.trim(), ch, pl, `${w}`, `${x.ar}: ${w}`),
      nosay: true,
    };
  });

export const picG = (db: Word[]): Gen => () => {
  const d = db.filter((x) => x.e);
  return ord(d, 12).map((x) => mc("What is this?", "ما هذا؟", x.e!, x.en, samePos(x, d, "en"), `${x.en} = ${x.ar}`, `${x.ar} = ${x.en}`));
};

export const oddG = (db: Word[], pool: Word[]): Gen => () => {
  const out = pool.filter((x) => !db.includes(x));
  return Array.from({ length: 8 }, () => {
    const g = pick(db, 3);
    const o = pick(out, 1)[0];
    return mc("Which word does not belong with the others?", "أيّ كلمة لا تنتمي إلى المجموعة؟", g.concat(o).map((a) => a.en).join(" · "), o.en, g.map((a) => a.en), `${o.en} is from a different group.`, `${o.ar} ليست من نفس المجموعة.`);
  });
};

// ---- adjective synonym / antonym documents
const adjPool = (it: AdjDoc[]) => it.flatMap((y) => [...y.syn, ...y.ant]);

export const antDoc = (it: AdjDoc[]): Gen => () =>
  ord(it.filter((x) => x.ant.length), 12).map((x) => {
    const bad = new Set([...x.syn, ...x.ant, x.en]);
    return mc("Choose the opposite", "اختر الضد", x.en, pick(x.ant, 1)[0], adjPool(it).filter((w) => !bad.has(w)), `${x.en} ≠ ${x.ant.join(" / ")}`, `ضد ${x.en}: ${x.ant.join(" / ")}`);
  });

export const relDoc = (it: AdjDoc[]): Gen => () =>
  ord(
    it.flatMap((x) => [...x.syn.map((w) => [x.en, w, "Synonyms"] as const), ...x.ant.map((w) => [x.en, w, "Opposites"] as const)]),
    12
  ).map(([a, b, r]) => ({
    ...mc(
      "Are these words synonyms or opposites?",
      "هل الكلمتان مترادفتان أم متضادتان؟",
      `${a}  —  ${b}`,
      r,
      ["Synonyms", "Opposites"],
      r === "Synonyms" ? `${a} and ${b} have the same meaning.` : `${a} and ${b} have opposite meanings.`,
      r === "Synonyms" ? "المعنى متقارب (مرادفان)." : "المعنى متضاد."
    ),
    lab: { Synonyms: "= Synonyms", Opposites: "≠ Opposites" },
  }));

export const typDoc = (it: AdjDoc[]): Gen => () =>
  ord(
    it.flatMap((x) => [...(x.syn.length ? [["syn", x] as const] : []), ...(x.ant.length ? [["ant", x] as const] : [])]),
    10
  ).map(([k, x]) => {
    const l = k === "syn" ? x.syn : x.ant;
    return {
      ...ty(
        k === "syn" ? "Write a synonym of:" : "Write the opposite of:",
        k === "syn" ? "اكتب مرادفًا للكلمة:" : "اكتب ضد الكلمة:",
        x.en,
        l[0],
        `${x.en} ${k === "syn" ? "=" : "≠"} ${l.join(" / ")}`,
        `${x.en}: ${l.join(" / ")}`
      ),
      alts: l.slice(1),
    };
  });

// jobs (sentence rows)
const hospitalLike = ["hospital", "clinic"];

export const wherework: Gen = () =>
  ord(content.sentences, 10).map((x) =>
    sy(
      mc(`Where does a ${x.j} work?`, `أين يعمل ${x.j}؟`, "🏢", x.p, derived.jobPlaces.filter((y) => !(hospitalLike.includes(x.p) && hospitalLike.includes(y) && y !== x.p)), `A ${x.j} works ${x.pp}.`, `${x.j} ← ${x.p}`),
      `Where does a ${x.j} work?`
    )
  );

export const toolQ: Gen = () =>
  ord(content.sentences.filter((x) => x.t.length), 10).map((x) =>
    sy(mc(`What does a ${x.j} have?`, `ماذا يملك ${x.j}؟`, "🛠️", x.t[0], derived.jobTools.filter((y) => !x.t.includes(y)), `A ${x.j} has ${x.t.join(" and ")}.`, `${x.j} ← ${x.t.join(" + ")}`), `What does a ${x.j} have?`)
  );

export const actQ: Gen = () =>
  ord(content.sentences.filter((x) => x.a), 10).map((x) =>
    sy(mc(`What does a ${x.j} do?`, `ماذا يفعل ${x.j}؟`, "⚙️", x.a, derived.jobActions, `A ${x.j} ${x.a}.`, `${x.j} ← ${x.a}`), `What does a ${x.j} do?`)
  );

export const fillJob: Gen = () =>
  ord(content.sentences, 10).map((x) => sy(mc("Read and choose the job", "اقرأ واختر المهنة", x.b, x.j, derived.jobNames, x.rest, `المهنة: ${x.j}`), x.b));
