import { pdf } from "@react-pdf/renderer"

import { InvoiceDocument } from "@/components/invoice/pdf/invoice-document"

import type { Invoice } from "@/types/invoice"

export async function generateInvoicePdf(invoice: Invoice) {
  return pdf(<InvoiceDocument invoice={invoice} />).toBlob()
}
