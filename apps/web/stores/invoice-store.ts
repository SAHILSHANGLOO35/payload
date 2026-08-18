import { create } from "zustand"

import type {
  BillingDetails,
  CustomField,
  Invoice,
  InvoiceItem,
} from "@/types/invoice"
import { defaultInvoice } from "@/lib/invoice/default-values"
import { PdfFont, PdfThemeKey } from "@/lib/invoice/pdf-theme"

export type InvoiceStore = {
  invoice: Invoice

  setInvoice: (invoice: Invoice) => void

  // Company
  updateCompany: (data: Partial<Invoice["company"]>) => void
  addCompanyField: () => void
  updateCompanyField: (id: string, data: Partial<CustomField>) => void
  removeCompanyField: (id: string) => void

  // Client
  updateClient: (data: Partial<Invoice["client"]>) => void
  addClientField: () => void
  updateClientField: (id: string, data: Partial<CustomField>) => void
  removeClientField: (id: string) => void

  // Invoice
  updateInvoiceDetails: (data: Partial<Invoice["invoice"]>) => void
  addBillingDetails: () => void
  updateBillingDetail: (id: string, data: Partial<BillingDetails>) => void
  removeBillingDetail: (id: string) => void

  // Items
  addItem: () => void
  updateItem: (id: string, data: Partial<InvoiceItem>) => void
  removeItem: (id: string) => void

  // Metadata
  setNotes: (notes: string) => void
  setTerms: (terms: string) => void
  addPaymentDetail: () => void
  updatePaymentDetail: (id: string, data: Partial<CustomField>) => void
  removePaymentDetail: (id: string) => void

  // Theme
  setInvoiceTheme: (template: PdfThemeKey) => void

  // Font
  setInvoiceFont: (font: PdfFont) => void

  resetInvoice: () => void
}

