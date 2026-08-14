import { DownloadPanel } from "@/components/common/download-panel"
import { InvoiceForm } from "./form"

export function InvoiceEditor() {
  return (
    <div className="flex h-full min-h-0 w-full flex-col">
      <DownloadPanel />
      <div className="min-h-0 w-1/2 flex-1 overflow-auto">
        <InvoiceForm />
      </div>
    </div>
  )
}
