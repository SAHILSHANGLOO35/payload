"use client"

import React from "react"
import { InvoiceSection } from "../common/invoice-section"
import { Label } from "@workspace/ui/components/label"
import { Input } from "@workspace/ui/components/input"
import { Textarea } from "@workspace/ui/components/textarea"
import { Button } from "@workspace/ui/components/button"
import { AddItem } from "@/components/icons/add-item"

export const ClientSection = () => {
  return (
    <InvoiceSection value="client" title="Client Details">
      <div className="space-y-2">
        {/* Client Name */}
        <div className="space-y-2 pb-2">
          <Label className="text-xs">Client Name</Label>

          <Input
            placeholder="Client name"
            defaultValue="John Doe"
            className="px-3"
          />
        </div>

        {/* Client Address */}
        <div className="space-y-2 pb-2">
          <Label className="text-xs">Client Address</Label>

          <Textarea
            placeholder="Client address"
            defaultValue="456 Second St, Anytown, USA"
            className="px-3"
          />
        </div>

        {/* Client Additional Fields */}
        <div>
          <Button
            type="button"
            variant="outline"
            className="w-full cursor-pointer border-dashed py-4"
          >
            <AddItem />
            Add New Field
          </Button>
        </div>
      </div>
    </InvoiceSection>
  )
}
