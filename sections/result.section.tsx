import { Tile } from "@/components/tile";
import type { Game, GameResult, Topic } from "@/types";

interface ResultSectionProps {
  result: GameResult;
  game: Game;
  topic: Topic;
  /** other topics of the same grade and kind */
  related: Topic[];
  onReplay: () => void;
  onHub: () => void;
  onHome: () => void;
  onPlay: (g: Game) => void;
  onTopic: (t: Topic) => void;
}

export function ResultSection({ result, game, topic, related, onReplay, onHub, onHome, onPlay, onTopic }: ResultSectionProps) {
  const p = result.s / result.t;
  const wrong = result.log.filter((x) => !x.ok);
  const right = result.log.filter((x) => x.ok);
  const stars = Math.ceil(p * 3);
  return (
    <div className="text-center">
      <div className="text-7xl">{p >= 0.8 ? "🏆" : p >= 0.5 ? "👏" : "💪"}</div>
      <h2 className="mt-2 text-3xl font-extrabold text-blue-900">{p >= 0.8 ? "Excellent!" : p >= 0.5 ? "Good job!" : "Keep trying!"}</h2>
      <div dir="rtl" className="text-xl font-bold text-blue-600">
        {p >= 0.8 ? "ممتاز!" : p >= 0.5 ? "عمل جيد!" : "واصل المحاولة!"}
      </div>
      <div className="mx-auto mt-4 max-w-xs rounded-3xl border-4 border-yellow-400 bg-white p-5 shadow-lg">
        <div className="text-5xl font-extrabold text-blue-800">
          {result.s} / {result.t}
        </div>
        <div className="text-3xl text-yellow-500">
          {"★".repeat(stars)}
          {"☆".repeat(3 - stars)}
        </div>
      </div>
      <div className="mx-auto mt-5 grid max-w-xs gap-3">
        <button onClick={onReplay} className="rounded-2xl bg-yellow-400 py-3 font-extrabold text-blue-900 shadow-sm">
          Play again (العب مجدداً) 🔁
        </button>
        <button onClick={onHub} className="rounded-2xl bg-blue-700 py-3 font-extrabold text-white shadow-sm">
          Game Hub (الألعاب) 🎮
        </button>
        <button onClick={onHome} className="rounded-2xl border-2 border-blue-300 bg-white py-3 font-extrabold text-blue-800">
          Back to Home (العودة للرئيسية) 🏠
        </button>
      </div>
      <div className="mt-6 text-left">
        <h3 className="mb-2 font-extrabold text-red-700">❌ Mistakes (الأخطاء) · {wrong.length}</h3>
        {wrong.length ? (
          wrong.map((x, k) => (
            <div key={k} className="mb-2 rounded-2xl border-2 border-red-300 bg-red-50 p-3">
              <div className="font-bold break-words text-blue-900">{x.q}</div>
              <div className="text-red-700">✖ {x.a}</div>
              <div className="font-bold text-green-700">✔ {x.c}</div>
              {x.w ? <div className="text-sm text-red-700">{x.w}</div> : null}
              <div dir="rtl" className="text-sm text-blue-800">
                {x.ar}
              </div>
            </div>
          ))
        ) : (
          <div className="mb-2 font-bold text-green-700">No mistakes! 🎉 (لا أخطاء)</div>
        )}
        <h3 className="mt-4 mb-2 font-extrabold text-green-700">✅ Correct (الإجابات الصحيحة) · {right.length}</h3>
        {right.map((x, k) => (
          <div key={k} className="mb-2 rounded-2xl border-2 border-green-300 bg-green-50 p-3">
            <div className="font-bold break-words text-blue-900">{x.q}</div>
            <div className="font-bold text-green-700">✔ {x.c}</div>
          </div>
        ))}
        <h3 className="mt-6 mb-2 font-extrabold text-blue-800">🎮 Try these next (جرّب هذه الألعاب)</h3>
        <div className="grid grid-cols-2 gap-2">
          {topic.games
            .filter((g) => g.id !== game.id)
            .slice(0, 4)
            .map((g) => (
              <Tile key={g.id} onClick={() => onPlay(g)} top={g.e} en={g.n} ar={g.nAr} />
            ))}
        </div>
        <div className="mt-4 text-sm font-extrabold text-blue-700">More topics in your grade (مواضيع أخرى)</div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {related.slice(0, 4).map((t) => (
            <Tile key={t.id} onClick={() => onTopic(t)} top={t.e} en={t.n} ar={t.ar} />
          ))}
        </div>
      </div>
    </div>
  );
}
