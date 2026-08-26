"use client"

import React, { useState } from "react"
import {
  Combobox,
  ComboboxContent,
  ComboboxItem,
  ComboboxInput,
  ComboboxList,
} from "@workspace/ui/components/combobox"
import { Button } from "@workspace/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { Download } from "../icons/download"
import { Preview } from "../icons/preview"
import { Gallery } from "../icons/gallery"
import { Invoice } from "../icons/invoice"
import { ShowBoth } from "../icons/show-both"
import { useInvoiceStore } from "@/stores/invoice-store"
import { createInvoice, saveInvoice } from "@/lib/invoice/invoice-api"
import axios from "axios"
import { uploadInvoiceAssets } from "../../lib/invoice/invoice-api"
import { useViewModeStore, ViewMode } from "@/stores/view-mode-store"
import {
  downloadInvoicePdf,
  downloadInvoicePng,
  viewInvoicePdf,
} from "@/lib/invoice/export"

type ItemsPanel = {
  icon?: React.ReactNode
  title: string
  value: ViewMode
}

export const DownloadPanel = ({ pdfBlob }: { pdfBlob: Blob | null }) => {
  const invoice = useInvoiceStore((state) => state.invoice)
  const invoiceId = useInvoiceStore((state) => state.invoiceId)
  const setInvoiceId = useInvoiceStore((state) => state.setInvoiceId)

  const viewMode = useViewModeStore((state) => state.viewMode)
  const setViewMode = useViewModeStore((state) => state.setViewMode)

  const [isSaving, setIsSaving] = useState(false)

  const items: ItemsPanel[] = [
    {
      icon: <Invoice />,
      title: "Form",
      value: "form",
    },
    {
      icon: <Preview />,
      title: "Preview",
      value: "preview",
    },
    {
      icon: <ShowBoth />,
      title: "Both",
      value: "both",
    },
  ]

  const currentPreference = items.find((item) => item.value === viewMode)

  const handleSaveInvoice = async () => {
    if (isSaving) return

    if (!invoice.invoice.date || !invoice.invoice.dueDate) {
      return
    }

    try {
      setIsSaving(true)

      let id = invoiceId ?? sessionStorage.getItem("payload_invoice_id")

      if (id && !invoiceId) {
        setInvoiceId(id)
      }

      // Create invoice shell only if we don't have an id
      if (!id) {
        const createdInvoice = await createInvoice()

        id = createdInvoice.id

        setInvoiceId(id!)
        sessionStorage.setItem("payload_invoice_id", id!)
      }

      try {
        // Save normal invoice data
        await saveInvoice(id!, invoice)
      } catch (error) {
        // Stored invoice id no longer exists
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          sessionStorage.removeItem("payload_invoice_id")

          setInvoiceId(null!)

          const createdInvoice = await createInvoice()

          id = createdInvoice.id

          setInvoiceId(id!)

          sessionStorage.setItem("payload_invoice_id", id!)

          await saveInvoice(id!, invoice)
        } else {
          throw error
        }
      }

      // Upload ONLY newly selected files.
      // Existing signed URLs are already stored in Supabase.
      const logoFile =
        invoice.company.logo instanceof File ? invoice.company.logo : null

      const signatureFile =
        invoice.company.signature instanceof File
          ? invoice.company.signature
          : null

      await uploadInvoiceAssets(id!, logoFile, signatureFile)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("SAVE ERROR:", error.response?.data)
        return
      }

      console.error(error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleViewInvoice = () => {
    if (!pdfBlob) return

    try {
      viewInvoicePdf(pdfBlob)
    } catch (error) {
      console.error("VIEW PDF ERROR:", error)
    }
  }

  const handleDownloadPdf = () => {
    if (!pdfBlob) return

    downloadInvoicePdf(pdfBlob, filename)
  }

  const handleDownloadPng = async () => {
    if (!pdfBlob) return

    try {
      await downloadInvoicePng(pdfBlob, filename)
    } catch (error) {
      console.error("PNG DOWNLOAD ERROR:", error)
    }
  }

  const filename =
    `${invoice.invoice.prefix}${invoice.invoice.serialNumber}`.trim() ||
    "invoice"

  return (
    <div className="flex w-full items-center justify-between border-b px-4 py-2 font-geist">
      <div />

      <div className="flex w-60 items-center gap-2">
        <Combobox
          items={items}
          value={currentPreference}
          itemToStringLabel={(item) => item.title}
          onValueChange={(item) => {
            if (item) {
              setViewMode(item.value)
            }
          }}
        >
          <div className="relative w-32">
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center gap-2 px-3">
              {currentPreference?.icon}

              <span className="text-sm">{currentPreference?.title}</span>
            </div>

            <ComboboxInput
              readOnly
              className="w-full cursor-default border-border py-4 text-transparent caret-transparent ring-0 outline-none selection:bg-transparent focus:border-border focus:ring-0 focus:outline-none focus-visible:border-border focus-visible:ring-0 focus-visible:outline-none"
            />
          </div>

          <ComboboxContent>
            <ComboboxList>
              {(item) => (
                <ComboboxItem
                  key={item.value}
                  value={item}
                  className="font-geist"
                >
                  <div className="flex w-full items-center gap-2">
                    <span className="flex w-5 shrink-0 items-center justify-center">
                      {item.icon}
                    </span>
                    <span>{item.value}</span>
                  </div>
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button className="flex cursor-pointer items-center justify-center gap-1.5 rounded-md border border-transparent bg-blue-600 py-4 text-center text-sm font-medium text-white shadow-xs [box-shadow:inset_0_1px_0_rgba(255,255,255,0.18)] transition-colors hover:bg-blue-700 focus:bg-blue-600 focus-visible:bg-blue-600 focus-visible:ring-0 focus-visible:outline-none active:bg-blue-600 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                <Download />
                Download
              </Button>
            }
          />

          <DropdownMenuContent className="flex w-40 cursor-pointer items-center font-geist">
            <DropdownMenuGroup>
              <DropdownMenuItem
                disabled={isSaving}
                onClick={handleSaveInvoice}
                className="cursor-pointer p-1.5"
              >
                <Download className="flex w-5 shrink-0 items-center justify-center" />
                {isSaving ? "Saving..." : "Save Invoice"}
              </DropdownMenuItem>

              <DropdownMenuItem
                disabled={!pdfBlob}
                onClick={handleViewInvoice}
                className="cursor-pointer p-1.5"
              >
                <Preview className="flex w-5 shrink-0 items-center justify-center" />
                View Invoice
              </DropdownMenuItem>

              <DropdownMenuItem
                disabled={!pdfBlob}
                onClick={handleDownloadPdf}
                className="cursor-pointer p-1.5"
              >
                <Invoice className="flex w-5 shrink-0 items-center justify-center" />
                Download PDF
              </DropdownMenuItem>

              <DropdownMenuItem
                disabled={!pdfBlob}
                onClick={handleDownloadPng}
                className="cursor-pointer p-1.5"
              >
                <Gallery className="flex w-5 shrink-0 items-center justify-center" />
                Download PNG
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
