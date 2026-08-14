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
import { useInvoiceStore } from "@/stores/invoice-store"

type additionalSectionProps = {
  isActive: boolean
}

export const AdditionalSection = ({ isActive }: additionalSectionProps) => {
  const invoice = useInvoiceStore((state) => state.invoice)

  const setNotes = useInvoiceStore((state) => state.setNotes)
  const setTerms = useInvoiceStore((state) => state.setTerms)

  const paymentDetails = useInvoiceStore(
    (state) => state.invoice.metadata.paymentDetails
  )
  const addPaymentDetail = useInvoiceStore((state) => state.addPaymentDetail)
  const updatePaymentDetail = useInvoiceStore(
    (state) => state.updatePaymentDetail
  )
  const removePaymentDetail = useInvoiceStore(
    (state) => state.removePaymentDetail
  )

  return (
    <InvoiceSection
      value="additional"
      title="Additional Information"
      isActive={isActive}
    >
      <div className="space-y-2">
        {/* Notes */}
        <div className="space-y-1.5 pb-1">
          <Label className="text-xs">
            Notes
            <span className="ml-1 rounded bg-muted px-1.5 py-0.5 text-[10px]">
              Optional
            </span>
          </Label>

          <Textarea
            placeholder="Notes - any relevant information not already covered"
            value={invoice.metadata.notes}
            onChange={(event) => setNotes(event.target.value)}
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
            value={invoice.metadata.terms}
            onChange={(event) => setTerms(event.target.value)}
            className="min-h-20 resize-none px-3"
          />

          <p className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Info className="size-2.5" />
            Terms and conditions for the invoice
          </p>
        </div>

        {/* Payment Information */}
        <div className="space-y-2">
          <Label className="text-xs">Payment Information</Label>

          <div className="space-y-3">
            {paymentDetails.map((field) => (
              <div key={field.id} className="flex items-start gap-2">
                <div className="flex flex-1 gap-2">
                  {/* Label */}
                  <div className="w-full space-y-1.5">
                    <Label className="text-xs">Label</Label>

                    <Input
                      placeholder="Label"
                      value={field.label}
                      onChange={(event) =>
                        updatePaymentDetail(field.id, {
                          label: event.target.value,
                        })
                      }
                      className="px-3"
                    />

                    <p className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Info className="size-2.5 shrink-0" />
                      Enter the label for the field
                    </p>
                  </div>

                  {/* Value */}
                  <div className="w-full space-y-1.5">
                    <Label className="text-xs">Value</Label>

                    <Input
                      placeholder="Value"
                      value={field.value}
                      onChange={(event) =>
                        updatePaymentDetail(field.id, {
                          value: event.target.value,
                        })
                      }
                      className="px-3"
                    />

                    <p className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Info className="size-2.5 shrink-0" />
                      Enter the value for the field
                    </p>
                  </div>
                </div>

                {/* Delete */}
                <div className="space-y-1.5">
                  <Label className="invisible text-xs">Delete</Label>

                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="h-9 w-9 shrink-0 cursor-pointer rounded-md bg-linear-to-b from-red-500 to-red-600 shadow-xs ring-1 shadow-red-500/20 ring-white/25 transition-all duration-200 ease-in-out ring-inset hover:from-red-600 hover:to-red-600"
                    onClick={() => removePaymentDetail(field.id)}
                  >
                    <TbTrashFilled className="size-5 text-white" />
                  </Button>
                </div>
              </div>
            ))}

            {/* Add New Field */}
            <Button
              type="button"
              variant="outline"
              onClick={addPaymentDetail}
              className="w-full cursor-pointer border-dashed py-4"
            >
              <AddItem />
              Add New Field
            </Button>
          </div>
        </div>
      </div>
    </InvoiceSection>
  )
}
