export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center rounded-tl-2xl border bg-background text-foreground">
      <div className="flex items-center gap-3 rounded-2xl border bg-background/80 px-4 py-3 shadow-sm">
        <div className="size-3 animate-pulse rounded-full bg-muted-foreground/60" />
        <div className="space-y-1">
          <div className="h-3 w-28 animate-pulse rounded-full bg-muted-foreground/25" />
          <div className="h-2 w-40 animate-pulse rounded-full bg-muted-foreground/15" />
        </div>
      </div>
    </div>
  )
}
