import { Warning } from "@/components/icons/loading"

export const PdfLoading = () => {
  return (
    <div className="flex h-full min-h-100 flex-col items-center justify-center gap-4 text-foreground">
      <div className="rounded-md bg-sidebar p-2">
        <Warning className="size-8" />
      </div>

      <div className="text-center">
        <div className="space-y-1">
          <p className="font-semibold text-muted-foreground">Generating PDF</p>

          <p className="max-w-md text-xs text-muted-foreground/65">
            Please wait while we generate your PDF.
          </p>
        </div>
      </div>
    </div>
  )
}
