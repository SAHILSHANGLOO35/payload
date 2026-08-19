import type { Invoice } from "@/types/invoice"

export const defaultInvoice: Invoice = {
  theme: {
    template: "default",
    font: "Inter",
    mode: "light",
    accentColor: "#635CFF",
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
    prefix: "Invoice INV",
    serialNumber: "007",
    date: "",
    dueDate: "",
    currency: "INR",
    billingDetails: [],
    taxRate: 0,
    discount: 0,
  },

  items: [
    {
      id: crypto.randomUUID(),
      name: "Item 1",
      description: "Description of Item 1",
      quantity: 1,
      unitPrice: 20000,
    },
  ],

  metadata: {
    notes: "Thanks for your business - we really appreciate it.",
    terms:
      "Payment is due within 15 days. Please reach out if anything looks off.",
    paymentDetails: [
      {
        id: crypto.randomUUID(),
        label: "HDFC Bank",
        value: "SN 11, Parliament Street, New Delhi, 110001",
      },
      {
        id: crypto.randomUUID(),
        label: "Account No.",
        value: "001234567890",
      },
    ],
  },
}
