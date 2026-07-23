export interface InvoiceCompanyDetailsMetadataInput {
  label: string
  value: string
}

export interface InvoiceClientDetailsMetadataInput {
  label: string
  value: string
}

export interface InvoiceCompanyDetailsInput {
  name: string
  address: string
  logo?: string
  signature?: string
  metadata?: InvoiceCompanyDetailsMetadataInput[]
}

export interface InvoiceClientDetailsInput {
  name: string
  address: string
  metadata?: InvoiceClientDetailsMetadataInput[]
}

export interface InvoiceBillingDetailInput {
  label: string
  type: "fixed" | "percentage"
  value: number
}

export interface InvoiceDetailsInput {
  theme: Record<string, unknown>
  currency: string
  prefix: string
  serialNumber: string
  date: string // ISO string
  dueDate: string // ISO string
  billingDetails?: InvoiceBillingDetailInput[]
}

export interface InvoiceItemInput {
  name: string
  description: string
  quantity: number
  unitPrice: number
}

export interface InvoicePaymentDetailInput {
  label: string
  value: string
}

export interface InvoiceMetadataInput {
  notes?: string
  terms?: string
  paymentDetails?: InvoicePaymentDetailInput[]
}

export interface SaveInvoiceBody {
  companyDetails?: InvoiceCompanyDetailsInput
  clientDetails?: InvoiceClientDetailsInput
  invoiceDetails?: InvoiceDetailsInput
  items?: InvoiceItemInput[]
  metadata?: InvoiceMetadataInput
}
