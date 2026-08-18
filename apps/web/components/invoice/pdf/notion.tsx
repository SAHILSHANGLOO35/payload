import { Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer"

import type { Invoice } from "@/types/invoice"
import { pdfThemes } from "@/lib/invoice/pdf-theme"

type NotionPdfProps = {
  invoice: Invoice
}

const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontSize: 8,
    flexDirection: "column",
    gap: 10,
  },

  // Notion Top Page Title Block
  titleBlock: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  titleLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  pageIcon: {
    fontSize: 20,
  },

  pageTitle: {
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: -0.4,
  },

  logo: {
    width: 36,
    height: 36,
    borderRadius: 4,
    objectFit: "contain",
  },

  // 4-Tile Database Property Matrix
  propertiesGrid: {
    flexDirection: "row",
    gap: 8,
  },

  propertyCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    gap: 3,
  },

  propertyLabel: {
    fontSize: 6.5,
    fontWeight: 500,
  },

  propertyValuePill: {
    alignSelf: "flex-start",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
    fontSize: 6.5,
    fontWeight: 600,
  },

  // Callout Bento Row (Billed By & Billed To)
  calloutRow: {
    flexDirection: "row",
    gap: 8,
  },

  calloutCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    gap: 3,
  },

  calloutHeader: {
    fontSize: 7,
    fontWeight: 600,
    textTransform: "uppercase",
    marginBottom: 2,
  },

  partyName: {
    fontSize: 8.5,
    fontWeight: 600,
  },

  partyAddress: {
    fontSize: 7,
    lineHeight: 1.3,
    marginBottom: 3,
  },

  fieldRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  fieldLabel: { fontSize: 6.5 },
  fieldValue: { fontSize: 6.5, fontWeight: 500 },

  // Items Database Board
  itemsBox: {
    borderWidth: 1,
    borderRadius: 6,
    overflow: "hidden",
    flexGrow: 1,
  },

  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderBottomWidth: 1,
  },

  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
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
    fontWeight: 500,
  },

  itemDesc: {
    fontSize: 6.5,
    marginTop: 2,
  },

  // Bottom Bento Deck
  bottomDeck: {
    flexDirection: "row",
    gap: 8,
  },

  deckCol: {
    flex: 1,
    gap: 8,
  },

  deckCard: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    gap: 3,
  },

  deckCardHeader: {
    fontSize: 7,
    fontWeight: 600,
    textTransform: "uppercase",
    marginBottom: 2,
  },

  deckBodyText: {
    fontSize: 6.5,
    lineHeight: 1.35,
  },

  signatureBox: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    alignItems: "flex-end",
  },

  signatureLabel: {
    fontSize: 6,
    marginBottom: 3,
  },

  signatureImage: {
    width: 44,
    height: 44,
    objectFit: "contain",
  },

  calculationDeck: {
    borderWidth: 1,
    borderRadius: 6,
    overflow: "hidden",
  },

  calcInner: {
    padding: 8,
    gap: 4,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  calcLabel: { fontSize: 7 },
  calcValue: { fontSize: 7, fontWeight: 500 },

  grandTotalRow: {
    paddingHorizontal: 8,
    paddingVertical: 7,
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
    fontSize: 12,
    fontWeight: 700,
  },

  wordsBox: {
    padding: 8,
    borderTopWidth: 1,
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

export default function NotionPdf({ invoice }: NotionPdfProps) {
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
    card: {
      borderColor: theme.border,
      backgroundColor: theme.panel,
    },
    box: {
      borderColor: theme.border,
      backgroundColor: theme.page.background,
    },
    pill: {
      backgroundColor: theme.page.background,
      color: theme.heading,
    },
    heading: { color: theme.heading },
    muted: { color: theme.mutedText },
    tableHeader: {
      backgroundColor: theme.panel,
      borderBottomColor: theme.border,
    },
    tableRow: {
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
      {/* Page Title Card */}
      <View style={[styles.titleBlock, dynamicStyles.card]}>
        <View style={styles.titleLeft}>
          <Text style={styles.pageIcon}>📄</Text>
          <Text style={[styles.pageTitle, dynamicStyles.heading]}>
            Invoice {invoice.invoice.prefix}-{invoice.invoice.serialNumber}
          </Text>
        </View>
        {invoice.company.logo && (
          <Image src={invoice.company.logo} style={styles.logo} />
        )}
      </View>

      {/* 4-Property Database Strip */}
      <View style={styles.propertiesGrid}>
        <View style={[styles.propertyCard, dynamicStyles.card]}>
          <Text style={[styles.propertyLabel, dynamicStyles.muted]}>
            # Serial
          </Text>
          <Text style={[styles.propertyValuePill, dynamicStyles.pill]}>
            {invoice.invoice.serialNumber}
          </Text>
        </View>
        {invoice.invoice.date && (
          <View style={[styles.propertyCard, dynamicStyles.card]}>
            <Text style={[styles.propertyLabel, dynamicStyles.muted]}>
              📅 Issued
            </Text>
            <Text style={[styles.propertyValuePill, dynamicStyles.pill]}>
              {formatDate(invoice.invoice.date)}
            </Text>
          </View>
        )}
        {invoice.invoice.dueDate && (
          <View style={[styles.propertyCard, dynamicStyles.card]}>
            <Text style={[styles.propertyLabel, dynamicStyles.muted]}>
              ⏰ Due
            </Text>
            <Text style={[styles.propertyValuePill, dynamicStyles.pill]}>
              {formatDate(invoice.invoice.dueDate)}
            </Text>
          </View>
        )}
        <View style={[styles.propertyCard, dynamicStyles.card]}>
          <Text style={[styles.propertyLabel, dynamicStyles.muted]}>
            💱 Currency
          </Text>
          <Text style={[styles.propertyValuePill, dynamicStyles.pill]}>
            {invoice.invoice.currency}
          </Text>
        </View>
      </View>

      {/* Callout Cards */}
      <View style={styles.calloutRow}>
        <View style={[styles.calloutCard, dynamicStyles.card]}>
          <Text style={[styles.calloutHeader, dynamicStyles.muted]}>
            👤 Issuer
          </Text>
          <Text style={[styles.partyName, dynamicStyles.heading]}>
            {invoice.company.name}
          </Text>
          <Text style={[styles.partyAddress, dynamicStyles.muted]}>
            {invoice.company.address}
          </Text>
          {invoice.company.fields.map((f) => (
            <View key={f.id} style={styles.fieldRow}>
              <Text style={[styles.fieldLabel, dynamicStyles.muted]}>
                {f.label}:
              </Text>
              <Text style={styles.fieldValue}>{f.value}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.calloutCard, dynamicStyles.card]}>
          <Text style={[styles.calloutHeader, dynamicStyles.muted]}>
            🎯 Recipient
          </Text>
          <Text style={[styles.partyName, dynamicStyles.heading]}>
            {invoice.client.name}
          </Text>
          <Text style={[styles.partyAddress, dynamicStyles.muted]}>
            {invoice.client.address}
          </Text>
          {invoice.client.fields.map((f) => (
            <View key={f.id} style={styles.fieldRow}>
              <Text style={[styles.fieldLabel, dynamicStyles.muted]}>
                {f.label}:
              </Text>
              <Text style={styles.fieldValue}>{f.value}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Inline Database Items Table */}
      <View style={[styles.itemsBox, dynamicStyles.box]}>
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
            Price
          </Text>
          <Text
            style={[styles.totalCol, styles.colTitle, dynamicStyles.heading]}
          >
            Total
          </Text>
        </View>
        {invoice.items.map((item) => (
          <View
            key={item.id}
            wrap={false}
            style={[styles.itemRow, dynamicStyles.tableRow]}
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

      {/* Bottom Bento Deck */}
      <View wrap={false} style={styles.bottomDeck}>
        <View style={styles.deckCol}>
          {invoice.metadata.paymentDetails.length > 0 && (
            <View style={[styles.deckCard, dynamicStyles.card]}>
              <Text style={[styles.deckCardHeader, dynamicStyles.muted]}>
                💳 Payment Info
              </Text>
              {invoice.metadata.paymentDetails.map((f) => (
                <View key={f.id} style={styles.fieldRow}>
                  <Text style={[styles.fieldLabel, dynamicStyles.muted]}>
                    {f.label}:
                  </Text>
                  <Text style={styles.fieldValue}>{f.value}</Text>
                </View>
              ))}
            </View>
          )}

          {invoice.metadata.terms && (
            <View style={[styles.deckCard, dynamicStyles.card]}>
              <Text style={[styles.deckCardHeader, dynamicStyles.muted]}>
                📌 Terms
              </Text>
              <Text style={[styles.deckBodyText, dynamicStyles.muted]}>
                {invoice.metadata.terms}
              </Text>
            </View>
          )}

          {invoice.metadata.notes && (
            <View style={[styles.deckCard, dynamicStyles.card]}>
              <Text style={[styles.deckCardHeader, dynamicStyles.muted]}>
                📝 Notes
              </Text>
              <Text style={[styles.deckBodyText, dynamicStyles.muted]}>
                {invoice.metadata.notes}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.deckCol}>
          {invoice.company.signature && (
            <View style={[styles.signatureBox, dynamicStyles.card]}>
              <Text style={[styles.signatureLabel, dynamicStyles.muted]}>
                Verified Authority
              </Text>
              <Image
                src={invoice.company.signature}
                style={styles.signatureImage}
              />
            </View>
          )}

          <View style={[styles.calculationDeck, dynamicStyles.box]}>
            <View style={styles.calcInner}>
              <View style={styles.rowBetween}>
                <Text style={[styles.calcLabel, dynamicStyles.muted]}>
                  Subtotal
                </Text>
                <Text style={styles.calcValue}>
                  {formatCurrency(invoice.invoice.currency, subtotal)}
                </Text>
              </View>

              {invoice.invoice.billingDetails.map((d) => (
                <View key={d.id} style={styles.rowBetween}>
                  <Text style={[styles.calcLabel, dynamicStyles.muted]}>
                    {d.label}
                  </Text>
                  <Text style={styles.calcValue}>
                    {d.type === "percentage"
                      ? `${d.value}%`
                      : formatCurrency(invoice.invoice.currency, d.value)}
                  </Text>
                </View>
              ))}

              {invoice.invoice.taxRate > 0 && (
                <View style={styles.rowBetween}>
                  <Text style={[styles.calcLabel, dynamicStyles.muted]}>
                    Tax ({invoice.invoice.taxRate}%)
                  </Text>
                  <Text style={styles.calcValue}>
                    {formatCurrency(invoice.invoice.currency, tax)}
                  </Text>
                </View>
              )}

              {invoice.invoice.discount > 0 && (
                <View style={styles.rowBetween}>
                  <Text style={[styles.calcLabel, dynamicStyles.muted]}>
                    Discount
                  </Text>
                  <Text style={styles.calcValue}>
                    -
                    {formatCurrency(
                      invoice.invoice.currency,
                      invoice.invoice.discount
                    )}
                  </Text>
                </View>
              )}
            </View>

            <View style={[styles.grandTotalRow, dynamicStyles.grandTotal]}>
              <Text style={[styles.grandTotalLabel, dynamicStyles.totalText]}>
                Total Amount
              </Text>
              <Text style={[styles.grandTotalValue, dynamicStyles.totalText]}>
                {formatCurrency(invoice.invoice.currency, total)}
              </Text>
            </View>

            <View style={[styles.wordsBox, { borderTopColor: theme.border }]}>
              <Text style={[styles.wordsLabel, dynamicStyles.muted]}>
                In words
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
