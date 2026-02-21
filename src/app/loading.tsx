export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-700 border-t-transparent" />
        <p className="text-slate-500 text-sm">Loading…</p>
      </div>
    </div>
  );
}
