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
    const value = Number(detail.value)

    if (detail.type === "fixed") {
      return total + value
    }

    return total + subtotal * (value / 100)
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

export function formatCurrency(currency: string, value: number) {
  const formatted = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)

  // Adds a space after the symbol if none exists (e.g., "₹20,000.00" -> "₹ 20,000.00")
  return formatted.replace(/^(\D+)/, "$1 ").replace(/\s+/, " ")
}

export function formatDate(value: string) {
  if (!value) return ""

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return date.toLocaleDateString("en-IN")
}

export function numberToWords(value: number) {
  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ]

  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ]

  function convertBelowThousand(num: number): string {
    if (num === 0) return ""

    if (num < 20) {
      return ones[num] ?? ""
    }

    if (num < 100) {
      return `${tens[Math.floor(num / 10)]} ${ones[num % 10]}`.trim()
    }

    return `${ones[Math.floor(num / 100)]} Hundred ${convertBelowThousand(
      num % 100
    )}`.trim()
  }

  if (value === 0) return "Zero"

  const num = Math.floor(value)
  const parts: string[] = []

  const crore = Math.floor(num / 10000000)
  const lakh = Math.floor((num % 10000000) / 100000)
  const thousand = Math.floor((num % 100000) / 1000)
  const remaining = num % 1000

  if (crore) {
    parts.push(`${convertBelowThousand(crore)} Crore`)
  }

  if (lakh) {
    parts.push(`${convertBelowThousand(lakh)} Lakh`)
  }

  if (thousand) {
    parts.push(`${convertBelowThousand(thousand)} Thousand`)
  }

  if (remaining) {
    parts.push(convertBelowThousand(remaining))
  }

  return parts.join(" ")
}
