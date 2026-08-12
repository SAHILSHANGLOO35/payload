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

export const InvoiceSection = () => {
  const [invoiceDate, setInvoiceDate] = useState<Date | undefined>(new Date())
  const [dueDate, setDueDate] = useState<Date | undefined>()

  const [invoiceDateOpen, setInvoiceDateOpen] = useState(false)
  const [dueDateOpen, setDueDateOpen] = useState(false)

  const formatDate = (date?: Date) => {
    if (!date) return ""

    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <Section value="invoice" title="Invoice Details">
      <div className="space-y-2">
        {/* Currency */}
        <div className="space-y-1.5 pb-1">
          <Label className="text-xs">Currency</Label>

          <div className="relative">
            <Input defaultValue="USD" className="px-3 pr-16" />

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
          {/* Invoice Prefix */}
          <div className="space-y-1.5">
            <Label className="text-xs">
              Invoice Prefix
              <span className="ml-1 rounded bg-muted px-1.5 py-0.5 text-[10px]">
                Optional
              </span>
            </Label>

            <Input defaultValue="Invoice INV-" className="px-3" />

            <p className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Info className="size-2.5" />
              Prefix for invoice number
            </p>
          </div>

          {/* Serial Number */}
          <div className="space-y-1.5">
            <Label className="text-xs">Serial Number</Label>

            <Input defaultValue="0007" className="px-3" />

            <p className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Info className="size-2.5" />
              Invoice serial number
            </p>
          </div>
        </div>

        {/* Invoice Date + Due Date */}
        <div className="grid grid-cols-2 gap-4">
          {/* Invoice Date */}
          <div className="space-y-1.5">
            <Label className="text-xs">Invoice Date</Label>

            <Popover open={invoiceDateOpen} onOpenChange={setInvoiceDateOpen}>
              <PopoverTrigger
                type="button"
                className="relative flex w-full items-center rounded-md border bg-background px-3 py-2 text-left text-sm"
              >
                <span className="truncate">{formatDate(invoiceDate)}</span>

                <CalendarIcon className="absolute right-3 size-4 text-muted-foreground" />
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={invoiceDate}
                  onSelect={(date) => {
                    setInvoiceDate(date)
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

          {/* Due Date */}
          <div className="space-y-1.5">
            <Label className="text-xs">Due Date</Label>

            <Popover open={dueDateOpen} onOpenChange={setDueDateOpen}>
              <PopoverTrigger
                type="button"
                className="relative flex w-full items-center rounded-md border bg-background px-3 py-2 text-left text-sm"
              >
                <span
                  className={
                    dueDate ? "text-foreground" : "text-muted-foreground"
                  }
                >
                  {dueDate ? formatDate(dueDate) : "Pick a date"}
                </span>

                <CalendarIcon className="absolute right-3 size-4 text-muted-foreground" />
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={(date) => {
                    setDueDate(date)
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
            Payment Terms{" "}
            <span className="ml-1 rounded bg-muted px-1.5 py-0.5 text-[10px]">
              Optional
            </span>
          </Label>

          <Input placeholder="50% of total amount upfront" className="px-3" />

          <p className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Info className="size-2.5" />
            Terms of payment
          </p>
        </div>

        {/* Billing Details */}
        <div className="space-y-1.5 pt-1">
          <Label className="text-xs">Billing Details</Label>

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
    </Section>
  )
}
