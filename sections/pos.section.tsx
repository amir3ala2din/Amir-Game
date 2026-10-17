import { BackButton } from "@/components/back-button";
import { Tile } from "@/components/tile";
import { Title } from "@/components/title";
import type { Pos } from "@/types";

export type PosTab = Pos | "m";

const TABS: [PosTab, string, string, string][] = [
  ["n", "📦", "Nouns", "الأسماء"],
  ["v", "🏃", "Verbs", "الأفعال"],
  ["a", "✨", "Adjectives", "الصفات"],
  ["x", "🔤", "Words", "كلمات"],
  ["m", "🎯", "Mixed", "منوّع"],
];

export const POS_LABELS: Record<PosTab, [string, string]> = {
  n: ["Nouns", "الأسماء"],
  v: ["Verbs", "الأفعال"],
  a: ["Adjectives", "الصفات"],
  x: ["Words", "كلمات"],
  m: ["Mixed", "منوّع"],
};

export function PosSection({ onBack, onPick }: { onBack: () => void; onPick: (p: PosTab) => void }) {
  return (
    <div>
      <BackButton onClick={onBack} />
      <Title en="Choose the word type" ar="اختر نوع الكلمات" />
      <div className="grid grid-cols-2 gap-4">
        {TABS.map(([k, e, en, ar]) => (
          <Tile key={k} onClick={() => onPick(k)} top={e} en={en} ar={ar} />
        ))}
      </div>
    </div>
  );
}
