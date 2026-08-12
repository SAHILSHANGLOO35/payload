import { Button } from "@workspace/ui/components/button"
import { ChevronDown } from "lucide-react"

export function InvoiceToolbar() {
  return (
    <div className="flex h-17 shrink-0 items-center justify-between border-b border-border/60 px-4">
      <h2 className="text-base font-semibold">Invoice Template</h2>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="h-10 min-w-34 justify-between bg-transparent"
        >
          <span className="text-muted-foreground">Font</span>
          <ChevronDown className="size-4 opacity-60" />
        </Button>

        <Button
          variant="outline"
          className="h-10 min-w-34 justify-between bg-transparent"
        >
          <span>Default</span>
          <ChevronDown className="size-4 opacity-60" />
        </Button>
      </div>
    </div>
  )
}
