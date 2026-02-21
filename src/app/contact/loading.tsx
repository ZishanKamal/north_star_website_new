export default function ContactLoading() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <div className="h-10 w-56 mx-auto rounded-lg bg-muted animate-pulse" />
          <div className="h-5 w-80 mx-auto rounded bg-muted animate-pulse" />
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="h-12 w-full rounded-lg bg-muted animate-pulse" />
            <div className="h-12 w-full rounded-lg bg-muted animate-pulse" />
            <div className="h-32 w-full rounded-lg bg-muted animate-pulse" />
            <div className="h-12 w-40 rounded-lg bg-muted animate-pulse" />
          </div>
          <div className="space-y-6">
            <div className="h-48 rounded-2xl bg-muted animate-pulse" />
            <div className="h-48 rounded-2xl bg-muted animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
