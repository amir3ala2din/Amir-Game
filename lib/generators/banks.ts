import type { BankKey, Question } from "@/types";
import { content } from "../content";
import { mc } from "../questions";
import { ord } from "../random";

type Gen = () => Question[];

/** Builds a generator from a multiple-choice bank: [question, answer, wrong options, hint key]. */
const bankSB = (key: BankKey, t: string, ta: string, ex: (a: string, hint?: string) => string[]): Gen => () =>
  ord(content.banks[key], 10).map(([q, a, w, x]) => {
    const e = ex(a, x);
    return mc(t, ta, q, a, w, e[0], e[1]);
  });

export const modSB = bankSB("modal","Choose can / should / must","اختر can أو should أو must",(_a, t) => content.modalHints[t!]);
export const linkSB = bankSB("link","Choose the linking word","اختر أداة الربط",(a) => {const m = content.linkHints[a.toLowerCase()];return[`"${a}" shows ${m[0]}.`,`"${a}" تدل على ${m[1]}.`]});
export const condSB = bankSB("cond","Complete the conditional sentence","أكمل الجملة الشرطية",() => ["Type 1: if + present → will + verb. Type 2: if + past (were) → would + verb.","النوع 1: if + مضارع ← will + فعل. النوع 2: if + ماضٍ (were) ← would + فعل."]);
export const pasSB = bankSB("passive","Choose the passive form","اختر صيغة المبني للمجهول",() => ["Passive: be (is / was / will be) + past participle.","المبني للمجهول: be + التصريف الثالث (V3)."]);
export const utSB = bankSB("usedTo","Complete with used to","أكمل بـ used to",() => ["Past habit: used to + base verb. Negative: didn't use to.","عادة في الماضي: used to + الفعل الأصلي، والنفي didn't use to."]);
export const eqSB = bankSB("equality","Comparison of equality","المقارنة بالتساوي",() => ["as + adjective + as = equal. not as + adjective + as = less.","as + صفة + as للتساوي، و not as … as للنقص."]);
export const paspSB = bankSB("passivePast","Choose the passive (past)","اختر المبني للمجهول (الماضي)",() => ["Past passive: was / were + past participle.","المبني للمجهول في الماضي: was / were + التصريف الثالث."]);
export const whSB = bankSB("whenWhile","Past Simple or Past Continuous?","الماضي البسيط أم المستمر؟",() => ["Long action: was / were + -ing. Short interrupting action: past simple.","الفعل الطويل بالماضي المستمر، والفعل القصير المقاطع بالماضي البسيط."]);
export const cauSB = bankSB("cause","Choose the connector (cause / effect)","اختر أداة الربط (سبب / نتيجة)",(a) => {const m = content.causeHints[a.toLowerCase()];return[`"${a}" shows ${m[0]}.`,`"${a}" تدل على ${m[1]}.`]});
export const ppwSB = bankSB("presentPerfectAdv","Choose ever / never / just / already / yet","اختر ever أو never أو just أو already أو yet",() => ["Present perfect: have / has + past participle, with ever, never, just, already, yet.","المضارع التام: have / has + V3 مع ever, never, just, already, yet."]);
export const pfxSB = bankSB("prefix","Choose the correct word","اختر الكلمة الصحيحة",() => ["un- / dis- / im- make opposites. -ful = full of, -less = without.","un- و dis- و im- تعطي الضد، و -ful تعني «مليء بـ» و -less تعني «بدون»."]);
export const impSB = bankSB("imperative","Choose the imperative","اختر صيغة الأمر",() => ["Imperative: base verb (Wash!). Negative: Don't + base verb.","الأمر: الفعل الأصلي (Wash!)، والنهي: Don't + الفعل الأصلي."]);
export const c1SB = bankSB("cond1","Complete the conditional (type 1)","أكمل الجملة الشرطية (النوع 1)",() => ["Type 1: If + present simple, will + base verb.","النوع 1: If + مضارع بسيط، will + الفعل الأصلي."]);
export const obSB = bankSB("obligation","Choose the modal","اختر الفعل الناقص المناسب",() => ["must / have to = obligation. should / ought to = advice. must not = prohibition. don't have to = no need.","must / have to للإلزام، should / ought to للنصيحة، must not للمنع، don't have to لعدم الحاجة."]);
export const punG = bankSB("punctuation","Choose the correct punctuation and capitals","اختر الجملة الصحيحة (علامات الترقيم والحروف الكبيرة)",() => ["A sentence starts with a capital letter, names are capitalised, and it ends with . or ?","تبدأ الجملة بحرف كبير، وأسماء الأعلام بحرف كبير، وتنتهي بنقطة أو علامة استفهام."]);
export const wfSB = bankSB("wordForm","Choose the correct word form","اختر الصيغة الصحيحة للكلمة",() => ["Word families: choose the right part of speech (noun, verb, adjective or adverb).","عائلة الكلمة: اختر الصيغة المناسبة (اسم أو فعل أو صفة أو ظرف)."]);
