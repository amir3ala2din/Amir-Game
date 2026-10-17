interface TileProps {
  onClick: () => void;
  top: string;
  en: string;
  ar: string;
  sub?: string;
}

export function Tile({ onClick, top, en, ar, sub }: TileProps) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-2xl border-4 border-blue-200 bg-white p-4 text-center shadow-md transition hover:border-yellow-400 active:scale-95"
    >
      <div className="text-4xl">{top}</div>
      <div className="font-extrabold text-blue-900">{en}</div>
      <div dir="rtl" className="font-bold text-blue-700">
        {ar}
      </div>
      {sub ? <div className="mt-1 text-sm text-yellow-500">{sub}</div> : null}
    </button>
  );
}
