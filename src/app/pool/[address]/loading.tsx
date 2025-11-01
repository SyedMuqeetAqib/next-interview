export default function PoolLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6">
      <div className="grid gap-4 sm:gap-5 lg:gap-6">
        <div className="grid gap-4 sm:gap-5 lg:gap-6 lg:grid-cols-3">
          {/* Price Chart Skeleton */}
          <div className="lg:col-span-2 rounded-xl border border-primary/20 bg-card/60 backdrop-blur-md p-4 sm:p-5 lg:p-6 shadow-inner">
            <div className="h-6 w-32 bg-muted/50 rounded animate-pulse mb-3 sm:mb-4" />
            <div className="h-80 sm:h-96 rounded-lg bg-muted/30 border border-border/50 animate-pulse" />
          </div>

          {/* Buy Widget Skeleton */}
          <div className="rounded-xl border border-primary/20 bg-card/60 backdrop-blur-md p-4 sm:p-5 lg:p-6 shadow-inner">
            <div className="h-6 w-24 bg-muted/50 rounded animate-pulse mb-4" />
            <div className="space-y-4">
              <div className="h-10 bg-muted/50 rounded animate-pulse" />
              <div className="h-10 bg-muted/50 rounded animate-pulse" />
              <div className="h-12 bg-muted/50 rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Transaction Table Skeleton */}
        <div className="rounded-xl border border-primary/20 bg-card/60 backdrop-blur-md p-4 sm:p-5 lg:p-6 shadow-inner">
          <div className="h-6 w-40 bg-muted/50 rounded animate-pulse mb-4" />
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-muted/50 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
