import type { Question, Verb } from "@/types";
import { content } from "../content";
import { mc, ty } from "../questions";
import { ing, lc, ord, pick, s3 } from "../random";
import { F, SUBJ, beF, okV, pp } from "../words";

type Gen = () => Question[];

export const presentSB: Gen = () =>
  ord(F(content.verbs).filter((v) => okV(v, "p")), 10).map((v) => {
    const [s, t] = pick(SUBJ, 1)[0];
    const ans = t ? s3(v.en) : v.en;
    return mc(
      "Complete the sentence (Present Simple)",
      "أكمل الجملة (المضارع البسيط)",
      `${s} ___ (${v.en}) ${v.obj} every day.`,
      ans,
      [v.en, s3(v.en), v.past, v.en + "ing"],
      t ? `With "${s}" (he/she/it) we add -s/-es.` : `With "${s}" we use the base verb.`,
      t ? `مع "${s}" نضيف s/es للفعل.` : `مع "${s}" نستعمل الفعل كما هو.`
    );
  });

export const pastSB: Gen = () =>
  ord(F(content.verbs), 10).map((v) => {
    const [s] = pick(SUBJ, 1)[0];
    return mc(
      "Complete the sentence (Past Simple)",
      "أكمل الجملة (الماضي البسيط)",
      `Yesterday, ${lc(s)} ___ (${v.en}) ${v.obj}.`,
      v.past,
      [v.en, s3(v.en), v.en + "ed", v.en + "ing"],
      `"Yesterday" = Past Simple: ${v.en} → ${v.past}`,
      `"Yesterday" تدل على الماضي البسيط: ${v.en} ← ${v.past} (${v.ar})`
    );
  });

export const addS: Gen = () =>
  ord(F(content.verbs), 8).map((v) =>
    ty("Write the he/she form", "اكتب الفعل مع he / she", `She ___ (${v.en})`, s3(v.en), `${v.en} → ${s3(v.en)}`, `${v.ar}: ${v.en} ← ${s3(v.en)}`)
  );

export const irregular: Gen = () =>
  ord(F(content.verbs).filter((v) => !v.past.endsWith("ed")), 8).map((v) =>
    ty("Write the Past Simple form", "اكتب الماضي البسيط", `${v.en} → ?`, v.past, `${v.en} → ${v.past}`, `${v.ar}: ${v.en} ← ${v.past} (فعل شاذ)`)
  );

/** "Which sentence is correct?" for present (`p`) or past (`t`). */
export const correctS =
  (t: "p" | "t"): Gen =>
  () =>
    ord(F(content.verbs).filter((v) => okV(v, t === "p" ? "p" : "t")), 10).map((v) => {
      const [s, h] = pick(SUBJ, 1)[0];
      const f = (x: string) => (t === "p" ? `${s} ${x} ${v.obj}.` : `Yesterday, ${lc(s)} ${x} ${v.obj}.`);
      const ok = t === "p" ? (h ? s3(v.en) : v.en) : v.past;
      const bad = t === "p" ? [h ? v.en : s3(v.en), v.past, v.en + "ing"] : [v.en, v.en + "ed", s3(v.en)];
      return mc(
        "Which sentence is correct?",
        "أيّ جملة صحيحة؟",
        "🧐",
        f(ok),
        bad.map(f),
        t === "p" ? (h ? "He/She/It + verb-s/es" : "I/You/We/They + base verb") : `Past Simple: ${v.en} → ${v.past}`,
        t === "p" ? (h ? "مع he/she نضيف s/es" : "مع I/you/we/they نستعمل الفعل كما هو") : `الماضي البسيط: ${v.en} ← ${v.past}`
      );
    });

type TenseKey = "pc" | "pastc" | "fut" | "pp";
type TenseRow = [big: string, ans: string, pool: string[], exp: string, expAr: string];

const TENSE: Record<TenseKey, (s: string, h: 0 | 1, v: Verb) => TenseRow> = {
  pc: (s, h, v) => {
    const b = beF(s, h);
    const o = b === "is" ? "are" : "is";
    return [`${s} ___ (${v.en}) ${v.obj} now.`, `${b} ${ing(v.en)}`, [v.en, s3(v.en), ing(v.en), `${o} ${ing(v.en)}`], "Present Continuous: am / is / are + verb-ing", "المضارع المستمر: am / is / are + الفعل-ing"];
  },
  pastc: (s, h, v) => {
    const b = s === "I" || h ? "was" : "were";
    const o = b === "was" ? "were" : "was";
    return [`At 8 o'clock yesterday, ${lc(s)} ___ (${v.en}) ${v.obj}.`, `${b} ${ing(v.en)}`, [v.past, v.en, ing(v.en), `${o} ${ing(v.en)}`], "Past Continuous: was / were + verb-ing", "الماضي المستمر: was / were + الفعل-ing"];
  },
  fut: (s, _h, v) => [
    `Tomorrow, ${lc(s)} ___ (${v.en}) ${v.obj}.`,
    `will ${v.en}`,
    [v.en, s3(v.en), v.past, `will ${v.past}`],
    "Future Simple: will + base verb",
    "المستقبل البسيط: will + الفعل الأصلي",
  ],
  pp: (s, h, v) => {
    const a = s === "I" || !h ? "have" : "has";
    return [
      `${s} ___ (${v.en}) ${v.obj} already.`,
      `${a} ${pp(v)}`,
      [v.past, `${a} ${v.past}`, v.en, pp(v), `${a === "has" ? "have" : "has"} ${pp(v)}`],
      "Present Perfect: have / has + past participle (V3)",
      "المضارع التام: have / has + التصريف الثالث (V3)",
    ];
  },
};

