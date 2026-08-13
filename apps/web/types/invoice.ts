export type InvoiceItem = {
  id: string
  description: string
  quantity: number
  price: number
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

export type InvoiceDetails = {
  number: string
  date: string
  dueDate: string
  currency: string
}

export type Invoice = {
  template: string
  font: string

  company: CompanyDetails
  client: ClientDetails
  invoice: InvoiceDetails

  items: InvoiceItem[]

  notes: string
}
