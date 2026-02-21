export default function OpenProgramsLoading() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <div className="h-10 w-72 mx-auto rounded-lg bg-muted animate-pulse" />
          <div className="h-5 w-96 mx-auto rounded bg-muted animate-pulse" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl border bg-card overflow-hidden">
              <div className="h-32 bg-muted animate-pulse" />
              <div className="p-6 space-y-3">
                <div className="h-5 w-3/4 rounded bg-muted animate-pulse" />
                <div className="h-4 w-full rounded bg-muted animate-pulse" />
                <div className="h-4 w-2/3 rounded bg-muted animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
