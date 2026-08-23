import axios from "axios"
import type { Invoice, InvoiceStatus } from "@/types/invoice"

export const createInvoice = async () => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/invoices`,
    {},
    {
      withCredentials: true,
    }
  )

  return data.invoice
}

export const saveInvoice = async (id: string, invoice: Invoice) => {
  const payload = {
    companyDetails: {
      name: invoice.company.name,
      address: invoice.company.address,

      metadata: invoice.company.fields
        .filter((field) => field.label.trim() && field.value.trim())
        .map((field) => ({
          label: field.label,
          value: field.value,
        })),
    },

    clientDetails: {
      name: invoice.client.name,
      address: invoice.client.address,

      metadata: invoice.client.fields
        .filter((field) => field.label.trim() && field.value.trim())
        .map((field) => ({
          label: field.label,
          value: field.value,
        })),
    },

    invoiceDetails: {
      theme: invoice.theme,
      currency: invoice.invoice.currency,
      prefix: invoice.invoice.prefix,
      serialNumber: invoice.invoice.serialNumber,
      date: invoice.invoice.date,
      dueDate: invoice.invoice.dueDate,

      billingDetails: invoice.invoice.billingDetails
        .filter((detail) => detail.label.trim())
        .map((detail) => ({
          label: detail.label,
          type: detail.type,
          value: detail.value,
        })),
    },

    items: invoice.items.map((item) => ({
      name: item.name,
      description: item.description,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
    })),

    metadata: {
      notes: invoice.metadata.notes,
      terms: invoice.metadata.terms,

      paymentDetails: invoice.metadata.paymentDetails
        .filter((detail) => detail.label.trim() && detail.value.trim())
        .map((detail) => ({
          label: detail.label,
          value: detail.value,
        })),
    },
  }

  const { data } = await axios.put(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/invoices/${id}`,
    payload,
    {
      withCredentials: true,
    }
  )

  return data.invoice
}

export const updateInvoiceStatus = async (
  id: string,
  status: InvoiceStatus
) => {
  const { data } = await axios.put(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/invoices/${id}/status`,
    {
      status,
    },
    {
      withCredentials: true,
    }
  )

  return data.invoice
}

export const uploadInvoiceAssets = async (
  id: string,
  logo: File | null,
  signature: File | null
) => {
  if (!logo && !signature) {
    return null
  }

  const formData = new FormData()

  if (logo) {
    formData.append("logo", logo)
  }

  if (signature) {
    formData.append("signature", signature)
  }

  const { data } = await axios.put(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/invoices/${id}/assets`,
    formData,
    {
      withCredentials: true,
    }
  )

  return data.invoice
}
