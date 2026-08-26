import { Warning } from "@/components/icons/loading"

export default function Loading() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 text-foreground">
      <div className="rounded-md bg-sidebar p-2">
        <Warning className="size-8" />
      </div>
      <div className="flex text-center">
        <div className="space-y-1">
          <p className="font-semibold text-muted-foreground">
            Fetching Invoice...
          </p>
          <p className="max-w-md text-xs text-muted-foreground/65">
            Please wait while we fetch your beautiful invoice.
          </p>
        </div>
      </div>
    </div>
  )
}
