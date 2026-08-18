import { Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer"

import type { Invoice } from "@/types/invoice"
import { pdfThemes } from "@/lib/invoice/pdf-theme"

type GithubPdfProps = {
  invoice: Invoice
}

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 8,
    flexDirection: "column",
  },

  // ----------------------------------------------------------
  // Header / Repo-like Bar
  // ----------------------------------------------------------

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 16,
    borderBottomWidth: 1,
  },

  headerLeft: {
    flexDirection: "column",
    gap: 4,
  },

  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 6,
    fontWeight: 600,
    textTransform: "uppercase",
  },

  invoiceTitle: {
    fontSize: 18,
    fontWeight: 600,
    letterSpacing: -0.3,
  },

  logo: {
    width: 52,
    height: 52,
    borderRadius: 26,
    objectFit: "contain",
    borderWidth: 1,
  },

  // ----------------------------------------------------------
  // Metadata Bar (Commit-style info)
  // ----------------------------------------------------------

  metaBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    marginTop: 14,
    borderRadius: 6,
    borderWidth: 1,
  },

  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  metaLabel: {
    fontSize: 7,
    fontWeight: 500,
  },

  metaValue: {
    fontSize: 7,
    fontWeight: 600,
  },

  // ----------------------------------------------------------
  // Billing Grid
  // ----------------------------------------------------------

  billingGrid: {
    flexDirection: "row",
    gap: 12,
    marginTop: 14,
  },

  billingCard: {
    width: "50%",
    borderRadius: 6,
    borderWidth: 1,
    overflow: "hidden",
  },

  cardHeader: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderBottomWidth: 1,
  },

  cardTitle: {
    fontSize: 7,
    fontWeight: 600,
    textTransform: "uppercase",
  },

  cardBody: {
    padding: 10,
    flexDirection: "column",
    gap: 3,
  },

  partyName: {
    fontSize: 8.5,
    fontWeight: 600,
    marginBottom: 2,
  },

  partyAddress: {
    fontSize: 7,
    lineHeight: 1.3,
    marginBottom: 4,
  },

  fieldRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  fieldLabel: {
    fontSize: 6.5,
  },

  fieldValue: {
    fontSize: 6.5,
    fontWeight: 500,
  },

  // ----------------------------------------------------------
  // Items Table (GitHub File/Diff styled list)
  // ----------------------------------------------------------

  itemsContainer: {
    marginTop: 14,
    borderRadius: 6,
    borderWidth: 1,
    overflow: "hidden",
  },

  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderBottomWidth: 1,
  },

  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
  },

  itemColumn: {
    width: "55%",
    flexDirection: "column",
  },

  quantityColumn: {
    width: "12%",
    textAlign: "center",
  },

  priceColumn: {
    width: "16.5%",
    textAlign: "right",
  },

  totalColumn: {
    width: "16.5%",
    textAlign: "right",
  },

  tableHeaderText: {
    fontSize: 7,
    fontWeight: 600,
  },

  itemName: {
    fontSize: 7.5,
    fontWeight: 600,
  },

  itemDescription: {
    fontSize: 6.5,
    marginTop: 2,
  },

  pageSpacer: {
    flexGrow: 1,
  },

  // ----------------------------------------------------------
  // Bottom Section
  // ----------------------------------------------------------

  bottomSection: {
    flexDirection: "row",
    gap: 12,
    marginTop: 14,
  },

  notesColumn: {
    width: "50%",
    gap: 8,
  },

  notesCard: {
    borderRadius: 6,
    borderWidth: 1,
    overflow: "hidden",
  },

  notesBody: {
    padding: 8,
    fontSize: 6.5,
    lineHeight: 1.3,
  },

  totalsColumn: {
    width: "50%",
    flexDirection: "column",
    gap: 8,
  },

  signatureCard: {
    borderRadius: 6,
    borderWidth: 1,
    padding: 8,
    alignItems: "flex-end",
  },

  signatureLabel: {
    fontSize: 6,
    marginBottom: 4,
  },

  signatureImage: {
    width: 52,
    height: 52,
    borderRadius: 26,
    objectFit: "contain",
    borderWidth: 1,
  },

  totalsCard: {
    borderRadius: 6,
    borderWidth: 1,
    overflow: "hidden",
  },

  breakdownList: {
    padding: 10,
    flexDirection: "column",
    gap: 4,
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
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
  },

  grandTotalLabel: {
    fontSize: 8.5,
    fontWeight: 600,
  },

  grandTotalValue: {
    fontSize: 11,
    fontWeight: 600,
  },

  wordsFooter: {
    paddingHorizontal: 10,
    paddingBottom: 8,
    paddingTop: 4,
  },

  wordsLabel: {
    fontSize: 5.5,
    textTransform: "uppercase",
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
// GitHub PDF Component
// ============================================================

export default function GithubPdf({ invoice }: GithubPdfProps) {
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

    header: {
      ...styles.header,
      borderBottomColor: theme.border,
    },

    badge: {
      ...styles.badge,
      borderColor: theme.border,
      backgroundColor: theme.panel,
      color: theme.mutedText,
    },

    invoiceTitle: {
      ...styles.invoiceTitle,
      color: theme.heading,
    },

    logo: {
      ...styles.logo,
      borderColor: theme.border,
    },

    metaBar: {
      ...styles.metaBar,
      backgroundColor: theme.panel,
      borderColor: theme.border,
    },

    metaLabel: {
      ...styles.metaLabel,
      color: theme.mutedText,
    },

    metaValue: {
      ...styles.metaValue,
      color: theme.page.text,
    },

    card: {
      backgroundColor: theme.page.background,
      borderColor: theme.border,
    },

    cardHeader: {
      ...styles.cardHeader,
      backgroundColor: theme.panel,
      borderBottomColor: theme.border,
    },

    cardTitle: {
      ...styles.cardTitle,
      color: theme.heading,
    },

    partyName: {
      ...styles.partyName,
      color: theme.heading,
    },

    mutedText: {
      color: theme.mutedText,
    },

    tableContainer: {
      ...styles.itemsContainer,
      borderColor: theme.border,
    },

    tableHeader: {
      ...styles.tableHeader,
      backgroundColor: theme.tableHeader,
      borderBottomColor: theme.border,
    },

    tableHeaderText: {
      ...styles.tableHeaderText,
      color: theme.heading,
    },

    itemRow: {
      ...styles.itemRow,
      borderBottomColor: theme.border,
    },

    itemName: {
      ...styles.itemName,
      color: theme.heading,
    },

    grandTotalRow: {
      ...styles.grandTotalRow,
      borderTopColor: theme.border,
      backgroundColor: theme.panel,
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
      {/* HEADER / REPO-STYLE TITLE */}
      {/* ================================================== */}

      <View style={dynamicStyles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.badgeRow}>
            <Text style={dynamicStyles.badge}>Invoice</Text>
            <Text style={dynamicStyles.badge}>
              #{invoice.invoice.serialNumber}
            </Text>
          </View>
          <Text style={dynamicStyles.invoiceTitle}>
            {invoice.invoice.prefix}-{invoice.invoice.serialNumber}
          </Text>
        </View>

        {invoice.company.logo && (
          <Image src={invoice.company.logo} style={dynamicStyles.logo} />
        )}
      </View>

      {/* ================================================== */}
      {/* METADATA BAR (DATE, DUE DATE, CURRENCY) */}
      {/* ================================================== */}

      <View style={dynamicStyles.metaBar}>
        {invoice.invoice.date && (
          <View style={styles.metaItem}>
            <Text style={dynamicStyles.metaLabel}>Issued:</Text>
            <Text style={dynamicStyles.metaValue}>
              {formatDate(invoice.invoice.date)}
            </Text>
          </View>
        )}

        {invoice.invoice.dueDate && (
          <View style={styles.metaItem}>
            <Text style={dynamicStyles.metaLabel}>Due:</Text>
            <Text style={dynamicStyles.metaValue}>
              {formatDate(invoice.invoice.dueDate)}
            </Text>
          </View>
        )}

        <View style={styles.metaItem}>
          <Text style={dynamicStyles.metaLabel}>Currency:</Text>
          <Text style={dynamicStyles.metaValue}>
            {invoice.invoice.currency}
          </Text>
        </View>
      </View>

      {/* ================================================== */}
      {/* BILLING CARDS */}
      {/* ================================================== */}

      <View style={styles.billingGrid}>
        {/* Billed By */}
        <View style={[styles.billingCard, dynamicStyles.card]}>
          <View style={dynamicStyles.cardHeader}>
            <Text style={dynamicStyles.cardTitle}>Billed By</Text>
          </View>
          <View style={styles.cardBody}>
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
        </View>

        {/* Billed To */}
        <View style={[styles.billingCard, dynamicStyles.card]}>
          <View style={dynamicStyles.cardHeader}>
            <Text style={dynamicStyles.cardTitle}>Billed To</Text>
          </View>
          <View style={styles.cardBody}>
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
      </View>

      {/* ================================================== */}
      {/* ITEMS TABLE */}
      {/* ================================================== */}

      <View style={dynamicStyles.tableContainer}>
        <View fixed style={dynamicStyles.tableHeader}>
          <Text style={[styles.itemColumn, dynamicStyles.tableHeaderText]}>
            Item Description
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
                  index % 2 === 0 ? theme.page.background : theme.tableRow,
              },
            ]}
          >
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

      <View wrap={false} style={styles.bottomSection}>
        {/* Left Column: Metadata / Terms / Notes */}
        <View style={styles.notesColumn}>
          {invoice.metadata.paymentDetails.length > 0 && (
            <View style={[styles.notesCard, dynamicStyles.card]}>
              <View style={dynamicStyles.cardHeader}>
                <Text style={dynamicStyles.cardTitle}>Payment Details</Text>
              </View>
              <View style={styles.cardBody}>
                {invoice.metadata.paymentDetails.map((field) => (
                  <View key={field.id} style={styles.fieldRow}>
                    <Text style={[styles.fieldLabel, dynamicStyles.mutedText]}>
                      {field.label}:
                    </Text>
                    <Text style={styles.fieldValue}>{field.value}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {invoice.metadata.terms && (
            <View style={[styles.notesCard, dynamicStyles.card]}>
              <View style={dynamicStyles.cardHeader}>
                <Text style={dynamicStyles.cardTitle}>Terms</Text>
              </View>
              <Text style={[styles.notesBody, dynamicStyles.mutedText]}>
                {invoice.metadata.terms}
              </Text>
            </View>
          )}

          {invoice.metadata.notes && (
            <View style={[styles.notesCard, dynamicStyles.card]}>
              <View style={dynamicStyles.cardHeader}>
                <Text style={dynamicStyles.cardTitle}>Notes</Text>
              </View>
              <Text style={[styles.notesBody, dynamicStyles.mutedText]}>
                {invoice.metadata.notes}
              </Text>
            </View>
          )}
        </View>

        {/* Right Column: Signature & Totals */}
        <View style={styles.totalsColumn}>
          {invoice.company.signature && (
            <View style={[styles.signatureCard, dynamicStyles.card]}>
              <Text style={[styles.signatureLabel, dynamicStyles.mutedText]}>
                Authorized Signatory
              </Text>
              <Image
                src={invoice.company.signature}
                style={styles.signatureImage}
              />
            </View>
          )}

          <View style={[styles.totalsCard, dynamicStyles.card]}>
            <View style={styles.breakdownList}>
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
              <Text style={dynamicStyles.grandTotalLabel}>Total Due</Text>
              <Text style={dynamicStyles.grandTotalValue}>
                {formatCurrency(invoice.invoice.currency, total)}
              </Text>
            </View>

            <View style={styles.wordsFooter}>
              <Text style={[styles.wordsLabel, dynamicStyles.mutedText]}>
                Amount in Words
              </Text>
              <Text style={[styles.wordsValue, dynamicStyles.mutedText]}>
                {numberToWords(total)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Page>
  )
}
