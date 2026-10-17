import { BackButton } from "@/components/back-button";
import { Tile } from "@/components/tile";
import { Title } from "@/components/title";
import { content } from "@/lib/content";
import type { Grade, Topic, TopicKind } from "@/types";
import { POS_LABELS, type PosTab } from "./pos.section";

interface TopicSectionProps {
  topics: Topic[];
  kind: TopicKind;
  pos: PosTab;
  /** true for the CEFR path (no term grouping) */
  general: boolean;
  /** level key (grade or CEFR level); grades with national sequences get their titles */
  levelKey: string;
  onBack: () => void;
  onPick: (t: Topic) => void;
}

const TERMS: [string, string][] = [
  ["First Term", "الفصل الأول"],
  ["Second Term", "الفصل الثاني"],
  ["Third Term", "الفصل الثالث"],
];

export function TopicSection({ topics, kind, pos, general, levelKey, onBack, onPick }: TopicSectionProps) {
  const list = topics.filter((t) => (kind === "v" ? t.k === "v" && t.pos === pos : t.k === kind));
  const groups = general || kind === "e" ? [-1] : [1, 2, 3, 0].filter((n) => list.some((t) => t.term === n));
  const seq = content.sequences[levelKey as Grade];
  const header = (n: number): [string, string] =>
    n === 0
      ? ["⭐ Must-Know", "الأهم"]
      : seq
        ? [`${TERMS[n - 1][0]} · ${seq[n - 1][0]}`, `${TERMS[n - 1][1]} · ${seq[n - 1][1]}`]
        : TERMS[n - 1];
  return (
    <div>
      <BackButton onClick={onBack} />
      <Title
        en={kind === "g" ? "Grammar topics" : kind === "e" ? "Exam practice" : POS_LABELS[pos][0]}
        ar={kind === "g" ? "مواضيع القواعد" : kind === "e" ? "تدريب على الامتحان" : POS_LABELS[pos][1]}
      />
      {groups.map((n) => (
        <div key={n} className="mb-6">
          {n >= 0 ? (
            <div className="mb-2 inline-block rounded-2xl bg-blue-700 px-4 py-1 font-extrabold text-white">
              {header(n)[0]} · <span dir="rtl">{header(n)[1]}</span>
            </div>
          ) : null}
          <div className="grid grid-cols-2 gap-3">
            {list
              .filter((t) => n < 0 || t.term === n)
              .map((t) => (
                <Tile key={t.id} onClick={() => onPick(t)} top={t.e} en={t.n} ar={t.ar} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