export const tenseSB =
  (k: TenseKey): Gen =>
  () =>
    ord(F(content.verbs).filter((v) => okV(v, k)), 10).map((v) => {
      const [s, h] = pick(SUBJ, 1)[0];
      const [big, ans, pool, exp, expAr] = TENSE[k](s, h, v);
      return mc("Choose the correct tense", "اختر الزمن الصحيح", big, ans, pool, exp, expAr);
    });

export const beSB: Gen = () =>
  ord(["I", "He", "She", "We", "You", "They", "My father", "The students"], 8).map((s) => {
    const b = beF(s, /^(He|She|My father)$/.test(s) ? 1 : 0);
    return mc(
      "Complete with am / is / are",
      "أكمل بـ am / is / are",
      `${s} ___ ${pick(["a student", "happy", "at school", "ten years old", "in the classroom"], 1)[0]}.`,
      b,
      ["am", "is", "are"],
      `${s} → ${b}`,
      `مع "${s}" نستعمل ${b}`
    );
  });

export const ppT: Gen = () =>
  ord(F(content.verbs), 8).map((v) =>
    ty("Write the past participle (V3)", "اكتب التصريف الثالث (V3)", `${v.en} – ${v.past} – ?`, pp(v), `${v.en} → ${pp(v)}`, `${v.ar}: ${v.en} ← ${pp(v)}`)
  );

// ---- small pair tables
export const compSB: Gen = () =>
  ord(content.comparatives, 10).map(([b, c]) =>
    mc(
      "Choose the comparative",
      "اختر صيغة المقارنة",
      `Ali is ___ than Omar. (${b})`,
      c,
      [b, "more " + b, b + "er", b + "est", "most " + b],
      `${b} → ${c}`,
      c.startsWith("more") ? "الصفة الطويلة: more + الصفة + than" : "الصفة القصيرة: نضيف er + than (وبعض الأشكال شاذة: good ← better)"
    )
  );

export const supSB: Gen = () =>
  ord(content.comparatives, 10).map(([b, c]) => {
    const sp = c === "better" ? "best" : c === "worse" ? "worst" : c.startsWith("more") ? "most " + b : c.replace(/er$/, "est");
    return mc(
      "Choose the superlative",
      "اختر صيغة التفضيل (الأعلى)",
      `It is the ___ place in the city. (${b})`,
      sp,
      [b, c, "more " + b, b + "est", "most " + b].filter((x) => x !== sp),
      `${b} → the ${sp}`,
      sp.startsWith("most") ? "الصفة الطويلة: the most + الصفة" : "الصفة القصيرة: the + صفة-est"
    );
  });

export const plurSB: Gen = () =>
  ord(content.plurals, 10).map(([a, b]) =>
    mc(
      "Choose the plural",
      "اختر صيغة الجمع",
      `one ${a}, two ___`,
      b,
      [a + "s", a + "es", a.replace(/y$/, "ies"), a + "ren", a],
      `${a} → ${b}`,
      /s$|es$|ies$/.test(b) && b !== a ? "جمع منتظم: نضيف s / es / ies" : "جمع غير منتظم: يجب حفظه"
    )
  );

export const tmSB: Gen = () =>
  ord(content.timeMarkers, 8).map(([q, a]) =>
    mc(
      "Choose the time marker (past)",
      "اختر علامة الزمن (الماضي)",
      q,
      a,
      ["tomorrow", "next week", "now", "every day", "next summer", "at the moment", "next year", "tomorrow evening"],
      `${a} → Past Simple`,
      `${a} علامة زمنية للماضي البسيط`
    )
  );

export const prepSB: Gen = () =>
  ord(content.prepositions, 8).map(([q, a, ar]) =>
    mc("Choose the preposition of place", "اختر حرف الجر المناسب", q, a, content.prepositions.map((x) => x[1]), `${a} (${ar})`, `${a} تعني ${ar}`)
  );
