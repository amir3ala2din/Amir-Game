import { BackButton } from "@/components/back-button";
import { Tile } from "@/components/tile";
import { Title } from "@/components/title";
import type { LevelDef } from "@/types";
import type { LearningPath } from "./path.section";

export function LevelSection({ path, levels, onBack, onPick }: { path: LearningPath; levels: LevelDef[]; onBack: () => void; onPick: (l: LevelDef) => void }) {
  const school = path === "school";
  return (
    <div>
      <BackButton onClick={onBack} />
      <Title en={school ? "Choose your grade" : "Choose your level"} ar={school ? "اختر مستواك الدراسي" : "اختر مستواك"} />
      <div className="grid grid-cols-2 gap-3">
        {levels.map((l) => (
          <Tile key={l[0]} onClick={() => onPick(l)} top={l[3]} en={l[0]} ar={l[1]} />
        ))}
      </div>
    </div>
  );
}
