import { BackButton } from "@/components/back-button";
import { Tile } from "@/components/tile";
import { Title } from "@/components/title";

export type LearningPath = "school" | "general";

export function PathSection({ onBack, onPick }: { onBack: () => void; onPick: (p: LearningPath) => void }) {
  return (
    <div>
      <BackButton onClick={onBack} en="Back to Home" ar="العودة للرئيسية" />
      <Title en="Choose your path" ar="اختر مسارك" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Tile onClick={() => onPick("school")} top="🏫" en="Algerian School" ar="المدرسة الجزائرية" />
        <Tile onClick={() => onPick("general")} top="🌍" en="General English" ar="الإنجليزية العامة" />
      </div>
    </div>
  );
}
