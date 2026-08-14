import type { Invoice } from "@/types/invoice"

export const defaultInvoice: Invoice = {
  theme: {
    template: "default",
    font: "Inter",
  },

  company: {
    logo: null,
    signature: null,
    name: "Payload Tech",
    address: "7th Floor Aerocity, New Delhi, India",
    fields: [],
  },

  client: {
    name: "Brad Pitt",
    address: "123, Los Feliz, Los Angeles",
    fields: [],
  },

  invoice: {
    prefix: "Invoice INV-",
    serialNumber: "007",
    date: "",
    dueDate: "",
    currency: "INR",
    billingDetails: [],
  },

  items: [
    {
      id: crypto.randomUUID(),
      name: "",
      description: "",
      quantity: 1,
      unitPrice: 0,
    },
  ],

  metadata: {
    notes: "",
    terms: "",
    paymentDetails: [],
  },
}
