"use client"

import { useEffect, useRef, useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"

import { PdfLoading } from "../pdf/loading"

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs"

const PDF_VIEWER_PADDING = 36
const MAX_PAGE_WIDTH = 600
const WIDTH_CHANGE_THRESHOLD = 4

type PdfPreviewProps = {
  file: Blob | null
}

export function PdfPreview({ file }: PdfPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const [containerWidth, setContainerWidth] = useState(0)

  useEffect(() => {
    const element = containerRef.current

    if (!element) return

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]

      if (!entry) return

      const newWidth = entry.contentRect.width

      setContainerWidth((previousWidth) =>
        Math.abs(previousWidth - newWidth) > WIDTH_CHANGE_THRESHOLD
          ? newWidth
          : previousWidth
      )
    })

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="scroll-bar-hidden h-full min-h-0 w-full min-w-0 overflow-x-hidden overflow-y-auto"
    >
      {!file ? (
        <div className="flex h-full w-full items-center justify-center">
          <PdfLoading />
        </div>
      ) : (
        <PDFViewer file={file} width={containerWidth} />
      )}
    </div>
  )
}

type PDFViewerProps = {
  file: Blob
  width: number
}

function PDFViewer({ file, width }: PDFViewerProps) {
  const [error, setError] = useState<Error | null>(null)

  const [numPages, setNumPages] = useState(0)

  const [isReady, setIsReady] = useState(false)

  const effectiveWidth = width === 0 ? MAX_PAGE_WIDTH : width

  const pageWidth =
    effectiveWidth > MAX_PAGE_WIDTH
      ? MAX_PAGE_WIDTH - PDF_VIEWER_PADDING
      : effectiveWidth - PDF_VIEWER_PADDING

  return (
    <div className="flex h-full w-full min-w-0 justify-center">
      <Document
        file={file}
        loading={null}
        onLoadSuccess={({ numPages }) => {
          setNumPages(numPages)
          setError(null)

          // New PDF has loaded, wait for Page render
          // before revealing it.
          setIsReady(false)
        }}
        onLoadError={(error) => {
          console.error("[ERROR]: Error loading PDF:", error)

          setError(error)
          setIsReady(false)
        }}
        className="scroll-bar-hidden flex h-full max-h-full w-full min-w-0 flex-col items-center gap-4 overflow-y-auto py-[18px]"
      >
        {!error &&
          Array.from({ length: numPages }, (_, index) => (
            <div
              key={`page_${index + 1}`}
              className="max-w-full shadow-xl transition-opacity duration-200 ease-out"
              style={{
                opacity: isReady ? 1 : 0,
              }}
            >
              <Page
                pageNumber={index + 1}
                width={Math.max(pageWidth, 100)}
                loading={null}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                onRenderSuccess={() => setIsReady(true)}
              />
            </div>
          ))}
      </Document>
    </div>
  )
}
