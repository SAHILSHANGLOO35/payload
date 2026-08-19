import { Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer"

import type { Invoice } from "@/types/invoice"
import { pdfThemes } from "@/lib/invoice/pdf-theme"

type StripePdfProps = {
  invoice: Invoice
}

const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontSize: 8,
    flexDirection: "column",
    gap: 12,
  },

  // ----------------------------------------------------------
  // Header Tile (Prefix & Serial)
  // ----------------------------------------------------------

  headerTile: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  invoiceTitle: {
    fontSize: 28,
    fontWeight: 600,
    letterSpacing: -1,
    lineHeight: 1,
  },

  invoiceSerial: {
    letterSpacing: -1,
  },

  // ----------------------------------------------------------
  // Details & Logo Row (Vercel Style in Bento Card)
  // ----------------------------------------------------------

  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
  },

  invoiceDetails: {
    flexDirection: "column",
    gap: 4,
    padding: 16,
    paddingRight: 32,
    borderRightWidth: 1,
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  detailLabel: {
    minWidth: 90,
    fontSize: 7,
    fontWeight: 500,
  },

  detailValue: {
    fontSize: 7,
    fontWeight: 400,
  },

  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderLeftWidth: 1,
    padding: 16,
  },

  logo: {
    width: 80,
    height: 80,
    objectFit: "contain",
  },

  // ----------------------------------------------------------
  // 2-Column Billing Modules (Billed To & Billed By)
  // ----------------------------------------------------------

  billingRow: {
    flexDirection: "row",
    gap: 8,
  },

  billingCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    gap: 4,
  },

  sectionTitle: {
    fontSize: 7,
    fontWeight: 600,
    textTransform: "uppercase",
    marginBottom: 2,
  },

  companyName: {
    fontSize: 9,
    fontWeight: 600,
    marginBottom: 2,
  },

  addressText: {
    fontSize: 7,
    fontWeight: 400,
    marginBottom: 4,
    lineHeight: 1.3,
  },

  fieldRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 1,
  },

  fieldLabel: {
    fontSize: 7,
    minWidth: 55,
  },

  fieldValue: {
    fontSize: 7,
    fontWeight: 400,
  },

  // ----------------------------------------------------------
  // Items Table Box
  // ----------------------------------------------------------

  itemsBox: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
    flexGrow: 1,
  },

  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },

  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    minHeight: 36,
  },

  itemColumn: {
    width: "60%",
    flexDirection: "column",
    justifyContent: "center",
  },

  quantityColumn: {
    width: "10%",
    textAlign: "center",
  },

  priceColumn: {
    width: "15%",
    textAlign: "right",
  },

  totalColumn: {
    width: "15%",
    textAlign: "right",
  },

  tableHeaderText: {
    fontSize: 8,
    fontWeight: 600,
    textTransform: "uppercase",
  },

  itemName: {
    fontSize: 8,
    fontWeight: 600,
  },

  itemDescription: {
    fontSize: 7,
    marginTop: 2,
  },

  monoText: {
    letterSpacing: -0.5,
  },

  // ----------------------------------------------------------
  // Bottom Modules (Metadata Left, Totals Right)
  // ----------------------------------------------------------

  bottomSection: {
    flexDirection: "row",
    gap: 8,
  },

  metadataColumn: {
    width: "50%",
    flexDirection: "column",
    gap: 8,
  },

  notesCard: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    gap: 4,
  },

  metadataTitle: {
    fontSize: 7,
    fontWeight: 600,
    textTransform: "uppercase",
    marginBottom: 2,
  },

  metadataBody: {
    fontSize: 7,
    fontWeight: 400,
    lineHeight: 1.3,
  },

  totalsColumn: {
    width: "50%",
    flexDirection: "column",
    gap: 8,
  },

  signatureContainer: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    alignItems: "flex-end",
  },

  signature: {
    width: 64,
    height: 64,
    objectFit: "cover",
  },

  totalsBreakdownCard: {
    borderWidth: 1,
    borderRadius: 6,
    overflow: "hidden",
  },

  totalsBreakdown: {
    flexDirection: "column",
    gap: 4,
    padding: 12,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalLabel: {
    fontSize: 7,
    fontWeight: 400,
  },

  totalValue: {
    fontSize: 7,
    letterSpacing: -0.5,
  },

  grandTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    padding: 12,
  },

  grandTotalLabel: {
    fontSize: 9,
    fontWeight: 600,
  },

  grandTotalValue: {
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: -0.5,
  },

  wordsContainer: {
    flexDirection: "column",
    gap: 2,
    borderTopWidth: 1,
    padding: 12,
  },

  wordsLabel: {
    fontSize: 6,
    fontWeight: 400,
    textTransform: "uppercase",
  },

  words: {
    fontSize: 7,
    fontWeight: 400,
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
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("en-IN")
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
// Stripe PDF Component
// ============================================================

export default function StripePdf({ invoice }: StripePdfProps) {
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

    headerTile: {
      ...styles.headerTile,
      borderColor: theme.border,
      backgroundColor: theme.panel ?? theme.page.background,
    },

    invoiceTitle: {
      ...styles.invoiceTitle,
      color: theme.heading,
    },

    invoiceSerial: {
      ...styles.invoiceSerial,
      color: theme.accent ?? theme.heading,
    },

    detailsRow: {
      ...styles.detailsRow,
      borderColor: theme.border,
      backgroundColor: theme.page.background,
    },

    invoiceDetails: {
      ...styles.invoiceDetails,
      borderRightColor: theme.border,
    },

    logoContainer: {
      ...styles.logoContainer,
      borderLeftColor: theme.border,
    },

    tile: {
      borderColor: theme.border,
      backgroundColor: theme.page.background,
    },

    sectionTitle: {
      ...styles.sectionTitle,
      color: theme.mutedText,
    },

    companyName: {
      ...styles.companyName,
      color: theme.heading,
    },

    addressText: {
      ...styles.addressText,
      color: theme.mutedText,
    },

    fieldLabel: {
      ...styles.fieldLabel,
      color: theme.mutedText,
    },

    fieldValue: {
      ...styles.fieldValue,
      color: theme.page.text,
    },

    detailLabel: {
      ...styles.detailLabel,
      color: theme.mutedText,
    },

    detailValue: {
      ...styles.detailValue,
      color: theme.page.text,
    },

    tableHeader: {
      ...styles.tableHeader,
      backgroundColor: theme.tableHeader,
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

    itemDescription: {
      ...styles.itemDescription,
      color: theme.mutedText,
    },

    monoText: {
      ...styles.monoText,
      color: theme.page.text,
    },

    metadataTitle: {
      ...styles.metadataTitle,
      color: theme.heading,
    },

    metadataBody: {
      ...styles.metadataBody,
      color: theme.mutedText,
    },

    signatureContainer: {
      ...styles.signatureContainer,
      borderColor: theme.border,
      backgroundColor: theme.page.background,
    },

    totalsBreakdownCard: {
      ...styles.totalsBreakdownCard,
      borderColor: theme.border,
      backgroundColor: theme.page.background,
    },

    totalLabel: {
      ...styles.totalLabel,
      color: theme.mutedText,
    },

    totalValue: {
      ...styles.totalValue,
      color: theme.page.text,
    },

    grandTotal: {
      ...styles.grandTotal,
      borderTopColor: theme.border,
      backgroundColor: theme.totalBackground ?? theme.panel,
    },

    grandTotalLabel: {
      ...styles.grandTotalLabel,
      color: theme.totalText ?? theme.heading,
    },

    grandTotalValue: {
      ...styles.grandTotalValue,
      color: theme.totalText ?? theme.heading,
    },

    wordsContainer: {
      ...styles.wordsContainer,
      borderTopColor: theme.border,
    },

    wordsLabel: {
      ...styles.wordsLabel,
      color: theme.mutedText,
    },

    words: {
      ...styles.words,
      color: theme.page.text,
    },
  })

  return (
    <Page size="A4" style={dynamicStyles.page}>
      {/* ================================================== */}
      {/* 1. HEADER (Invoice Serial No Title) */}
      {/* ================================================== */}
      <View style={dynamicStyles.headerTile}>
        <Text style={dynamicStyles.invoiceTitle}>
          {invoice.invoice.prefix}
          <Text style={dynamicStyles.invoiceSerial}>
            {invoice.invoice.serialNumber}
          </Text>
        </Text>
      </View>

      {/* ================================================== */}
      {/* 2. DETAILS (Left) & LOGO (Right) - Vercel Style */}
      {/* ================================================== */}
      <View style={dynamicStyles.detailsRow}>
        <View style={dynamicStyles.invoiceDetails}>
          <View style={styles.detailRow}>
            <Text style={dynamicStyles.detailLabel}>Serial Number</Text>
            <Text style={dynamicStyles.detailValue}>
              {invoice.invoice.serialNumber}
            </Text>
          </View>

          {invoice.invoice.date && (
            <View style={styles.detailRow}>
              <Text style={dynamicStyles.detailLabel}>Date</Text>
              <Text style={dynamicStyles.detailValue}>
                {formatDate(invoice.invoice.date)}
              </Text>
            </View>
          )}

          {invoice.invoice.dueDate && (
            <View style={styles.detailRow}>
              <Text style={dynamicStyles.detailLabel}>Due Date</Text>
              <Text style={dynamicStyles.detailValue}>
                {formatDate(invoice.invoice.dueDate)}
              </Text>
            </View>
          )}

          <View style={styles.detailRow}>
            <Text style={dynamicStyles.detailLabel}>Currency</Text>
            <Text style={dynamicStyles.detailValue}>
              {invoice.invoice.currency}
            </Text>
          </View>
        </View>

        {invoice.company.logo && (
          <View style={dynamicStyles.logoContainer}>
            <Image src={invoice.company.logo} style={styles.logo} />
          </View>
        )}
      </View>

      {/* ================================================== */}
      {/* 3. 2-COLUMN BILLING (Billed By & Billed To) */}
      {/* ================================================== */}
      <View style={styles.billingRow}>
        {/* BILLED BY */}
        <View style={[styles.billingCard, dynamicStyles.tile]}>
          <Text style={dynamicStyles.sectionTitle}>Billed By</Text>
          <Text style={dynamicStyles.companyName}>{invoice.company.name}</Text>
          <Text style={dynamicStyles.addressText}>
            {invoice.company.address}
          </Text>

          {invoice.company.fields.map((field) => (
            <View key={field.id} style={styles.fieldRow}>
              <Text style={dynamicStyles.fieldLabel}>{field.label}</Text>
              <Text style={dynamicStyles.fieldValue}>{field.value}</Text>
            </View>
          ))}
        </View>

        {/* BILLED TO */}
        <View style={[styles.billingCard, dynamicStyles.tile]}>
          <Text style={dynamicStyles.sectionTitle}>Billed To</Text>
          <Text style={dynamicStyles.companyName}>{invoice.client.name}</Text>
          <Text style={dynamicStyles.addressText}>
            {invoice.client.address}
          </Text>

          {invoice.client.fields.map((field) => (
            <View key={field.id} style={styles.fieldRow}>
              <Text style={dynamicStyles.fieldLabel}>{field.label}</Text>
              <Text style={dynamicStyles.fieldValue}>{field.value}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* ================================================== */}
      {/* 4. ITEMS TABLE */}
      {/* ================================================== */}
      <View style={[styles.itemsBox, dynamicStyles.tile]}>
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
            Total
          </Text>
        </View>

        {invoice.items.map((item, index) => (
          <View
            key={item.id}
            wrap={false}
            style={[
              dynamicStyles.itemRow,
              {
                backgroundColor:
                  index % 2 === 0 ? theme.page.background : theme.tableRow,
              },
            ]}
          >
            <View style={styles.itemColumn}>
              <Text style={dynamicStyles.itemName}>{item.name}</Text>
              {item.description && (
                <Text style={dynamicStyles.itemDescription}>
                  {item.description}
                </Text>
              )}
            </View>

            <Text style={[styles.quantityColumn, dynamicStyles.monoText]}>
              {item.quantity}
            </Text>

            <Text style={[styles.priceColumn, dynamicStyles.monoText]}>
              {formatCurrency(invoice.invoice.currency, item.unitPrice)}
            </Text>

            <Text style={[styles.totalColumn, dynamicStyles.monoText]}>
              {formatCurrency(
                invoice.invoice.currency,
                item.quantity * item.unitPrice
              )}
            </Text>
          </View>
        ))}
      </View>

      {/* ================================================== */}
      {/* 5. BOTTOM SECTION (Metadata Left, Totals Right) */}
      {/* ================================================== */}
      <View wrap={false} style={styles.bottomSection}>
        {/* LEFT: Metadata */}
        <View style={styles.metadataColumn}>
          {invoice.metadata.paymentDetails.length > 0 && (
            <View style={[styles.notesCard, dynamicStyles.tile]}>
              <Text style={dynamicStyles.metadataTitle}>
                Payment Information
              </Text>
              {invoice.metadata.paymentDetails.map((field) => (
                <View key={field.id} style={styles.fieldRow}>
                  <Text style={dynamicStyles.fieldLabel}>{field.label}</Text>
                  <Text style={dynamicStyles.fieldValue}>{field.value}</Text>
                </View>
              ))}
            </View>
          )}

          {invoice.metadata.terms && (
            <View style={[styles.notesCard, dynamicStyles.tile]}>
              <Text style={dynamicStyles.metadataTitle}>Terms</Text>
              <Text style={dynamicStyles.metadataBody}>
                {invoice.metadata.terms}
              </Text>
            </View>
          )}

          {invoice.metadata.notes && (
            <View style={[styles.notesCard, dynamicStyles.tile]}>
              <Text style={dynamicStyles.metadataTitle}>Notes</Text>
              <Text style={dynamicStyles.metadataBody}>
                {invoice.metadata.notes}
              </Text>
            </View>
          )}
        </View>

        {/* RIGHT: Totals & Signature */}
        <View style={styles.totalsColumn}>
          {invoice.company.signature && (
            <View style={dynamicStyles.signatureContainer}>
              <Image src={invoice.company.signature} style={styles.signature} />
            </View>
          )}

          <View style={dynamicStyles.totalsBreakdownCard}>
            <View style={styles.totalsBreakdown}>
              <View style={styles.totalRow}>
                <Text style={dynamicStyles.totalLabel}>Subtotal</Text>
                <Text style={dynamicStyles.totalValue}>
                  {formatCurrency(invoice.invoice.currency, subtotal)}
                </Text>
              </View>

              {invoice.invoice.billingDetails.map((detail) => (
                <View key={detail.id} style={styles.totalRow}>
                  <Text style={dynamicStyles.totalLabel}>{detail.label}</Text>
                  <Text style={dynamicStyles.totalValue}>
                    {detail.type === "percentage"
                      ? `${detail.value}%`
                      : formatCurrency(invoice.invoice.currency, detail.value)}
                  </Text>
                </View>
              ))}

              {invoice.invoice.taxRate > 0 && (
                <View style={styles.totalRow}>
                  <Text style={dynamicStyles.totalLabel}>
                    Tax ({invoice.invoice.taxRate}%)
                  </Text>
                  <Text style={dynamicStyles.totalValue}>
                    {formatCurrency(invoice.invoice.currency, tax)}
                  </Text>
                </View>
              )}

              {invoice.invoice.discount > 0 && (
                <View style={styles.totalRow}>
                  <Text style={dynamicStyles.totalLabel}>Discount</Text>
                  <Text style={dynamicStyles.totalValue}>
                    -
                    {formatCurrency(
                      invoice.invoice.currency,
                      invoice.invoice.discount
                    )}
                  </Text>
                </View>
              )}
            </View>

            <View style={dynamicStyles.grandTotal}>
              <Text style={dynamicStyles.grandTotalLabel}>Total</Text>
              <Text style={dynamicStyles.grandTotalValue}>
                {formatCurrency(invoice.invoice.currency, total)}
              </Text>
            </View>

            <View style={dynamicStyles.wordsContainer}>
              <Text style={dynamicStyles.wordsLabel}>
                Invoice Total (in words)
              </Text>
              <Text style={dynamicStyles.words}>{numberToWords(total)}</Text>
            </View>
          </View>
        </View>
      </View>
    </Page>
  )
}
