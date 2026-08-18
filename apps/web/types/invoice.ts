import { PdfFont, PdfThemeKey } from "@/lib/invoice/pdf-theme"

export type InvoiceItem = {
  id: string
  name: string
  description: string
  quantity: number
  unitPrice: number
}

export type CustomField = {
  id: string
  label: string
  value: string
}

export type CompanyDetails = {
  logo: File | null
  signature: File | null
  name: string
  address: string
  fields: CustomField[]
}

export type ClientDetails = {
  name: string
  address: string
  fields: CustomField[]
}

export type ValueType = "fixed" | "percentage"

export type BillingDetails = {
  id: string
  label: string
  type: ValueType
  value: number
}

export type InvoiceDetails = {
  prefix: string
  serialNumber: string
  date: string
  dueDate: string
  currency: string
  billingDetails: BillingDetails[]

  taxRate: number
  discount: number
}

export type InvoiceTheme = {
  template: PdfThemeKey
  font: PdfFont
  mode: "light" | "dark"
  accentColor: string
}

export type InvoiceMetadata = {
  notes: string
  terms: string
  paymentDetails: CustomField[] // label/value pairs, same shape as company/client fields
}

export type Invoice = {
  theme: InvoiceTheme

  company: CompanyDetails
  client: ClientDetails
  invoice: InvoiceDetails

  items: InvoiceItem[]

  metadata: InvoiceMetadata
}
