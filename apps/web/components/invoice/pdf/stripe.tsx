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
    gap: 10,
  },

  // Hero Bento Module
  heroTile: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  heroLeft: {
    gap: 3,
  },

  brandBadge: {
    fontSize: 7,
    fontWeight: 600,
    textTransform: "uppercase",
  },

  invoiceId: {
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: -0.5,
  },

  kpiBlock: {
    alignItems: "flex-end",
    gap: 2,
  },

  kpiLabel: {
    fontSize: 6.5,
    fontWeight: 600,
    textTransform: "uppercase",
  },

  kpiValue: {
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: -0.6,
  },

  // 3-Column Info Module
  infoRow: {
    flexDirection: "row",
    gap: 8,
  },

  infoCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    gap: 3,
  },

  infoCardHeader: {
    fontSize: 6.5,
    fontWeight: 600,
    textTransform: "uppercase",
    marginBottom: 2,
  },

  cardMainText: {
    fontSize: 8.5,
    fontWeight: 600,
  },

  cardSubText: {
    fontSize: 7,
    lineHeight: 1.3,
  },

  fieldRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 1,
  },

  logoThumb: {
    width: 40,
    height: 40,
    objectFit: "contain",
    alignSelf: "flex-end",
  },

  // Items Card
  itemsBox: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
    flexGrow: 1,
  },

  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
  },

  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderBottomWidth: 1,
  },

  itemCol: { width: "55%" },
  qtyCol: { width: "10%", textAlign: "center" },
  priceCol: { width: "17.5%", textAlign: "right" },
  totalCol: { width: "17.5%", textAlign: "right" },

  colTitle: {
    fontSize: 6.5,
    fontWeight: 600,
    textTransform: "uppercase",
  },

  itemName: {
    fontSize: 8,
    fontWeight: 600,
  },

  itemDesc: {
    fontSize: 6.5,
    marginTop: 1.5,
  },

  // Bottom 2-Panel Bento
  bottomSection: {
    flexDirection: "row",
    gap: 10,
  },

  bottomLeftStack: {
    flex: 1,
    gap: 8,
  },

  notesCard: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    gap: 4,
  },

  notesTitle: {
    fontSize: 6.5,
    fontWeight: 600,
    textTransform: "uppercase",
  },

  notesText: {
    fontSize: 6.5,
    lineHeight: 1.35,
  },

  bottomRightStack: {
    flex: 1,
    gap: 8,
  },

  signatureCard: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    alignItems: "flex-end",
  },

  signatureLabel: {
    fontSize: 6,
    marginBottom: 2,
  },

  signatureImage: {
    width: 44,
    height: 44,
    objectFit: "contain",
  },

  summaryCard: {
    borderWidth: 1,
    borderRadius: 6,
    overflow: "hidden",
  },

  summaryInner: {
    padding: 10,
    gap: 4,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalLabel: { fontSize: 7 },
  totalValue: { fontSize: 7, fontWeight: 500 },

  grandTotalBox: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  grandTotalLabel: {
    fontSize: 8.5,
    fontWeight: 600,
  },

  grandTotalValue: {
    fontSize: 13,
    fontWeight: 700,
  },

  wordsBox: {
    paddingHorizontal: 10,
    paddingBottom: 8,
    paddingTop: 4,
  },

  wordsLabel: {
    fontSize: 5.5,
    textTransform: "uppercase",
  },

  wordsText: {
    fontSize: 6.5,
    marginTop: 1,
  },
})

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
    (acc, item) => acc + item.quantity * item.unitPrice,
    0
  )
}

function calculateBillingDetails(invoice: Invoice, subtotal: number) {
  return invoice.invoice.billingDetails.reduce((acc, detail) => {
    return (
      acc +
      (detail.type === "percentage"
        ? subtotal * (detail.value / 100)
        : detail.value)
    )
  }, 0)
}

