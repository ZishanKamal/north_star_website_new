export default function ProgramDetailLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <div className="pt-32 pb-20 bg-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-5 w-40 rounded bg-slate-200 animate-pulse mb-8" />
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-slate-200 animate-pulse" />
                <div className="h-8 w-32 rounded-full bg-slate-200 animate-pulse" />
              </div>
              <div className="h-12 w-3/4 rounded-lg bg-slate-200 animate-pulse" />
              <div className="h-6 w-full rounded bg-slate-200 animate-pulse" />
              <div className="flex gap-4">
                <div className="h-12 w-36 rounded-lg bg-slate-200 animate-pulse" />
                <div className="h-12 w-36 rounded-lg bg-slate-200 animate-pulse" />
              </div>
            </div>
            <div className="aspect-video rounded-xl bg-slate-200 animate-pulse" />
          </div>
        </div>
      </div>
      {/* Content skeleton */}
      <div className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div className="h-7 w-48 rounded bg-slate-200 animate-pulse" />
              <div className="space-y-3">
                <div className="h-4 w-full rounded bg-slate-200 animate-pulse" />
                <div className="h-4 w-5/6 rounded bg-slate-200 animate-pulse" />
                <div className="h-4 w-4/5 rounded bg-slate-200 animate-pulse" />
              </div>
            </div>
            <div className="h-80 rounded-xl bg-slate-200 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
