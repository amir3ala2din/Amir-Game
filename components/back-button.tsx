export function BackButton({ onClick, en = "Back", ar = "رجوع" }: { onClick: () => void; en?: string; ar?: string }) {
  return (
    <button onClick={onClick} className="mb-3 rounded-full border-2 border-blue-300 bg-white px-4 py-2 font-bold text-blue-800 shadow-xs">
      ⬅ {en} ({ar})
    </button>
  );
}
