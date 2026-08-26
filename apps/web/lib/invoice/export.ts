const PNG_DPI = 300
const PDF_DPI = 72

const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob)

  const link = document.createElement("a")
  link.href = url
  link.download = filename

  document.body.appendChild(link)
  link.click()
  link.remove()

  setTimeout(() => {
    URL.revokeObjectURL(url)
  }, 1000)
}

export const viewInvoicePdf = (blob: Blob) => {
  const url = URL.createObjectURL(blob)

  const newTab = window.open(url, "_blank", "noopener,noreferrer")

  if (!newTab) {
    URL.revokeObjectURL(url)
    throw new Error("Could not open PDF. Popups may be blocked.")
  }

  // Give the browser PDF viewer enough time to consume the blob.
  setTimeout(() => {
    URL.revokeObjectURL(url)
  }, 60_000)
}

export const downloadInvoicePdf = (blob: Blob, filename: string) => {
  downloadBlob(blob, `${filename}.pdf`)
}

export const downloadInvoicePng = async (blob: Blob, filename: string) => {
  const { pdfjs } = await import("react-pdf")

  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString()

  const buffer = await blob.arrayBuffer()

  const pdf = await pdfjs.getDocument({
    data: buffer,
  }).promise

  const scale = PNG_DPI / PDF_DPI

  try {
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber)

      const viewport = page.getViewport({
        scale,
      })

      const canvas = document.createElement("canvas")

      canvas.width = Math.ceil(viewport.width)
      canvas.height = Math.ceil(viewport.height)

      const context = canvas.getContext("2d")

      if (!context) {
        throw new Error("Could not create canvas context")
      }

      context.fillStyle = "#ffffff"
      context.fillRect(0, 0, canvas.width, canvas.height)

      await page.render({
        canvas,
        canvasContext: context,
        viewport,
      }).promise

      const pngBlob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((result) => {
          if (!result) {
            reject(new Error("Failed to generate PNG"))
            return
          }

          resolve(result)
        }, "image/png")
      })

      const suffix = pdf.numPages > 1 ? `-page-${pageNumber}` : ""

      downloadBlob(pngBlob, `${filename}${suffix}.png`)

      page.cleanup()

      canvas.width = 0
      canvas.height = 0
    }
  } finally {
    await pdf.destroy()
  }
}
