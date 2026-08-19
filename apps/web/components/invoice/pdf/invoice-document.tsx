import { Document } from "@react-pdf/renderer"

import type { Invoice } from "@/types/invoice"
import { type PdfThemeKey } from "@/lib/invoice/pdf-theme"

import "@/lib/invoice/pdf-fonts"

import DefaultPdf from "./default"
import VercelPdf from "./vercel"
import GithubPdf from "./github"
import StripePdf from "./stripe"
import NotionPdf from "./notion"

type InvoiceTemplateProps = {
  invoice: Invoice
}

const templates: Partial<
  Record<PdfThemeKey, React.ComponentType<InvoiceTemplateProps>>
> = {
  default: DefaultPdf,
  vercel: VercelPdf,
  github: GithubPdf,
  stripe: StripePdf,
  notion: NotionPdf,
}

type InvoiceDocumentProps = {
  invoice: Invoice
}

export function InvoiceDocument({ invoice }: InvoiceDocumentProps) {
  const themeKey = invoice.theme.template as PdfThemeKey

  const Template = templates[themeKey] ?? DefaultPdf

  return (
    <Document
      title={`${invoice.invoice.prefix}-${invoice.invoice.serialNumber}`}
      author={invoice.company.name}
      creator="Payload"
    >
      <Template invoice={invoice} />
    </Document>
  )
}
