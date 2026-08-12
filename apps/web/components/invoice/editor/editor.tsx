import { DownloadPanel } from "@/components/common/download-panel"
import { InvoiceForm } from "./form"

export function InvoiceEditor() {
  return (
    <div className="w-full">
      <DownloadPanel />
      <div className="h-full w-1/2">
        <InvoiceForm />
      </div>
    </div>
  )
}
