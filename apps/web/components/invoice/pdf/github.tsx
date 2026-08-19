import { Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer"

import type { Invoice } from "@/types/invoice"
import { pdfThemes } from "@/lib/invoice/pdf-theme"

type GithubPdfProps = {
  invoice: Invoice
}

const styles = StyleSheet.create({
  page: {
    fontSize: 8,
    flexDirection: "column",
  },

  // ----------------------------------------------------------
  // Header
  // ----------------------------------------------------------

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
  },

  headerLeft: {
    flexDirection: "column",
    gap: 6,
  },

  badge: {
    alignSelf: "flex-start",
    width: 52,
    height: 18,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 3,
    borderWidth: 1,
  },

  badgeText: {
    fontSize: 7.5,
    fontWeight: 600,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  invoiceTitle: {
    fontSize: 22,
    fontWeight: 600,
    letterSpacing: -0.5,
  },

  invoiceRef: {
    fontSize: 7,
    letterSpacing: 0.2,
  },

  logo: {
    width: 60,
    height: 60,
    objectFit: "contain",
    borderWidth: 1,
  },

  // ----------------------------------------------------------
  // Meta bar (issued / due / currency, file-path style)
  // ----------------------------------------------------------

  metaBar: {
    flexDirection: "row",
    alignItems: "center",
    height: 30,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },

  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginRight: 20,
  },

  metaDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },

  metaLabel: {
    fontSize: 6.5,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },

  metaValue: {
    fontSize: 7,
    fontWeight: 600,
  },

  // ----------------------------------------------------------
  // Billing
  // ----------------------------------------------------------

  billingRow: {
    flexDirection: "row",
    width: "100%",
    borderBottomWidth: 1,
  },

  billingPanel: {
    width: "50%",
    flexDirection: "column",
    gap: 3,
    padding: 16,
  },

  billingPanelRight: {
    width: "50%",
    flexDirection: "column",
    gap: 3,
    padding: 16,
    borderLeftWidth: 1,
  },

  sectionLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 5,
  },

  sectionMarker: {
    width: 6,
    height: 6,
    borderRadius: 1,
  },

  sectionTitle: {
    fontSize: 6.5,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  companyName: {
    fontSize: 9,
    fontWeight: 600,
    marginBottom: 2,
  },

  addressText: {
    fontSize: 7,
    lineHeight: 1.35,
    marginBottom: 4,
  },

  fieldRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 1,
  },

  fieldLabel: {
    fontSize: 6.5,
  },

  fieldValue: {
    fontSize: 6.5,
    fontWeight: 500,
  },

  // ----------------------------------------------------------
  // Items table (diff-list styled)
  // ----------------------------------------------------------

  itemsContainer: {
    flexGrow: 1,
  },

  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    height: 30,
    paddingHorizontal: 16,
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
    width: "16%",
    textAlign: "right",
  },

  totalColumn: {
    width: "16%",
    textAlign: "right",
  },

  tableHeaderText: {
    fontSize: 6.5,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },

  itemName: {
    fontSize: 8,
    fontWeight: 600,
  },

  itemDescription: {
    fontSize: 6.5,
    marginTop: 2,
    lineHeight: 1.3,
  },

  monoText: {
    letterSpacing: -0.3,
  },

  // ----------------------------------------------------------
  // Bottom section
  // ----------------------------------------------------------

  bottomSection: {
    flexDirection: "row",
    borderTopWidth: 1,
  },

  metadataColumn: {
    width: "50%",
    flexDirection: "column",
    borderRightWidth: 1,
  },

  metadataSection: {
    flexDirection: "column",
    gap: 2,
    padding: 16,
  },

  metadataDivider: {
    borderTopWidth: 1,
  },

  metadataBody: {
    fontSize: 6.5,
    marginTop: 4,
    lineHeight: 1.4,
  },

  totalsColumn: {
    width: "50%",
    flexDirection: "column",
  },

  // ----------------------------------------------------------
  // Signature
  // ----------------------------------------------------------

  signatureContainer: {
    alignItems: "flex-end",
    borderBottomWidth: 1,
    padding: 12,
  },

  signature: {
    width: 60,
    height: 60,
    objectFit: "cover",
  },

  // ----------------------------------------------------------
  // Totals breakdown
  // ----------------------------------------------------------

  totalsBreakdown: {
    flexDirection: "column",
    gap: 4,
    padding: 16,
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
    letterSpacing: -0.3,
  },

  // Styled like a diff "+" addition block
  grandTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 12,
    borderRadius: 4,
    borderWidth: 1,
  },

  grandTotalPrefix: {
    fontSize: 9,
    fontWeight: 700,
    marginRight: 6,
  },

  grandTotalLabel: {
    fontSize: 8,
    fontWeight: 600,
  },

  grandTotalValue: {
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: -0.3,
  },

  wordsContainer: {
    flexDirection: "column",
    gap: 2,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  wordsLabel: {
    fontSize: 6,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },

  words: {
    fontSize: 7,
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

  if (Number.isNaN(date.getTime())) {
    return value
  }

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

// Blends a hex color toward transparent-on-dark by returning an rgba string.
// Used to get a subtle "diff addition" tint behind the grand total.
function tint(hex: string, alpha: number) {
  const clean = hex.replace("#", "")
  const bigint = parseInt(clean, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

// ============================================================
// GitHub PDF Component
// ============================================================

export default function GithubPdf({ invoice }: GithubPdfProps) {
  const theme = pdfThemes[invoice.theme.template] ?? pdfThemes.default

  const subtotal = calculateSubtotal(invoice)
  const tax = subtotal * (invoice.invoice.taxRate / 100)
  const billingTotal = calculateBillingDetails(invoice, subtotal)
  const total = subtotal + tax + billingTotal - invoice.invoice.discount

  // Subtle alternate row fallback if theme.tableRow is not defined
  const alternateRowBg = tint(theme.page.text, 0.05)

  const dynamicStyles = StyleSheet.create({
    page: {
      ...styles.page,
      backgroundColor: theme.page.background,
      color: theme.page.text,
      fontFamily: invoice.theme.font,
      borderColor: theme.border,
      borderWidth: 1,
    },

    header: {
      ...styles.header,
      borderBottomColor: theme.border,
    },

    badge: {
      ...styles.badge,
      borderColor: theme.accent,
    },

    badgeText: {
      ...styles.badgeText,
      color: theme.accent,
    },

    invoiceTitle: {
      ...styles.invoiceTitle,
      color: theme.heading,
    },

    invoiceRef: {
      ...styles.invoiceRef,
      color: theme.mutedText,
    },

    logo: {
      ...styles.logo,
      borderColor: theme.border,
    },

    metaBar: {
      ...styles.metaBar,
      backgroundColor: theme.panel,
      borderBottomColor: theme.border,
    },

    metaDot: {
      ...styles.metaDot,
      backgroundColor: theme.accent,
    },

    metaLabel: {
      ...styles.metaLabel,
      color: theme.mutedText,
    },

    metaValue: {
      ...styles.metaValue,
      color: theme.page.text,
    },

    billingRow: {
      ...styles.billingRow,
      borderBottomColor: theme.border,
    },

    billingPanelRight: {
      ...styles.billingPanelRight,
      borderLeftColor: theme.border,
    },

    sectionMarker: {
      ...styles.sectionMarker,
      backgroundColor: theme.accent,
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
      borderLeftWidth: 2,
      borderLeftColor: theme.accent,
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

    bottomSection: {
      ...styles.bottomSection,
      borderTopColor: theme.border,
    },

    metadataColumn: {
      ...styles.metadataColumn,
      borderRightColor: theme.border,
    },

    metadataDivider: {
      ...styles.metadataDivider,
      borderTopColor: theme.border,
    },

    metadataTitle: {
      ...styles.sectionTitle,
      color: theme.mutedText,
    },

    metadataBody: {
      ...styles.metadataBody,
      color: theme.mutedText,
    },

    signatureContainer: {
      ...styles.signatureContainer,
      borderBottomColor: theme.border,
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
      backgroundColor: tint(theme.success, 0.12),
      borderColor: tint(theme.success, 0.4),
    },

    grandTotalPrefix: {
      ...styles.grandTotalPrefix,
      color: theme.success,
    },

    grandTotalLabel: {
      ...styles.grandTotalLabel,
      color: theme.totalText,
    },

    grandTotalValue: {
      ...styles.grandTotalValue,
      color: theme.success,
    },

    wordsLabel: {
      ...styles.wordsLabel,
      color: theme.mutedText,
    },

    words: {
      ...styles.words,
      color: theme.mutedText,
    },
  })

  return (
    <Page size="A4" style={dynamicStyles.page}>
      {/* ================================================== */}
      {/* HEADER */}
      {/* ================================================== */}

      <View style={dynamicStyles.header}>
        <View style={styles.headerLeft}>
          <View style={dynamicStyles.badge}>
            <Text style={dynamicStyles.badgeText}>Invoice</Text>
          </View>
          <Text style={dynamicStyles.invoiceTitle}>
            {invoice.invoice.prefix}
            {invoice.invoice.serialNumber}
          </Text>
          <Text style={dynamicStyles.invoiceRef}>
            ref: {invoice.invoice.prefix}
            {invoice.invoice.serialNumber}
          </Text>
        </View>

        {invoice.company.logo && (
          <Image src={invoice.company.logo} style={dynamicStyles.logo} />
        )}
      </View>

      {/* ================================================== */}
      {/* META BAR */}
      {/* ================================================== */}

      <View style={dynamicStyles.metaBar}>
        {invoice.invoice.date && (
          <View style={styles.metaItem}>
            <View style={dynamicStyles.metaDot} />
            <Text style={dynamicStyles.metaLabel}>Issued</Text>
            <Text style={dynamicStyles.metaValue}>
              {formatDate(invoice.invoice.date)}
            </Text>
          </View>
        )}

        {invoice.invoice.dueDate && (
          <View style={styles.metaItem}>
            <View style={dynamicStyles.metaDot} />
            <Text style={dynamicStyles.metaLabel}>Due</Text>
            <Text style={dynamicStyles.metaValue}>
              {formatDate(invoice.invoice.dueDate)}
            </Text>
          </View>
        )}

        <View style={styles.metaItem}>
          <View style={dynamicStyles.metaDot} />
          <Text style={dynamicStyles.metaLabel}>Currency</Text>
          <Text style={dynamicStyles.metaValue}>
            {invoice.invoice.currency}
          </Text>
        </View>
      </View>

      {/* ================================================== */}
      {/* BILLING */}
      {/* ================================================== */}

      <View style={dynamicStyles.billingRow}>
        {/* Billed By */}
        <View style={styles.billingPanel}>
          <View style={styles.sectionLabelRow}>
            <View style={dynamicStyles.sectionMarker} />
            <Text style={dynamicStyles.sectionTitle}>Billed By</Text>
          </View>
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

        {/* Billed To */}
        <View style={dynamicStyles.billingPanelRight}>
          <View style={styles.sectionLabelRow}>
            <View style={dynamicStyles.sectionMarker} />
            <Text style={dynamicStyles.sectionTitle}>Billed To</Text>
          </View>
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
            Rate
          </Text>
          <Text style={[styles.totalColumn, dynamicStyles.tableHeaderText]}>
            Amount
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
                  index % 2 === 0 ? theme.page.background : alternateRowBg,
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
      {/* BOTTOM SECTION */}
      {/* ================================================== */}

      <View wrap={false} style={dynamicStyles.bottomSection}>
        {/* Left: Metadata */}
        <View style={dynamicStyles.metadataColumn}>
          {invoice.metadata.paymentDetails.length > 0 && (
            <View style={styles.metadataSection}>
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
            <View
              style={[
                styles.metadataSection,
                invoice.metadata.paymentDetails.length > 0
                  ? dynamicStyles.metadataDivider
                  : {},
              ]}
            >
              <Text style={dynamicStyles.metadataTitle}>Terms</Text>
              <Text style={dynamicStyles.metadataBody}>
                {invoice.metadata.terms}
              </Text>
            </View>
          )}

          {invoice.metadata.notes && (
            <View
              style={[
                styles.metadataSection,
                invoice.metadata.paymentDetails.length > 0 ||
                invoice.metadata.terms
                  ? dynamicStyles.metadataDivider
                  : {},
              ]}
            >
              <Text style={dynamicStyles.metadataTitle}>Notes</Text>
              <Text style={dynamicStyles.metadataBody}>
                {invoice.metadata.notes}
              </Text>
            </View>
          )}
        </View>

        {/* Right: Signature & Totals */}
        <View style={styles.totalsColumn}>
          {invoice.company.signature && (
            <View style={dynamicStyles.signatureContainer}>
              <Image src={invoice.company.signature} style={styles.signature} />
            </View>
          )}

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

          {/* Grand total, styled like a GitHub diff "+" addition line */}
          <View style={dynamicStyles.grandTotal}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={dynamicStyles.grandTotalPrefix}>+</Text>
              <Text style={dynamicStyles.grandTotalLabel}>Total Due</Text>
            </View>
            <Text style={dynamicStyles.grandTotalValue}>
              {formatCurrency(invoice.invoice.currency, total)}
            </Text>
          </View>

          <View style={styles.wordsContainer}>
            <Text style={dynamicStyles.wordsLabel}>
              Invoice Total (in words)
            </Text>
            <Text style={dynamicStyles.words}>{numberToWords(total)}</Text>
          </View>
        </View>
      </View>
    </Page>
  )
}
