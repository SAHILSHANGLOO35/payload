import { Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer"

import type { Invoice } from "@/types/invoice"
import { pdfThemes } from "@/lib/invoice/pdf-theme"

type ApplePdfProps = {
  invoice: Invoice
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 48,
    paddingRight: 44,
    paddingBottom: 40,
    paddingLeft: 44,
    fontSize: 8,
    flexDirection: "column",
  },

  // ----------------------------------------------------------
  // Header
  // ----------------------------------------------------------

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 28,
  },

  headerLeft: {
    flexDirection: "column",
  },

  eyebrow: {
    fontSize: 7.5,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 4,
  },

  invoiceTitle: {
    fontSize: 28,
    fontWeight: 700,
    letterSpacing: -1,
  },

  logo: {
    width: 44,
    height: 44,
    objectFit: "contain",
  },

  // ----------------------------------------------------------
  // Key Details Strip
  // ----------------------------------------------------------

  metaBar: {
    flexDirection: "row",
    paddingBottom: 18,
    borderBottomWidth: 0.5,
  },

  metaItem: {
    width: "25%",
    flexDirection: "column",
    gap: 3,
  },

  metaLabel: {
    fontSize: 6.5,
    fontWeight: 500,
    letterSpacing: 0.2,
  },

  metaValue: {
    fontSize: 8,
    fontWeight: 600,
    letterSpacing: -0.2,
  },

  // ----------------------------------------------------------
  // Billing Columns
  // ----------------------------------------------------------

  billingSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 18,
    borderBottomWidth: 0.5,
  },

  billingColumn: {
    width: "48%",
    flexDirection: "column",
    gap: 3,
  },

  sectionLabel: {
    fontSize: 6.5,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 3,
  },

  partyName: {
    fontSize: 9,
    fontWeight: 600,
    letterSpacing: -0.2,
  },

  partyAddress: {
    fontSize: 7,
    lineHeight: 1.4,
    marginBottom: 3,
  },

  fieldRow: {
    flexDirection: "row",
    gap: 4,
    marginTop: 1,
  },

  fieldLabel: {
    fontSize: 6.5,
    fontWeight: 400,
  },

  fieldValue: {
    fontSize: 6.5,
    fontWeight: 500,
  },

  // ----------------------------------------------------------
  // Items Table
  // ----------------------------------------------------------

  itemsContainer: {
    marginTop: 12,
  },

  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 0.5,
  },

  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
  },

  itemColumn: {
    width: "56%",
    flexDirection: "column",
  },

  quantityColumn: {
    width: "10%",
    textAlign: "center",
  },

  priceColumn: {
    width: "17%",
    textAlign: "right",
  },

  totalColumn: {
    width: "17%",
    textAlign: "right",
  },

  tableHeaderText: {
    fontSize: 6.5,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },

  itemName: {
    fontSize: 8,
    fontWeight: 600,
    letterSpacing: -0.1,
  },

  itemDescription: {
    fontSize: 6.5,
    marginTop: 2,
    lineHeight: 1.3,
  },

  pageSpacer: {
    flexGrow: 1,
  },

  // ----------------------------------------------------------
  // Bottom Section
  // ----------------------------------------------------------

  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 0.5,
  },

  leftColumn: {
    width: "46%",
    flexDirection: "column",
    gap: 10,
  },

  infoBlock: {
    flexDirection: "column",
    gap: 2,
  },

  infoHeading: {
    fontSize: 6.5,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: 0.4,
    marginBottom: 2,
  },

  infoText: {
    fontSize: 6.5,
    lineHeight: 1.35,
  },

  rightColumn: {
    width: "48%",
    flexDirection: "column",
  },

  signatureBox: {
    alignItems: "flex-end",
    marginBottom: 12,
  },

  signatureLabel: {
    fontSize: 6,
    marginBottom: 3,
  },

  signatureImage: {
    width: 48,
    height: 48,
    objectFit: "contain",
  },

  totalsList: {
    flexDirection: "column",
    gap: 5,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalLabel: {
    fontSize: 7,
  },

  totalValue: {
    fontSize: 7,
    fontWeight: 500,
  },

  grandTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 0.5,
  },

  grandTotalLabel: {
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: -0.2,
  },

  grandTotalValue: {
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: -0.8,
  },

  wordsBlock: {
    marginTop: 6,
  },

  wordsLabel: {
    fontSize: 5.5,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },

  wordsValue: {
    fontSize: 6.5,
    marginTop: 2,
  },
})

