import type { LevelDef } from "@/types";

const FLOATERS = ["✨", "⭐", "🔤", "📖", "🎈", "🧠", "✏️", "🌟"];

export function HomeSection({ levels, onStart }: { levels: LevelDef[]; onStart: () => void }) {
  return (
    <div className="hf text-center">
      <div className="relative overflow-hidden rounded-[2rem] bg-linear-to-b from-blue-900 via-blue-700 to-sky-500 p-5 shadow-2xl sm:p-8">
        {FLOATERS.map((e, k) => (
          <span
            key={k}
            className="fl absolute text-2xl opacity-80 sm:text-3xl"
            style={{ top: ((8 + k * 11) % 88) + "%", left: k % 2 ? "3%" : "89%", animationDelay: k * 0.4 + "s" }}
          >
            {e}
          </span>
        ))}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="Tutor Amir" className="relative mx-auto block w-full max-w-sm drop-shadow-2xl" />
        <h1 className="hd relative mt-5 text-4xl text-white sm:text-6xl">
          English Learning <span className="text-yellow-300">Adventure</span>
        </h1>
        <div dir="rtl" className="relative text-xl font-bold text-sky-100 sm:text-2xl">
          مغامرة تعلّم الإنجليزية
        </div>
        <button
          onClick={onStart}
          className="cta relative mt-6 w-full max-w-sm rounded-full border-b-8 border-yellow-600 bg-yellow-400 py-4 text-2xl font-black text-blue-900 shadow-xl active:translate-y-1"
        >
          ▶ Start Learning
          <div dir="rtl" className="text-lg">
            ابدأ التعلّم
          </div>
        </button>
      </div>
      <div className="mt-5 overflow-hidden rounded-2xl border-2 border-blue-200 bg-white py-2">
        <div className="mq flex w-max gap-3">
          {[...levels, ...levels].map((l, k) => (
            <span key={k} className="shrink-0 rounded-full bg-sky-100 px-3 py-1 font-bold text-blue-900">
              {l[3]} {l[2]}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border-4 border-blue-300 bg-white p-3 font-extrabold text-blue-900">
          📘 Facebook<div className="text-blue-600">@TutorAmir</div>
        </div>
        <div className="rounded-2xl border-4 border-yellow-300 bg-white p-3 font-extrabold text-blue-900">
          📸 Instagram<div className="text-blue-600">@TutorAmir</div>
        </div>
        <div className="rounded-2xl border-4 border-yellow-500 bg-yellow-400 p-3 font-extrabold text-blue-900">
          📞 Phone / الهاتف<div>0667 45 07 37</div>
        </div>
      </div>
      <div className="mt-4 text-sm font-bold text-blue-800">Made with 💙 in Algeria · صُنع بحب في الجزائر</div>
      <div dir="rtl" className="hd mt-3 mb-2 text-2xl text-blue-900 sm:text-3xl">
        أمير علاء الدين- سطيف 2026
      </div>
    </div>
  );
}
