export function MuteButton({ muted, onToggle }: { muted: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      style={{ top: "calc(env(safe-area-inset-top,0px) + 8px)" }}
      className="fixed left-2 z-50 h-11 w-11 rounded-full border-2 border-blue-300 bg-white text-xl shadow-lg"
    >
      {muted ? "🔇" : "🔊"}
    </button>
  );
}
