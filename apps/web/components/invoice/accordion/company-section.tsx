import React from "react"
import { InvoiceSection } from "../common/invoice-section"
import { Label } from "@workspace/ui/components/label"
import { Input } from "@workspace/ui/components/input"
import { Textarea } from "@workspace/ui/components/textarea"

export const CompanySection = () => {
  return (
    <InvoiceSection value="company" title="Company Details">
      <div className="space-y-5">
        <div className="space-y-2">
          <Label>Company Name</Label>

          <Input placeholder="Your company name" className="h-10" />
        </div>

        <div className="space-y-2">
          <Label>Company Address</Label>

          <Textarea
            placeholder="Your company address"
            className="min-h-28 resize-none"
          />
        </div>

        <div className="space-y-2">
          <Label>Company Email</Label>

          <Input type="email" placeholder="you@example.com" className="h-10" />
        </div>
      </div>
    </InvoiceSection>
  )
}
