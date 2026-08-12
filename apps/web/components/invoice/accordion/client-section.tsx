import React from "react"
import { InvoiceSection } from "../common/invoice-section"
import { Label } from "@workspace/ui/components/label"
import { Input } from "@workspace/ui/components/input"
import { Textarea } from "@workspace/ui/components/textarea"
import { Button } from "@workspace/ui/components/button"

export const ClientSection = () => {
  return (
    <InvoiceSection value="client" title="Client Details">
      <div className="space-y-5">
        {/* Client Name */}
        <div className="space-y-2">
          <Label>Client Name</Label>

          <Input defaultValue="John Doe" className="h-10" />
        </div>

        {/* Client Address */}
        <div className="space-y-2">
          <Label>Client Address</Label>

          <Textarea
            defaultValue="456 Second St, Anytown, USA"
            className="min-h-24 resize-none"
          />
        </div>

        {/* Client Fields */}
        <div className="space-y-2">
          <Label>Client Fields</Label>

          <Button
            type="button"
            variant="outline"
            className="h-10 w-full border-dashed"
          >
            Add New Field
          </Button>
        </div>
      </div>
    </InvoiceSection>
  )
}
