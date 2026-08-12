import React from "react"
import { InvoiceSection } from "../common/invoice-section"
import { Label } from "@workspace/ui/components/label"
import { Textarea } from "@workspace/ui/components/textarea"

export const AdditionalSection = () => {
  return (
    <InvoiceSection value="additional" title="Additional Information">
      <div className="space-y-2">
        <Label>Notes</Label>

        <Textarea
          placeholder="Additional information..."
          className="min-h-28 resize-none"
        />
      </div>
    </InvoiceSection>
  )
}
