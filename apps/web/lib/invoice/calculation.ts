import { BillingDetails, Invoice, InvoiceItem } from "@/types/invoice"

export function calculateItemTotal(item: InvoiceItem) {
  return item.quantity * item.unitPrice
}

export function calculateSubtotal(items: InvoiceItem[]) {
  return items.reduce((total, item) => total + calculateItemTotal(item), 0)
}

export function calculateTax(subtotal: number, taxRate: number) {
  return subtotal * (taxRate / 100)
}

export const calculateDiscount = (subtotal: number, discount: number) => {
  return Math.min(discount, subtotal)
}

export const calculateBillingDetails = (
  subtotal: number,
  details: BillingDetails[]
) => {
  return details.reduce((total, detail) => {
    if (detail.type === "fixed") {
      return total + detail.value
    }

    return total + subtotal * (detail.value / 100)
  }, 0)
}

export const calculateInvoiceTotals = (invoice: Invoice) => {
  const subtotal = calculateSubtotal(invoice.items)

  const tax = calculateTax(subtotal, invoice.invoice.taxRate)

  const discount = calculateDiscount(subtotal, invoice.invoice.discount)

  const billingDetails = calculateBillingDetails(
    subtotal,
    invoice.invoice.billingDetails
  )

  const total = subtotal + tax + billingDetails - discount

  return {
    subtotal,
    tax,
    discount,
    billingDetails,
    total,
  }
}
