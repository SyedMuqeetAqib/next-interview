import Link from "next/link";

export default function PoolNotFound() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6">
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="rounded-xl border border-destructive/20 bg-card p-8 sm:p-10 lg:p-12 backdrop-blur-sm shadow-lg shadow-destructive/10 max-w-md w-full">
          <div className="text-center">
            <div className="mb-4 sm:mb-6">
              <svg
                className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-destructive"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-3 sm:mb-4">
              404
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground mb-3 sm:mb-4">
              Pool Not Found
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
              The pool address you're looking for doesn't exist or is invalid.
              Please check the address and try again.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Go back home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
