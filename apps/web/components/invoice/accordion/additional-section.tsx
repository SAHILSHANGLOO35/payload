"use client"

import React from "react"
import { InvoiceSection } from "../common/invoice-section"
import { Label } from "@workspace/ui/components/label"
import { Textarea } from "@workspace/ui/components/textarea"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"
import { AddItem } from "@/components/icons/add-item"
import { Info } from "lucide-react"
import { TbTrashFilled } from "react-icons/tb"

export const AdditionalSection = () => {
  return (
    <InvoiceSection value="additional" title="Additional Information">
      <div className="space-y-2">
        {/* Notes */}
        <div className="space-y-1.5 pb-1">
          <Label className="text-xs">
            Notes{" "}
            <span className="ml-1 rounded bg-muted px-1.5 py-0.5 text-[10px]">
              Optional
            </span>
          </Label>

          <Textarea
            placeholder="Notes - any relevant information not already covered"
            defaultValue="Thank you for your business."
            className="min-h-20 resize-none px-3"
          />

          <p className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Info className="size-2.5" />
            Additional notes for the invoice
          </p>
        </div>

        {/* Terms */}
        <div className="space-y-1.5 pb-1">
          <Label className="text-xs">
            Terms
            <span className="ml-1 rounded bg-muted px-1.5 py-0.5 text-[10px]">
              Optional
            </span>
          </Label>

          <Textarea
            placeholder="Terms & Conditions - late fees, payment methods, delivery terms, etc."
            defaultValue="Payment is due within 30 days of the invoice date."
            className="min-h-20 resize-none px-3"
          />

          <p className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Info className="size-2.5" />
            Terms and conditions for the invoice
          </p>
        </div>

        {/* Payment Information */}
        <div className="pt-1">
          <h3 className="text-xs font-medium">Payment Information</h3>
        </div>

        {/* Payment Field 1 */}
        <div className="grid grid-cols-[1fr_1fr_auto] items-start gap-2">
          <div className="space-y-1.5">
            <Label className="text-xs">Label</Label>

            <Input
              placeholder="Label"
              defaultValue="Bank Name"
              className="px-3"
            />

            <p className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Info className="size-2.5" />
              Enter the label for the field
            </p>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Value</Label>

            <Input
              placeholder="Value"
              defaultValue="HDFC Bank"
              className="px-3"
            />

            <p className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Info className="size-2.5" />
              Enter the value for the field
            </p>
          </div>

          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="mt-5.5 h-9 w-9 shrink-0 cursor-pointer rounded-md bg-linear-to-b from-red-500 to-red-600 shadow-xs ring-1 shadow-red-500/20 ring-white/25 transition-all duration-200 ease-in-out ring-inset hover:from-red-600 hover:to-red-600"
          >
            <TbTrashFilled className="size-5 text-white" />
          </Button>
        </div>

        {/* Add New Field */}
        <div className="pt-1 pb-12">
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
