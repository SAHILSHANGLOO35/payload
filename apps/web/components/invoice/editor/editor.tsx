"use client"

import dynamic from "next/dynamic"
import { useEffect, useRef, useState } from "react"

import { DownloadPanel } from "@/components/common/download-panel"
import { useInvoiceStore } from "@/stores/invoice-store"
import { generateInvoicePdf } from "@/lib/invoice/pdf"

import { InvoiceForm } from "./form"
import { PdfLoading } from "../pdf/loading"
import { useViewModeStore } from "@/stores/view-mode-store"

const PdfViewer = dynamic<{ file: Blob | null }>(
  () => import("../preview/pdf-preview").then((module) => module.PdfPreview),
  {
    ssr: false,
    loading: () => (
      <div className="scrollbar-none flex h-full min-h-0 w-full min-w-0 items-center justify-center overflow-auto [&::-webkit-scrollbar]:hidden">
        <div className="w-full max-w-2xl min-w-0">
          <PdfLoading />
        </div>
      </div>
    ),
  }
)

export function InvoiceEditor() {
  const invoice = useInvoiceStore((state) => state.invoice)

  const viewMode = useViewModeStore((state) => state.viewMode)

  const setResponsiveViewMode = useViewModeStore(
    (state) => state.setResponsiveViewMode
  )

  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null)

  const isFirstRun = useRef(true)

  useEffect(() => {
    let cancelled = false

    const generate = async () => {
      const blob = await generateInvoicePdf(invoice)

      if (!cancelled) {
        setPdfBlob(blob)
      }
    }

    const delay = isFirstRun.current ? 0 : 1000

    isFirstRun.current = false

    const timeout = setTimeout(generate, delay)

    return () => {
      cancelled = true
      clearTimeout(timeout)
    }
  }, [invoice])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)")

    const handleScreenChange = () => {
      setResponsiveViewMode(mediaQuery.matches)
    }

    handleScreenChange()

    mediaQuery.addEventListener("change", handleScreenChange)

    return () => {
      mediaQuery.removeEventListener("change", handleScreenChange)
    }
  }, [setResponsiveViewMode])

  const showForm = viewMode === "form" || viewMode === "both"

  const showPreview = viewMode === "preview" || viewMode === "both"

  return (
    <div className="flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden">
      <div className="shrink-0">
        <DownloadPanel pdfBlob={pdfBlob} />
      </div>

      <div
        className={`grid min-h-0 min-w-0 flex-1 overflow-hidden ${
          viewMode === "both"
            ? "grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
            : "grid-cols-[minmax(0,1fr)]"
        }`}
      >
        {showForm && (
          <div className="grid min-h-0 min-w-0 grid-cols-[minmax(0,1fr)] overflow-hidden">
            <InvoiceForm />
          </div>
        )}

        {showPreview && (
          <div className="grid min-h-0 min-w-0 grid-cols-[minmax(0,1fr)] overflow-hidden">
            <PdfViewer file={pdfBlob} />
          </div>
        )}
      </div>
    </div>
  )
}
