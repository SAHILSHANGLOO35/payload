import { Document } from "@react-pdf/renderer"

import type { Invoice } from "@/types/invoice"
import { InvoicePage } from "./invoice-page"

type InvoiceDocumentProps = {
  invoice: Invoice
}

export function InvoiceDocument({ invoice }: InvoiceDocumentProps) {
  return (
    <Document>
      <InvoicePage invoice={invoice} />
    </Document>
  )
}