function numberToWords(value: number) {
  return value.toLocaleString("en-IN")
}

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
    tile: {
      borderColor: theme.border,
      backgroundColor: theme.page.background,
    },
    heroPanel: {
      backgroundColor: theme.panel,
      borderColor: theme.border,
    },
    heading: { color: theme.heading },
    muted: { color: theme.mutedText },
    accent: { color: theme.accent },
    tableHeader: {
      backgroundColor: theme.tableHeader,
      borderBottomColor: theme.border,
    },
    itemRow: {
      borderBottomColor: theme.border,
    },
    grandTotal: {
      backgroundColor: theme.panel,
      borderTopColor: theme.border,
    },
    totalText: { color: theme.totalText },
  })

  return (
    <Page size="A4" style={dynamicStyles.page}>
      {/* Hero Bento Banner */}
      <View style={[styles.heroTile, dynamicStyles.heroPanel]}>
        <View style={styles.heroLeft}>
          <Text style={[styles.brandBadge, dynamicStyles.accent]}>
            {invoice.company.name}
          </Text>
          <Text style={[styles.invoiceId, dynamicStyles.heading]}>
            Invoice {invoice.invoice.prefix}-{invoice.invoice.serialNumber}
          </Text>
        </View>

        <View style={styles.kpiBlock}>
          <Text style={[styles.kpiLabel, dynamicStyles.muted]}>
            Total Amount Due
          </Text>
          <Text style={[styles.kpiValue, dynamicStyles.heading]}>
            {formatCurrency(invoice.invoice.currency, total)}
          </Text>
        </View>
      </View>

      {/* 3-Card Entity Matrix */}
      <View style={styles.infoRow}>
        <View style={[styles.infoCard, dynamicStyles.tile]}>
          <Text style={[styles.infoCardHeader, dynamicStyles.muted]}>
            Billed To
          </Text>
          <Text style={[styles.cardMainText, dynamicStyles.heading]}>
            {invoice.client.name}
          </Text>
          <Text style={[styles.cardSubText, dynamicStyles.muted]}>
            {invoice.client.address}
          </Text>
          {invoice.client.fields.map((f) => (
            <View key={f.id} style={styles.fieldRow}>
              <Text style={[styles.cardSubText, dynamicStyles.muted]}>
                {f.label}
              </Text>
              <Text style={styles.cardSubText}>{f.value}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.infoCard, dynamicStyles.tile]}>
          <Text style={[styles.infoCardHeader, dynamicStyles.muted]}>
            Timeline & Terms
          </Text>
          <View style={styles.fieldRow}>
            <Text style={[styles.cardSubText, dynamicStyles.muted]}>
              Serial
            </Text>
            <Text style={[styles.cardSubText, dynamicStyles.heading]}>
              {invoice.invoice.serialNumber}
            </Text>
          </View>
          {invoice.invoice.date && (
            <View style={styles.fieldRow}>
              <Text style={[styles.cardSubText, dynamicStyles.muted]}>
                Issued
              </Text>
              <Text style={styles.cardSubText}>
                {formatDate(invoice.invoice.date)}
              </Text>
            </View>
          )}
          {invoice.invoice.dueDate && (
            <View style={styles.fieldRow}>
              <Text style={[styles.cardSubText, dynamicStyles.muted]}>Due</Text>
              <Text style={styles.cardSubText}>
                {formatDate(invoice.invoice.dueDate)}
              </Text>
            </View>
          )}
          <View style={styles.fieldRow}>
            <Text style={[styles.cardSubText, dynamicStyles.muted]}>
              Currency
            </Text>
            <Text style={styles.cardSubText}>{invoice.invoice.currency}</Text>
          </View>
        </View>

        <View style={[styles.infoCard, dynamicStyles.tile]}>
          <Text style={[styles.infoCardHeader, dynamicStyles.muted]}>
            Issuer Details
          </Text>
          <Text style={[styles.cardMainText, dynamicStyles.heading]}>
            {invoice.company.name}
          </Text>
          {invoice.company.logo ? (
            <Image src={invoice.company.logo} style={styles.logoThumb} />
          ) : (
            <Text style={[styles.cardSubText, dynamicStyles.muted]}>
              {invoice.company.address}
            </Text>
          )}
        </View>
      </View>

      {/* Items Container Module */}
      <View style={[styles.itemsBox, dynamicStyles.tile]}>
        <View fixed style={[styles.tableHeader, dynamicStyles.tableHeader]}>
          <Text
            style={[styles.itemCol, styles.colTitle, dynamicStyles.heading]}
          >
            Item
          </Text>
          <Text style={[styles.qtyCol, styles.colTitle, dynamicStyles.heading]}>
            Qty
          </Text>
          <Text
            style={[styles.priceCol, styles.colTitle, dynamicStyles.heading]}
          >
            Unit Price
          </Text>
          <Text
            style={[styles.totalCol, styles.colTitle, dynamicStyles.heading]}
          >
            Amount
          </Text>
        </View>
        {invoice.items.map((item, i) => (
          <View
            key={item.id}
            wrap={false}
            style={[
              styles.itemRow,
              dynamicStyles.itemRow,
              {
                backgroundColor:
                  i % 2 === 0 ? theme.page.background : theme.tableRow,
              },
            ]}
          >
            <View style={styles.itemCol}>
              <Text style={[styles.itemName, dynamicStyles.heading]}>
                {item.name}
              </Text>
              {item.description && (
                <Text style={[styles.itemDesc, dynamicStyles.muted]}>
                  {item.description}
                </Text>
              )}
            </View>
            <Text style={styles.qtyCol}>{item.quantity}</Text>
            <Text style={styles.priceCol}>
              {formatCurrency(invoice.invoice.currency, item.unitPrice)}
            </Text>
            <Text style={styles.totalCol}>
              {formatCurrency(
                invoice.invoice.currency,
                item.quantity * item.unitPrice
              )}
            </Text>
          </View>
        ))}
      </View>

      {/* Bottom Modules */}
      <View wrap={false} style={styles.bottomSection}>
        <View style={styles.bottomLeftStack}>
          {invoice.metadata.paymentDetails.length > 0 && (
            <View style={[styles.notesCard, dynamicStyles.tile]}>
              <Text style={[styles.notesTitle, dynamicStyles.muted]}>
                Payment Rail
              </Text>
              {invoice.metadata.paymentDetails.map((f) => (
                <View key={f.id} style={styles.fieldRow}>
                  <Text style={[styles.notesText, dynamicStyles.muted]}>
                    {f.label}:
                  </Text>
                  <Text style={styles.notesText}>{f.value}</Text>
                </View>
              ))}
            </View>
          )}

          {invoice.metadata.terms && (
            <View style={[styles.notesCard, dynamicStyles.tile]}>
              <Text style={[styles.notesTitle, dynamicStyles.muted]}>
                Terms & Conditions
              </Text>
              <Text style={[styles.notesText, dynamicStyles.muted]}>
                {invoice.metadata.terms}
              </Text>
            </View>
          )}

          {invoice.metadata.notes && (
            <View style={[styles.notesCard, dynamicStyles.tile]}>
              <Text style={[styles.notesTitle, dynamicStyles.muted]}>
                Client Notes
              </Text>
              <Text style={[styles.notesText, dynamicStyles.muted]}>
                {invoice.metadata.notes}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.bottomRightStack}>
          {invoice.company.signature && (
            <View style={[styles.signatureCard, dynamicStyles.tile]}>
              <Text style={[styles.signatureLabel, dynamicStyles.muted]}>
                Authorized Verification
              </Text>
              <Image
                src={invoice.company.signature}
                style={styles.signatureImage}
              />
            </View>
          )}

          <View style={[styles.summaryCard, dynamicStyles.tile]}>
            <View style={styles.summaryInner}>
              <View style={styles.rowBetween}>
                <Text style={[styles.totalLabel, dynamicStyles.muted]}>
                  Subtotal
                </Text>
                <Text style={styles.totalValue}>
                  {formatCurrency(invoice.invoice.currency, subtotal)}
                </Text>
              </View>

              {invoice.invoice.billingDetails.map((d) => (
                <View key={d.id} style={styles.rowBetween}>
                  <Text style={[styles.totalLabel, dynamicStyles.muted]}>
                    {d.label}
                  </Text>
                  <Text style={styles.totalValue}>
                    {d.type === "percentage"
                      ? `${d.value}%`
                      : formatCurrency(invoice.invoice.currency, d.value)}
                  </Text>
                </View>
              ))}

              {invoice.invoice.taxRate > 0 && (
                <View style={styles.rowBetween}>
                  <Text style={[styles.totalLabel, dynamicStyles.muted]}>
                    Tax ({invoice.invoice.taxRate}%)
                  </Text>
                  <Text style={styles.totalValue}>
                    {formatCurrency(invoice.invoice.currency, tax)}
                  </Text>
                </View>
              )}

              {invoice.invoice.discount > 0 && (
                <View style={styles.rowBetween}>
                  <Text style={[styles.totalLabel, dynamicStyles.muted]}>
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

            <View style={[styles.grandTotalBox, dynamicStyles.grandTotal]}>
              <Text style={[styles.grandTotalLabel, dynamicStyles.totalText]}>
                Final Amount
              </Text>
              <Text style={[styles.grandTotalValue, dynamicStyles.totalText]}>
                {formatCurrency(invoice.invoice.currency, total)}
              </Text>
            </View>

            <View style={styles.wordsBox}>
              <Text style={[styles.wordsLabel, dynamicStyles.muted]}>
                Amount in words
              </Text>
              <Text style={[styles.wordsText, dynamicStyles.muted]}>
                {numberToWords(total)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Page>
  )
}
