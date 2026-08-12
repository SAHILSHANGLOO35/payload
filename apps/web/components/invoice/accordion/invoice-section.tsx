import React from "react"

import { InvoiceSection as Section } from "../common/invoice-section"
import { Label } from "@workspace/ui/components/label"
import { Input } from "@workspace/ui/components/input"

export const InvoiceSection = () => {
  return (
    <Section value="invoice" title="Invoice Details">
      <div className="space-y-5">
        <div className="space-y-2">
          <Label>Invoice Number</Label>

          <Input defaultValue="INV-0002" className="h-10" />
        </div>

        <div className="space-y-2">
          <Label>Invoice Date</Label>

          <Input type="date" className="h-10" />
        </div>

        <div className="space-y-2">
          <Label>Currency</Label>

          <Input defaultValue="USD" className="h-10" />
        </div>
      </div>
    </Section>
  )
}
