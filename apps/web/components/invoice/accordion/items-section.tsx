import React from "react"
import { InvoiceSection } from "../common/invoice-section"

export const ItemsSection = () => {
  return (
    <InvoiceSection value="items" title="Invoice Items">
      <div className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
        Invoice items will go here.
      </div>
    </InvoiceSection>
  )
}
