import type { Invoice } from "@/types/invoice"

export const defaultInvoice: Invoice = {
  template: "default",

  font: "Inter",

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
    number: "INV-0002",
    date: "",
    dueDate: "",
    currency: "USD",
  },

  items: [
    {
      id: crypto.randomUUID(),
      description: "",
      quantity: 1,
      price: 0,
    },
  ],

  notes: "",
}
