"use client"

import React, { useState } from "react"
import { InvoiceSection as Section } from "../common/invoice-section"
import { Label } from "@workspace/ui/components/label"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"
import { Calendar } from "@workspace/ui/components/calendar"
import { Calendar as CalendarIcon } from "@/components/icons/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover"
import { ChevronDown, Info } from "lucide-react"
import { AddItem } from "@/components/icons/add-item"
import { useInvoiceStore } from "@/stores/invoice-store"
import { BillingCustomField } from "../fields/billing-custom-field"

type invoiceSectionProps = {
  isActive: boolean
}

export const InvoiceDetailsSection = ({ isActive }: invoiceSectionProps) => {
  const invoice = useInvoiceStore((state) => state.invoice.invoice)
  const terms = useInvoiceStore((state) => state.invoice.metadata.terms)

  const updateInvoiceDetails = useInvoiceStore(
    (state) => state.updateInvoiceDetails
  )
  const setTerms = useInvoiceStore((state) => state.setTerms)
  const addBillingDetail = useInvoiceStore((state) => state.addBillingDetails)
  const updateBillingDetail = useInvoiceStore(
    (state) => state.updateBillingDetail
  )
  const removeBillingDetail = useInvoiceStore(
    (state) => state.removeBillingDetail
  )

  const [invoiceDateOpen, setInvoiceDateOpen] = useState(false)
  const [dueDateOpen, setDueDateOpen] = useState(false)

  const formatDate = (value: string) => {
    if (!value) return ""
    return new Date(value).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <Section
      value="invoice-details"
      title="Invoice Details"
      isActive={isActive}
    >
      <div className="space-y-2">
        {/* Currency */}
        <div className="space-y-1.5 pb-1">
          <Label className="text-xs">Currency</Label>
          <div className="relative">
            <Input
              value={invoice.currency}
              onChange={(event) =>
                updateInvoiceDetails({ currency: event.target.value })
              }
              className="px-3 pr-16"
            />
            <div className="absolute top-1/2 right-2 flex -translate-y-1/2 items-center gap-2">
              <ChevronDown className="size-4 text-muted-foreground" />
            </div>
          </div>
          <p className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Info className="size-2.5" />
            Currency code for the invoice
          </p>
        </div>

        {/* Prefix + Serial Number */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs">
              Invoice Prefix
              <span className="ml-1 rounded bg-muted px-1.5 py-0.5 text-[10px]">
                Optional
              </span>
            </Label>
            <Input
              value={invoice.prefix}
              onChange={(event) =>
                updateInvoiceDetails({ prefix: event.target.value })
              }
              className="px-3"
            />
            <p className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Info className="size-2.5" />
              Prefix for invoice number
            </p>
          </div>

          {/* Serial number */}
          <div className="space-y-1.5">
            <Label className="text-xs">Serial Number</Label>
            <Input
              value={invoice.serialNumber}
              onChange={(event) =>
                updateInvoiceDetails({ serialNumber: event.target.value })
              }
              className="px-3"
            />
            <p className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Info className="size-2.5" />
              Invoice serial number
            </p>
          </div>
        </div>

        {/* Invoice Date + Due Date */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs">Invoice Date</Label>
            <Popover open={invoiceDateOpen} onOpenChange={setInvoiceDateOpen}>
              <PopoverTrigger
                type="button"
                className="relative flex w-full items-center rounded-md border bg-background px-3 py-2 text-left text-sm"
              >
                <span
                  className={
                    invoice.date
                      ? "truncate text-foreground"
                      : "text-muted-foreground"
                  }
                >
                  {invoice.date ? formatDate(invoice.date) : "Pick a date"}
                </span>
                <CalendarIcon className="absolute right-3 size-4 text-muted-foreground" />
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={invoice.date ? new Date(invoice.date) : undefined}
                  onSelect={(date) => {
                    if (!date) return
                    updateInvoiceDetails({ date: date.toISOString() })
                    setInvoiceDateOpen(false)
                  }}
                  className="font-geist"
                />
              </PopoverContent>
            </Popover>
            <p className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Info className="size-2.5" />
              Date when invoice is issued
            </p>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Due Date</Label>
            <Popover open={dueDateOpen} onOpenChange={setDueDateOpen}>
              <PopoverTrigger
                type="button"
                className="relative flex w-full items-center rounded-md border bg-background px-3 py-2 text-left text-sm"
              >
                <span
                  className={
                    invoice.dueDate
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }
                >
                  {invoice.dueDate
                    ? formatDate(invoice.dueDate)
                    : "Pick a date"}
                </span>
                <CalendarIcon className="absolute right-3 size-4 text-muted-foreground" />
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={
                    invoice.dueDate ? new Date(invoice.dueDate) : undefined
                  }
                  onSelect={(date) => {
                    if (!date) return
                    updateInvoiceDetails({ dueDate: date.toISOString() })
                    setDueDateOpen(false)
                  }}
                  className="font-geist"
                />
              </PopoverContent>
            </Popover>
            <p className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Info className="size-2.5" />
              Date when payment is due
            </p>
          </div>
        </div>

        {/* Payment Terms */}
        <div className="space-y-1.5 pb-1">
          <Label className="text-xs">
            Payment Terms
            <span className="ml-1 rounded bg-muted px-1.5 py-0.5 text-[10px]">
              Optional
            </span>
          </Label>
          <Input
            value={terms}
            onChange={(event) => setTerms(event.target.value)}
            placeholder="50% of total amount upfront"
            className="px-3"
          />
          <p className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Info className="size-2.5" />
            Terms of payment
          </p>
        </div>

        {/* Billing Details */}
        <div className="space-y-3 pt-1">
          <Label className="text-xs">Billing Details</Label>

          {invoice.billingDetails.map((bd) => (
            <BillingCustomField
              key={bd.id}
              field={bd}
              onChange={(data) => updateBillingDetail(bd.id, data)}
              onRemove={() => removeBillingDetail(bd.id)}
            />
          ))}

          <Button
            type="button"
            variant="outline"
            className="w-full cursor-pointer border-dashed py-4"
            onClick={addBillingDetail}
          >
            <AddItem />
            Add New Field
          </Button>
        </div>
      </div>
    </Section>
  )
}