export const useInvoiceStore = create<InvoiceStore>((set) => ({
  invoice: defaultInvoice,

  setInvoice: (invoice) => set({ invoice: invoice }),

  updateCompany: (data) =>
    set((state) => ({
      invoice: {
        ...state.invoice,
        company: {
          ...state.invoice.company,
          ...data,
        },
      },
    })),

  // Adding new company field on clicking 'Add New Field'
  addCompanyField: () =>
    set((state) => ({
      invoice: {
        ...state.invoice,

        company: {
          ...state.invoice.company,

          fields: [
            ...state.invoice.company.fields,
            {
              id: crypto.randomUUID(),
              label: "",
              value: "",
            },
          ],
        },
      },
    })),

  updateCompanyField: (id, data) =>
    set((state) => ({
      invoice: {
        ...state.invoice,

        company: {
          ...state.invoice.company,

          fields: state.invoice.company.fields.map((field) =>
            field.id === id
              ? {
                  ...field,
                  ...data,
                }
              : field
          ),
        },
      },
    })),

  removeCompanyField: (id) =>
    set((state) => ({
      invoice: {
        ...state.invoice,

        company: {
          ...state.invoice.company,

          fields: state.invoice.company.fields.filter(
            (field) => field.id !== id
          ),
        },
      },
    })),

  updateClient: (data) =>
    set((state) => ({
      invoice: {
        ...state.invoice,
        client: {
          ...state.invoice.client,
          ...data,
        },
      },
    })),

  // Adding new client field on clicking 'Add New Field'
  addClientField: () =>
    set((state) => ({
      invoice: {
        ...state.invoice,

        client: {
          ...state.invoice.client,
          fields: [
            ...state.invoice.client.fields,
            {
              id: crypto.randomUUID(),
              label: "",
              value: "",
            },
          ],
        },
      },
    })),

  updateClientField: (id, data) =>
    set((state) => ({
      invoice: {
        ...state.invoice,

        client: {
          ...state.invoice.client,
          fields: state.invoice.client.fields.map((field) =>
            field.id === id
              ? {
                  ...field,
                  ...data,
                }
              : {
                  ...field,
                }
          ),
        },
      },
    })),

  removeClientField: (id) =>
    set((state) => ({
      invoice: {
        ...state.invoice,
        client: {
          ...state.invoice.client,
          fields: state.invoice.client.fields.filter(
            (field) => field.id !== id
          ),
        },
      },
    })),

  updateInvoiceDetails: (data) =>
    set((state) => ({
      invoice: {
        ...state.invoice,
        invoice: {
          ...state.invoice.invoice,
          ...data,
        },
      },
    })),

  addBillingDetails: () =>
    set((state) => ({
      invoice: {
        ...state.invoice,
        invoice: {
          ...state.invoice.invoice,
          billingDetails: [
            ...state.invoice.invoice.billingDetails,
            {
              id: crypto.randomUUID(),
              label: "",
              type: "fixed",
              value: 0,
            },
          ],
        },
      },
    })),

  updateBillingDetail: (id, data) =>
    set((state) => ({
      invoice: {
        ...state.invoice,
        invoice: {
          ...state.invoice.invoice,
          billingDetails: state.invoice.invoice.billingDetails.map((bd) =>
            bd.id === id ? { ...bd, ...data } : bd
          ),
        },
      },
    })),

  removeBillingDetail: (id) =>
    set((state) => ({
      invoice: {
        ...state.invoice,
        invoice: {
          ...state.invoice.invoice,
          billingDetails: state.invoice.invoice.billingDetails.filter(
            (bd) => bd.id !== id
          ),
        },
      },
    })),

  addItem: () =>
    set((state) => ({
      invoice: {
        ...state.invoice,

        items: [
          ...state.invoice.items,

          {
            id: crypto.randomUUID(),
            name: "",
            description: "",
            quantity: 1,
            unitPrice: 0,
          },
        ],
      },
    })),

  updateItem: (id, data) =>
    set((state) => ({
      invoice: {
        ...state.invoice,

        items: state.invoice.items.map((item) =>
          item.id === id
            ? {
                ...item,
                ...data,
              }
            : item
        ),
      },
    })),

  removeItem: (id) =>
    set((state) => ({
      invoice: {
        ...state.invoice,

        items: state.invoice.items.filter((item) => item.id !== id),
      },
    })),

  setNotes: (notes) =>
    set((state) => ({
      invoice: {
        ...state.invoice,
        metadata: {
          ...state.invoice.metadata,
          notes,
        },
      },
    })),

  setTerms: (terms) =>
    set((state) => ({
      invoice: {
        ...state.invoice,
        metadata: { ...state.invoice.metadata, terms },
      },
    })),

  addPaymentDetail: () =>
    set((state) => ({
      invoice: {
        ...state.invoice,
        metadata: {
          ...state.invoice.metadata,
          paymentDetails: [
            ...state.invoice.metadata.paymentDetails,
            {
              id: crypto.randomUUID(),
              label: "",
              value: "",
            },
          ],
        },
      },
    })),

  updatePaymentDetail: (id, data) =>
    set((state) => ({
      invoice: {
        ...state.invoice,
        metadata: {
          ...state.invoice.metadata,
          paymentDetails: state.invoice.metadata.paymentDetails.map((field) =>
            field.id === id
              ? {
                  ...field,
                  ...data,
                }
              : field
          ),
        },
      },
    })),

  removePaymentDetail: (id) =>
    set((state) => ({
      invoice: {
        ...state.invoice,
        metadata: {
          ...state.invoice.metadata,
          paymentDetails: state.invoice.metadata.paymentDetails.filter(
            (field) => field.id !== id
          ),
        },
      },
    })),

  setInvoiceTheme: (template) =>
    set((state) => ({
      invoice: {
        ...state.invoice,

        theme: {
          ...state.invoice.theme,
          template,
        },
      },
    })),

  setInvoiceFont: (font) =>
    set((state) => ({
      invoice: {
        ...state.invoice,
        theme: {
          ...state.invoice.theme,
          font,
        },
      },
    })),

  resetInvoice: () =>
    set({
      invoice: defaultInvoice,
    }),
}))
