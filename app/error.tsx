"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="text-[8rem] font-bold leading-none tracking-tight text-muted-foreground/20">
          !
        </span>
        <h1 className="text-2xl font-semibold tracking-tight">Something went wrong</h1>
        <p className="max-w-sm text-muted-foreground">
          An unexpected error occurred. Please try again or return to the dashboard.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={reset}
          className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  )
}
