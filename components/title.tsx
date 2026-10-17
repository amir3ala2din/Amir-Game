export function Title({ en, ar }: { en: string; ar: string }) {
  return (
    <div className="mb-4 text-center">
      <h2 className="text-2xl font-extrabold text-blue-900">{en}</h2>
      <div dir="rtl" className="text-lg font-bold text-blue-600">
        {ar}
      </div>
    </div>
  );
}
