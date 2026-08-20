"use client"

import { useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"

import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"
import { PdfLoading } from "../pdf/loading"

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs"

type PdfPreviewProps = {
  file: Blob | null
}

const A4_PREVIEW_WIDTH = 595

export function PdfPreview({ file }: PdfPreviewProps) {
  return (
    <div className="scrollbar-none h-full min-h-0 w-full overflow-auto p-6 [&::-webkit-scrollbar]:hidden">
      <div className="flex min-h-full w-full items-center justify-center">
        <div className="w-fit shrink-0">
          {file ? <PdfPreviewDocument file={file} /> : <PdfLoading />}
        </div>
      </div>
    </div>
  )
}

type PdfPreviewDocumentProps = {
  file: Blob
}

function PdfPreviewDocument({ file }: PdfPreviewDocumentProps) {
  const [isPageRendered, setIsPageRendered] = useState(false)

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
      {!isPageRendered && (
        <div
          className="flex items-center justify-center"
          style={{ width: A4_PREVIEW_WIDTH }}
        >
          <PdfLoading />
        </div>
      )}

      <Page
        pageNumber={1}
        width={A4_PREVIEW_WIDTH}
        renderTextLayer
        renderAnnotationLayer
        className={`shadow-xl ${isPageRendered ? "" : "hidden"}`}
        onRenderSuccess={() => setIsPageRendered(true)}
        onRenderError={() => setIsPageRendered(true)}
      />
    </Document>
  )
}
