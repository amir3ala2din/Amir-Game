import type { Question } from "@/types";
import { content } from "../content";
import { mc } from "../questions";
import { ord, pick, s3, shuffle } from "../random";
import { session } from "../session";
import { F, SUBJ, okV } from "../words";

type Gen = () => Question[];

/** Sentences that are short and simple enough for word-order games. */
const okS = (t: string) => {
  const n = t.split(" ").length;
  return (
    n >= 4 &&
    n <= 9 &&
    !/[,;\d]/.test(t) &&
    !/^(Although|Despite|While|If|Because|When|Yesterday|Last)\b/.test(t) &&
    !/\b(yesterday|tomorrow|today|every|always|often|usually|sometimes|never|now|already|last|ago)\b/i.test(t)
  );
};

const genSent = (k: "p" | "t") => {
  const v = pick(F(content.verbs).filter((v) => okV(v, "p")), 1)[0];
  const [s, h] = pick(SUBJ, 1)[0];
  return k === "p" ? `${s} ${h ? s3(v.en) : v.en} ${v.obj}.` : `${s} ${v.past} ${v.obj}.`;
};

const sentPool = (c: typeof session.grade) => {
  const st = content.stageOfGrade[c];
  const fill = (q: string, a: string) => q.replace("___", a);
  let r: string[] = [];
  if (st === "P") {
    r = [...content.primSentences];
    if (c !== "3AP")
      content.sentences.forEach((x) =>
        x.rest.split(". ").forEach((t) => {
          t = t.trim();
          r.push(t.endsWith(".") ? t : t + ".");
        })
      );
  } else {
    if (st === "M") {
      content.banks.modal.forEach(([q, a]) => r.push(fill(q, a)));
      content.banks.usedTo.forEach(([q, a]) => r.push(fill(q, a)));
      r.push(...content.midSentences);
    } else {
      content.banks.passive.forEach(([q, a]) => r.push(fill(q, a)));
      content.banks.link.forEach(([q, a]) => r.push(fill(q, a)));
      r.push(...content.secSentences);
    }
    for (let i = 0; i < 5; i++) {
      r.push(genSent("p"));
      r.push(genSent("t"));
    }
  }
  if (c === "4AM") r.push(...content.bemSentences);
  return [...new Set(r)].filter(okS);
};

export const ordG: Gen = () =>
  ord(sentPool(session.grade), 8).map((t) => {
    const w = t.split(" ");
    let sh: string[];
    let g = 0;
    do {
      sh = shuffle(w);
      g++;
    } while (sh.join(" ") === t && g < 9);
    return {
      type: "ord" as const,
      prompt: "Put the words in the correct order",
      promptAr: "رتّب الكلمات لتكوين جملة صحيحة",
      big: "🧱",
      words: sh,
      ans: t,
      exp: t,
      expAr: "هذه هي الجملة الصحيحة.",
    };
  });

export const dlgG: Gen = () =>
  ord(content.dialogues, 10).map(([q, a, w]) => mc("Choose the best reply", "اختر الرد المناسب", q, a, w, "This is a natural reply to the question.", "هذا رد مناسب للسؤال."));

export const readG: Gen = () =>
  content.reading[content.stageOfGrade[session.grade]].flatMap(([t, qs]) =>
    qs.map(([q, a, w]) => ({ ...mc(q, "أجب عن السؤال حسب النص", t, a, w, "The text gives this answer.", "الجواب موجود في النص."), say: q }))
  );

export const bemG: Gen = () =>
  content.bemReading.flatMap(([t, qs]) =>
    qs.map(([st, a, ev]) => ({
      ...mc("Read the text, then choose", "اقرأ النص ثم اختر", t + "  ▶  " + st, a, ["True", "False", "Not mentioned"], ev, "الجواب حسب النص."),
      lab: { True: "✔ True", False: "✘ False", "Not mentioned": "❓ Not mentioned" },
      show: ev,
      say: st,
    }))
  );

export const edG: Gen = () =>
  ord(content.edSounds, 10).map(([w, a]) =>
    mc("Choose the sound of the ending -ed", "اختر نطق النهاية -ed", w, a, ["/t/", "/d/", "/ɪd/"], `${w} → ${a}`, "/t/ بعد الأصوات الصامتة غير المجهورة، /d/ بعد المجهورة، /ɪd/ بعد t و d.")
  );

export const sendG: Gen = () =>
  ord(content.sSounds, 10).map(([w, a]) =>
    mc("Choose the sound of the ending -s", "اختر نطق النهاية -s", w, a, ["/s/", "/z/", "/ɪz/"], `${w} → ${a}`, "/s/ و /z/ و /ɪz/ حسب آخر صوت في الكلمة.")
  );
