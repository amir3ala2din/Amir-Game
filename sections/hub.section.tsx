import { BackButton } from "@/components/back-button";
import { Tile } from "@/components/tile";
import { Title } from "@/components/title";
import type { BestScores, Game, Topic } from "@/types";

export const starsOf = (best: BestScores, g: Game) => (best[g.id] != null ? "★".repeat(Math.ceil((best[g.id] / 100) * 3)) : "");

export function HubSection({ topic, best, onBack, onPlay }: { topic: Topic; best: BestScores; onBack: () => void; onPlay: (g: Game) => void }) {
  return (
    <div>
      <BackButton onClick={onBack} />
      <Title en={topic.n} ar={topic.ar} />
      <div className="mb-3 text-center font-bold text-blue-700">🎮 Game Hub (اختر لعبة)</div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {topic.games.map((g, k) => (
          <Tile key={g.id} onClick={() => onPlay(g)} top={g.e} en={`Game ${k + 1}: ${g.n}`} ar={g.nAr} sub={starsOf(best, g)} />
        ))}
      </div>
    </div>
  );
}
