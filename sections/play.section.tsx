"use client";
import { BackButton } from "@/components/back-button";
import { speak, sfx } from "@/lib/audio";
import { norm, shuffle } from "@/lib/random";
import { session } from "@/lib/session";
import { gradeWords } from "@/lib/words";
import type { Game, LogEntry, MissedWord, Word } from "@/types";
import { useEffect, useState } from "react";

interface PlaySectionProps {
  game: Game;
  onDone: (score: number, total: number, log: LogEntry[]) => void;
  onQuit: () => void;
  saveMiss: (w: MissedWord) => void;
  dropMiss: (w: MissedWord) => void;
}

/** Leading emoji of a question's `big` text is shown large, the rest as text. */
const EMOJI_LEAD = /^(\p{Extended_Pictographic}(?:️|‍|\p{Extended_Pictographic})*|\d️⃣)\s*/u;

export function PlaySection({ game, onDone, onQuit, saveMiss, dropMiss }: PlaySectionProps) {
  const [qs] = useState(() => game.gen());
  // en ↔ ar lookup of the grade's words, to explain wrong answers and remember missed words
  const [words] = useState(() => {
    const meaning: Record<string, string> = {};
    const entry: Record<string, Word> = {};
    gradeWords(session.grade).forEach((d) => {
      meaning[d.en] = d.ar;
      meaning[d.ar] = d.en;
      entry[d.en] = d;
      entry[d.ar] = d;
    });
    return { meaning, entry };
  });
  const T = Math.min(12, qs.length);
  const [i, setI] = useState(0);
  const [cur, setCur] = useState(0);
  const [used, setUsed] = useState([0]);
  const [streak, setStreak] = useState(0);
  const [sel, setSel] = useState<string | null>(null);
  const [sc, setSc] = useState(0);
  const [val, setVal] = useState("");
  const [log, setLog] = useState<LogEntry[]>([]);
  const [bt, setBt] = useState<number[]>([]);
  const [hid, setHid] = useState<string[]>([]);

  const q = qs[cur];
  const mm = q ? q.big.match(EMOJI_LEAD) : null;
  const pic = mm ? mm[1] : "";
  const bigT = q ? (mm ? q.big.slice(mm[0].length) : q.big) : "";
  const answered = sel !== null;
  const good = (a: string) => norm(a) === norm(q.ans) || (q.alts || []).some((x) => norm(x) === norm(a));
  const ok = answered && good(sel);
  const why = answered && !ok ? (words.meaning[sel] ? `«${sel}» = ${words.meaning[sel]}` : q.type === "ty" ? `You wrote: ${sel}` : "") : "";
  const say = !q || q.nosay ? "" : q.say || (q.type === "mc" && /[a-zA-Z]/.test(q.big) ? q.big.replace(/[^\x00-\x7F]/g, "").trim() : "");

  useEffect(() => {
    if (!say) return;
    const t = setTimeout(() => speak(say), 300);
    return () => clearTimeout(t);
    // read aloud once per question
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cur]);

  if (!q)
    return (
      <div className="text-center">
        <BackButton onClick={onQuit} en="Quit" ar="خروج" />
        <div className="font-bold text-blue-800">No questions available for this game yet.</div>
      </div>
    );

  const answer = (a: string) => {
    if (answered) return;
    const r = good(a);
    const key = [q.ans, q.exp, q.show && q.show.split(" = ")[0]].find((k) => k && words.entry[k]);
    const wd = key ? words.entry[key] : undefined;
    if (wd) {
      if (!r) saveMiss({ en: wd.en, ar: wd.ar, e: wd.e, c: session.grade });
      else if (game.id.startsWith("miss")) dropMiss({ en: wd.en, ar: wd.ar, e: wd.e, c: session.grade });
    }
    setSel(a);
    setLog([
      ...log,
      {
        q: q.prompt + " " + (q.type === "ord" ? q.words.join(" · ") : q.big === "🔊" ? "(listening)" : q.big),
        a: String(q.lab ? q.lab[a] : a),
        c: q.show || q.ans,
        ok: r,
        ar: q.expAr,
        w: words.meaning[a] && !r ? `«${a}» = ${words.meaning[a]}` : "",
      },
    ]);
    setStreak(r ? streak + 1 : 0);
    if (r) {
      setSc(sc + 1);
      sfx.ok();
    } else sfx.bad();
    setTimeout(() => {
      if (!q.show && /^[\x00-\x7F]+$/.test(q.ans)) speak(q.ans);
    }, 650);
  };

  const next = () => {
    if (i + 1 >= T) {
      sfx.win();
      onDone(sc, T, log);
      return;
    }
    // move up after a correct answer (an extra step on a streak), down after a mistake
    let t = ok ? cur + 1 + (streak >= 3 ? 1 : 0) : cur - 1;
    t = Math.max(0, Math.min(qs.length - 1, t));
    for (let d = 0; d < qs.length; d++) {
      const c = [t + d, t - d].find((x) => x >= 0 && x < qs.length && !used.includes(x));
      if (c !== undefined) {
        t = c;
        break;
      }
    }
    setCur(t);
    setUsed([...used, t]);
    setI(i + 1);
    setSel(null);
    setVal("");
    setBt([]);
    setHid([]);
  };

  return (
    <div>
      <BackButton onClick={onQuit} en="Quit" ar="خروج" />
      <div className="mb-1 h-3 overflow-hidden rounded-full border border-blue-200 bg-white">
        <div className="h-full bg-yellow-400 transition-all" style={{ width: (i / T) * 100 + "%" }}></div>
      </div>
      <div className="mb-3 flex justify-between text-sm font-bold text-blue-800">
        <span>
          {i + 1} / {T}
        </span>
        <span>
          {"🔥".repeat(1 + Math.floor((cur * 3) / qs.length))} · ⭐ {sc}
        </span>
      </div>
      <div className="rounded-3xl border-4 border-blue-300 bg-white p-5 text-center shadow-lg">
        <div className="font-bold text-blue-900">{q.prompt}</div>
        <div dir="rtl" className="mb-2 font-bold text-blue-600">
          {q.promptAr}
        </div>
        {pic ? <div className="mt-2 text-7xl">{pic}</div> : null}
        {bigT ? (
          <div className={(bigT.length > 40 ? "text-lg sm:text-xl" : "text-3xl sm:text-4xl") + " my-3 font-extrabold break-words text-blue-900"}>{bigT}</div>
        ) : null}
        {say ? (
          <button onClick={() => speak(say)} className="mb-3 h-14 w-14 rounded-full bg-yellow-300 text-3xl shadow-sm active:scale-95">
            🔊
          </button>
        ) : null}
        {q.type === "ty" && q.letters ? (
          <div className="mb-4 flex flex-wrap justify-center gap-2">
            {q.letters.map((l, k) => (
              <span key={k} className="grid h-10 w-10 place-items-center rounded-xl bg-yellow-300 text-xl font-extrabold text-blue-900 shadow-sm">
                {l}
              </span>
            ))}
          </div>
        ) : null}
        {q.type === "ord" ? (
          <div>
            <div className="mb-3 flex min-h-[3.5rem] flex-wrap justify-center gap-2 rounded-2xl border-4 border-dashed border-blue-300 p-2">
              {bt.map((ix, k) => (
                <button key={k} disabled={answered} onClick={() => setBt(bt.filter((_, j) => j !== k))} className="rounded-xl bg-yellow-300 px-3 py-1 font-bold text-blue-900">
                  {q.words[ix]}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {q.words.map((w, ix) =>
                bt.includes(ix) ? null : (
                  <button key={ix} disabled={answered} onClick={() => setBt([...bt, ix])} className="rounded-xl border-2 border-blue-300 bg-blue-100 px-3 py-1 font-bold text-blue-900">
                    {w}
                  </button>
                )
              )}
            </div>
            <button
              disabled={answered || bt.length < q.words.length}
              onClick={() => answer(bt.map((ix) => q.words[ix]).join(" "))}
              className="mt-4 rounded-2xl bg-blue-700 px-6 py-2 font-extrabold text-white disabled:opacity-40"
            >
              Check ✔
            </button>
          </div>
        ) : q.type === "mc" ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {q.opts
              .filter((o) => !hid.includes(o))
              .map((o) => {
                let c = "bg-blue-50 border-blue-300 text-blue-900";
                if (answered) {
                  if (norm(o) === norm(q.ans)) c = "bg-green-100 border-green-500 text-green-800";
                  else if (o === sel) c = "bg-red-100 border-red-500 text-red-800";
                  else c = "bg-gray-50 border-gray-200 text-gray-400";
                }
                return (
                  <button key={o} onClick={() => answer(o)} className={"rounded-2xl border-4 p-3 text-lg font-extrabold transition active:scale-95 " + c}>
                    {q.lab ? q.lab[o] : o}
                  </button>
                );
              })}
          </div>
        ) : (
          <div className="flex justify-center gap-2">
            <input
              value={val}
              disabled={answered}
              onChange={(e) => setVal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && val.trim()) answer(val);
              }}
              autoCapitalize="none"
              autoComplete="off"
              placeholder="Type here… / اكتب هنا"
              className={"min-w-0 flex-1 rounded-2xl border-4 p-3 text-center text-lg font-bold " + (answered ? (ok ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50") : "border-blue-300")}
            />
            <button disabled={answered || !val.trim()} onClick={() => answer(val)} className="rounded-2xl bg-blue-700 px-4 font-extrabold text-white disabled:opacity-40">
              Check ✔
            </button>
          </div>
        )}
      </div>
      {q.type === "mc" && q.opts.length >= 4 && !answered && !hid.length ? (
        <div className="mt-3 text-center">
          <button
            onClick={() => setHid(shuffle(q.opts.filter((o) => norm(o) !== norm(q.ans))).slice(0, 2))}
            className="rounded-full border-2 border-sky-300 bg-sky-100 px-4 py-1 font-bold text-blue-800"
          >
            💡 50/50
          </button>
        </div>
      ) : null}
      {answered ? <div className="h-64"></div> : null}
      {answered ? (
        <div
          style={{ paddingBottom: "calc(env(safe-area-inset-bottom,0px) + 12px)" }}
          className={"fixed inset-x-0 bottom-0 z-40 mx-auto max-w-2xl rounded-t-3xl border-4 p-3 shadow-2xl " + (ok ? "border-green-500 bg-green-50 text-green-900" : "border-red-500 bg-red-50 text-red-900")}
        >
          <div className="text-xl font-extrabold">{ok ? "🎉 Correct! (صحيح!)" : "❌ Not quite (ليس تماماً) → " + (q.show || q.ans)}</div>
          <div className="font-semibold">{q.exp}</div>
          {why ? <div className="font-bold">{why}</div> : null}
          <div dir="rtl" className="font-semibold">
            {q.expAr}
          </div>
          <button onClick={next} className="mt-3 w-full rounded-2xl bg-yellow-400 py-3 font-extrabold text-blue-900 shadow-sm">
            {i + 1 >= T ? "See results (النتيجة) 🏆" : "Next (التالي) ➡"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