// ============================================================
// Helpers
// ============================================================

function formatCurrency(currency: string, value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value)
}

function formatDate(value: string) {
  if (!value) return ""
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString("en-IN")
}

function calculateSubtotal(invoice: Invoice) {
  return invoice.items.reduce(
    (total, item) => total + item.quantity * item.unitPrice,
    0
  )
}

function calculateBillingDetails(invoice: Invoice, subtotal: number) {
  return invoice.invoice.billingDetails.reduce((total, detail) => {
    if (detail.type === "percentage") {
      return total + subtotal * (detail.value / 100)
    }
    return total + detail.value
  }, 0)
}

function numberToWords(value: number) {
  return value.toLocaleString("en-IN")
}

// ============================================================
// Apple PDF Component
// ============================================================

export default function ApplePdf({ invoice }: ApplePdfProps) {
  const theme = pdfThemes[invoice.theme.template] ?? pdfThemes.default

  const subtotal = calculateSubtotal(invoice)
  const tax = subtotal * (invoice.invoice.taxRate / 100)
  const billingTotal = calculateBillingDetails(invoice, subtotal)
  const total = subtotal + tax + billingTotal - invoice.invoice.discount

  const dynamicStyles = StyleSheet.create({
    page: {
      ...styles.page,
      backgroundColor: theme.page.background,
      color: theme.page.text,
      fontFamily: invoice.theme.font,
    },

    eyebrow: {
      ...styles.eyebrow,
      color: theme.accent,
    },

    invoiceTitle: {
      ...styles.invoiceTitle,
      color: theme.heading,
    },

    metaBar: {
      ...styles.metaBar,
      borderBottomColor: theme.border,
    },

    metaLabel: {
      ...styles.metaLabel,
      color: theme.mutedText,
    },

    metaValue: {
      ...styles.metaValue,
      color: theme.heading,
    },

    billingSection: {
      ...styles.billingSection,
      borderBottomColor: theme.border,
    },

    sectionLabel: {
      ...styles.sectionLabel,
      color: theme.mutedText,
    },

    partyName: {
      ...styles.partyName,
      color: theme.heading,
    },

    mutedText: {
      color: theme.mutedText,
    },

    tableHeader: {
      ...styles.tableHeader,
      borderBottomColor: theme.border,
    },

    tableHeaderText: {
      ...styles.tableHeaderText,
      color: theme.mutedText,
    },

    itemRow: {
      ...styles.itemRow,
      borderBottomColor: theme.border,
    },

    itemName: {
      ...styles.itemName,
      color: theme.heading,
    },

    bottomSection: {
      ...styles.bottomSection,
      borderTopColor: theme.border,
    },

    grandTotalRow: {
      ...styles.grandTotalRow,
      borderTopColor: theme.border,
    },

    grandTotalLabel: {
      ...styles.grandTotalLabel,
      color: theme.totalText,
    },

    grandTotalValue: {
      ...styles.grandTotalValue,
      color: theme.totalText,
    },
  })

  return (
    <Page size="A4" style={dynamicStyles.page}>
      {/* ================================================== */}
      {/* MINIMAL HEADER */}
      {/* ================================================== */}

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={dynamicStyles.eyebrow}>Invoice</Text>
          <Text style={dynamicStyles.invoiceTitle}>
            {invoice.invoice.prefix}-{invoice.invoice.serialNumber}
          </Text>
        </View>

        {invoice.company.logo && (
          <Image src={invoice.company.logo} style={styles.logo} />
        )}
      </View>

      {/* ================================================== */}
      {/* METADATA BAR */}
      {/* ================================================== */}

      <View style={dynamicStyles.metaBar}>
        <View style={styles.metaItem}>
          <Text style={dynamicStyles.metaLabel}>Serial Number</Text>
          <Text style={dynamicStyles.metaValue}>
            {invoice.invoice.serialNumber}
          </Text>
        </View>

        {invoice.invoice.date && (
          <View style={styles.metaItem}>
            <Text style={dynamicStyles.metaLabel}>Date Issued</Text>
            <Text style={dynamicStyles.metaValue}>
              {formatDate(invoice.invoice.date)}
            </Text>
          </View>
        )}

        {invoice.invoice.dueDate && (
          <View style={styles.metaItem}>
            <Text style={dynamicStyles.metaLabel}>Payment Due</Text>
            <Text style={dynamicStyles.metaValue}>
              {formatDate(invoice.invoice.dueDate)}
            </Text>
          </View>
        )}

        <View style={styles.metaItem}>
          <Text style={dynamicStyles.metaLabel}>Currency</Text>
          <Text style={dynamicStyles.metaValue}>
            {invoice.invoice.currency}
          </Text>
        </View>
      </View>

      {/* ================================================== */}
      {/* BILLED BY & BILLED TO */}
      {/* ================================================== */}

      <View style={dynamicStyles.billingSection}>
        {/* Billed By */}
        <View style={styles.billingColumn}>
          <Text style={dynamicStyles.sectionLabel}>From</Text>
          <Text style={dynamicStyles.partyName}>{invoice.company.name}</Text>
          <Text style={[styles.partyAddress, dynamicStyles.mutedText]}>
            {invoice.company.address}
          </Text>

          {invoice.company.fields.map((field) => (
            <View key={field.id} style={styles.fieldRow}>
              <Text style={[styles.fieldLabel, dynamicStyles.mutedText]}>
                {field.label}:
              </Text>
              <Text style={styles.fieldValue}>{field.value}</Text>
            </View>
          ))}
        </View>

        {/* Billed To */}
        <View style={styles.billingColumn}>
          <Text style={dynamicStyles.sectionLabel}>Billed To</Text>
          <Text style={dynamicStyles.partyName}>{invoice.client.name}</Text>
          <Text style={[styles.partyAddress, dynamicStyles.mutedText]}>
            {invoice.client.address}
          </Text>

          {invoice.client.fields.map((field) => (
            <View key={field.id} style={styles.fieldRow}>
              <Text style={[styles.fieldLabel, dynamicStyles.mutedText]}>
                {field.label}:
              </Text>
              <Text style={styles.fieldValue}>{field.value}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* ================================================== */}
      {/* ITEMS TABLE */}
      {/* ================================================== */}

      <View style={styles.itemsContainer}>
        <View fixed style={dynamicStyles.tableHeader}>
          <Text style={[styles.itemColumn, dynamicStyles.tableHeaderText]}>
            Item
          </Text>
          <Text style={[styles.quantityColumn, dynamicStyles.tableHeaderText]}>
            Qty
          </Text>
          <Text style={[styles.priceColumn, dynamicStyles.tableHeaderText]}>
            Price
          </Text>
          <Text style={[styles.totalColumn, dynamicStyles.tableHeaderText]}>
            Amount
          </Text>
        </View>

        {invoice.items.map((item) => (
          <View key={item.id} wrap={false} style={dynamicStyles.itemRow}>
            <View style={styles.itemColumn}>
              <Text style={dynamicStyles.itemName}>{item.name}</Text>
              {item.description && (
                <Text style={[styles.itemDescription, dynamicStyles.mutedText]}>
                  {item.description}
                </Text>
              )}
            </View>

            <Text style={styles.quantityColumn}>{item.quantity}</Text>

            <Text style={styles.priceColumn}>
              {formatCurrency(invoice.invoice.currency, item.unitPrice)}
            </Text>

            <Text style={styles.totalColumn}>
              {formatCurrency(
                invoice.invoice.currency,
                item.quantity * item.unitPrice
              )}
            </Text>
          </View>
        ))}
      </View>

      {/* Flexible Spacer */}
      <View style={styles.pageSpacer} />

      {/* ================================================== */}
      {/* BOTTOM SECTION */}
      {/* ================================================== */}

      <View wrap={false} style={dynamicStyles.bottomSection}>
        {/* Left Side: Metadata / Terms / Notes */}
        <View style={styles.leftColumn}>
          {invoice.metadata.paymentDetails.length > 0 && (
            <View style={styles.infoBlock}>
              <Text style={dynamicStyles.sectionLabel}>Payment Info</Text>
              {invoice.metadata.paymentDetails.map((field) => (
                <View key={field.id} style={styles.fieldRow}>
                  <Text style={[styles.fieldLabel, dynamicStyles.mutedText]}>
                    {field.label}:
                  </Text>
                  <Text style={styles.fieldValue}>{field.value}</Text>
                </View>
              ))}
            </View>
          )}

          {invoice.metadata.terms && (
            <View style={styles.infoBlock}>
              <Text style={dynamicStyles.sectionLabel}>Terms & Conditions</Text>
              <Text style={[styles.infoText, dynamicStyles.mutedText]}>
                {invoice.metadata.terms}
              </Text>
            </View>
          )}

          {invoice.metadata.notes && (
            <View style={styles.infoBlock}>
              <Text style={dynamicStyles.sectionLabel}>Notes</Text>
              <Text style={[styles.infoText, dynamicStyles.mutedText]}>
                {invoice.metadata.notes}
              </Text>
            </View>
          )}
        </View>

        {/* Right Side: Totals & Signature */}
        <View style={styles.rightColumn}>
          {invoice.company.signature && (
            <View style={styles.signatureBox}>
              <Text style={[styles.signatureLabel, dynamicStyles.mutedText]}>
                Authorized Signatory
              </Text>
              <Image
                src={invoice.company.signature}
                style={styles.signatureImage}
              />
            </View>
          )}

          <View style={styles.totalsList}>
            <View style={styles.totalRow}>
              <Text style={[styles.totalLabel, dynamicStyles.mutedText]}>
                Subtotal
              </Text>
              <Text style={styles.totalValue}>
                {formatCurrency(invoice.invoice.currency, subtotal)}
              </Text>
            </View>

            {invoice.invoice.billingDetails.map((detail) => (
              <View key={detail.id} style={styles.totalRow}>
                <Text style={[styles.totalLabel, dynamicStyles.mutedText]}>
                  {detail.label}
                </Text>
                <Text style={styles.totalValue}>
                  {detail.type === "percentage"
                    ? `${detail.value}%`
                    : formatCurrency(invoice.invoice.currency, detail.value)}
                </Text>
              </View>
            ))}

            {invoice.invoice.taxRate > 0 && (
              <View style={styles.totalRow}>
                <Text style={[styles.totalLabel, dynamicStyles.mutedText]}>
                  Tax ({invoice.invoice.taxRate}%)
                </Text>
                <Text style={styles.totalValue}>
                  {formatCurrency(invoice.invoice.currency, tax)}
                </Text>
              </View>
            )}

            {invoice.invoice.discount > 0 && (
              <View style={styles.totalRow}>
                <Text style={[styles.totalLabel, dynamicStyles.mutedText]}>
                  Discount
                </Text>
                <Text style={styles.totalValue}>
                  -
                  {formatCurrency(
                    invoice.invoice.currency,
                    invoice.invoice.discount
                  )}
                </Text>
              </View>
            )}
          </View>

          <View style={dynamicStyles.grandTotalRow}>
            <Text style={dynamicStyles.grandTotalLabel}>Total</Text>
            <Text style={dynamicStyles.grandTotalValue}>
              {formatCurrency(invoice.invoice.currency, total)}
            </Text>
          </View>

          <View style={styles.wordsBlock}>
            <Text style={[styles.wordsLabel, dynamicStyles.mutedText]}>
              Amount in words
            </Text>
            <Text style={[styles.wordsValue, dynamicStyles.mutedText]}>
              {numberToWords(total)}
            </Text>
          </View>
        </View>
      </View>
    </Page>
  )
}
