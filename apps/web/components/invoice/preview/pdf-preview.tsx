"use client"

import { useEffect, useRef, useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"

import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"
import { PdfLoading } from "../pdf/loading"

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs"

type PdfPreviewProps = {
  file: Blob | null
}

export function PdfPreview({ file }: PdfPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pageWidth, setPageWidth] = useState<number>()

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width
      if (width) setPageWidth(Math.floor(width))
    })

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="scrollbar-none h-full min-h-0 w-full overflow-auto p-6 [&::-webkit-scrollbar]:hidden">
      <div className="flex min-h-full w-full items-center justify-center">
        <div ref={containerRef} className="w-full max-w-2xl">
          {file ? (
            <PdfPreviewDocument file={file} pageWidth={pageWidth} />
          ) : (
            <PdfLoading />
          )}
        </div>
      </div>
    </div>
  )
}

type PdfPreviewDocumentProps = {
  file: Blob
  pageWidth?: number
}

function PdfPreviewDocument({ file, pageWidth }: PdfPreviewDocumentProps) {
  const [isPageRendered, setIsPageRendered] = useState(false)

  const showLoader = !pageWidth || !isPageRendered

  return (
    <Document
      file={file}
      loading={null}
      error={
        <div className="flex items-center justify-center p-8 text-sm text-destructive">
          Failed to load PDF file.
        </div>
      }
    >
      {pageWidth && (
        <Page
          pageNumber={1}
          width={pageWidth}
          renderTextLayer
          renderAnnotationLayer
          className={`shadow-xl ${showLoader ? "hidden" : ""}`}
          onRenderSuccess={() => setIsPageRendered(true)}
          onRenderError={() => setIsPageRendered(true)}
        />
      )}
    </Document>
  )
}
