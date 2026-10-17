export function Loading({ error }: { error?: Error | null }) {
  return (
    <div className="grid min-h-screen place-items-center p-6 text-center font-bold text-blue-800">
      {error ? <span className="text-red-700">⚠ {error.message}</span> : <span className="text-4xl">⏳</span>}
    </div>
  );
}
