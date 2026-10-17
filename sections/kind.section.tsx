import { BackButton } from "@/components/back-button";
import { Tile } from "@/components/tile";
import { Title } from "@/components/title";
import type { Grade, Topic, TopicKind } from "@/types";

interface KindSectionProps {
  topics: Topic[];
  grades: Grade[];
  best: Record<string, number>;
  /** true when "My Mistakes" was clicked but nothing is saved */
  noMistakes: boolean;
  onBack: () => void;
  onVocabulary: () => void;
  onKind: (k: Exclude<TopicKind, "v">) => void;
  onMistakes: () => void;
}

export function KindSection({ topics, grades, best, noMistakes, onBack, onVocabulary, onKind, onMistakes }: KindSectionProps) {
  const total = topics.reduce((x, t) => x + t.games.length, 0);
  const done = Object.entries(best).filter(([k, v]) => grades.some((c) => k.startsWith(c)) && v >= 80).length;
  const badge = done >= 60 ? "🥇" : done >= 30 ? "🥈" : done >= 10 ? "🥉" : "🌱";
  return (
    <div>
      <BackButton onClick={onBack} />
      <Title en="What do you want to play?" ar="ماذا تريد أن تلعب؟" />
      <div className="mb-4 rounded-2xl border-2 border-blue-200 bg-white p-3 text-center">
        <div className="font-bold text-blue-900">
          {badge} Mastered games (ألعاب متقنة): {done} / {total}
        </div>
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-blue-100">
          <div className="h-full bg-yellow-400" style={{ width: Math.min(100, (done / Math.max(total, 1)) * 100) + "%" }}></div>
        </div>
        <div className="mt-1 text-xs text-blue-600">A game counts when you score 80% or more</div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Tile onClick={onVocabulary} top="📚" en="Vocabulary" ar="المفردات" />
        <Tile onClick={() => onKind("g")} top="✏️" en="Grammar" ar="القواعد" />
        <Tile onClick={() => onKind("e")} top="📝" en="Exam Practice" ar="تدريب على الامتحان" />
        <Tile onClick={onMistakes} top="🔁" en="My Mistakes" ar="أخطائي" />
      </div>
      {noMistakes ? <div className="mt-4 text-center font-bold text-green-700">No mistakes saved yet 🎉 (لا توجد أخطاء محفوظة)</div> : null}
    </div>
  );
}
