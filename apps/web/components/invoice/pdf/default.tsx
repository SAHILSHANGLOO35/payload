import { Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer"

import type { Invoice } from "@/types/invoice"
import { pdfThemes } from "@/lib/invoice/pdf-theme"
import {
  calculateInvoiceTotals,
  calculateItemTotal,
  formatCurrency,
  formatDate,
  numberToWords,
} from "@/lib/invoice/calculation"

type DefaultPdfProps = {
  invoice: Invoice
}

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 8,
    flexDirection: "column",
  },

  // Header

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  headerLeft: {
    flexDirection: "column",
  },

  invoiceTitle: {
    fontSize: 22,
    fontWeight: 600,
    letterSpacing: -0.5,
  },

  invoiceDetails: {
    marginTop: 12,
    gap: 4,
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  detailLabel: {
    width: 72,
    fontSize: 7,
    fontWeight: 600,
  },

  detailValue: {
    fontSize: 7,
  },

  logo: {
    width: 62,
    height: 62,
    objectFit: "contain",
  },

  // Company / Client

  billingRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 22,
  },

  billingPanel: {
    width: "50%",
    paddingTop: 10,
    paddingRight: 11,
    paddingBottom: 10,
    paddingLeft: 11,
    borderRadius: 2,
  },

  sectionTitle: {
    fontSize: 8,
    fontWeight: 600,
    marginBottom: 6,
  },

  companyName: {
    fontSize: 8,
    fontWeight: 600,
    marginBottom: 3,
  },

  muted: {
    fontSize: 7,
  },

  fieldRow: {
    flexDirection: "row",
    gap: 4,
    marginTop: 3,
  },

  fieldLabel: {
    fontSize: 7,
    fontWeight: 600,
  },

  fieldValue: {
    fontSize: 7,
  },

  // Items

  itemsContainer: {
    marginTop: 20,
  },

  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 7,
    paddingRight: 8,
    paddingBottom: 7,
    paddingLeft: 8,
    borderRadius: 3,
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
    width: "17.5%",
    textAlign: "right",
  },

  totalColumn: {
    width: "17.5%",
    textAlign: "right",
  },

  tableHeaderText: {
    fontSize: 7,
    fontWeight: 600,
  },

  itemName: {
    fontSize: 8,
    fontWeight: 600,
  },

  itemDescription: {
    fontSize: 7,
    marginTop: 2,
  },

  // Spacer

  pageSpacer: {
    flexGrow: 1,
  },

  // Bottom

  bottomSection: {
    flexDirection: "row",
    gap: 35,
    marginTop: 18,
  },

  metadataColumn: {
    width: "50%",
    justifyContent: "flex-end",
    gap: 13,
  },

  metadataSection: {
    flexDirection: "column",
  },

  totalsColumn: {
    width: "50%",
    justifyContent: "flex-end",
  },

  // Signature

  signatureContainer: {
    alignItems: "flex-end",
    marginBottom: 9,
  },

  signatureVerified: {
    fontSize: 6,
    marginBottom: 4,
  },

  signature: {
    width: 58,
    height: 58,
    objectFit: "contain",
  },

  // Totals

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },

  totalLabel: {
    fontSize: 7,
    fontWeight: 500,
  },

  totalValue: {
    fontSize: 7,
  },

  grandTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 7,
    paddingTop: 8,
    borderTopWidth: 1,
  },

  grandTotalLabel: {
    fontSize: 10,
    fontWeight: 600,
  },

  grandTotalValue: {
    fontSize: 17,
    fontWeight: 500,
  },

  wordsLabel: {
    fontSize: 6,
    marginTop: 8,
  },

  words: {
    fontSize: 7,
    marginTop: 3,
  },
})

// Helpers

// Default PDF

export default function DefaultPdf({ invoice }: DefaultPdfProps) {
  const theme = pdfThemes[invoice.theme.template] ?? pdfThemes.default

  // Centralized totals.
  const { subtotal, tax, discount, total } = calculateInvoiceTotals(invoice)

  const dynamicStyles = StyleSheet.create({
    page: {
      ...styles.page,
      backgroundColor: theme.page.background,
      color: theme.page.text,
      fontFamily: invoice.theme.font,
    },

    header: {
      ...styles.header,
    },

    invoiceTitle: {
      ...styles.invoiceTitle,
      color: theme.accent,
    },

    detailLabel: {
      ...styles.detailLabel,
      color: theme.mutedText,
    },

    detailValue: {
      ...styles.detailValue,
      color: theme.page.text,
    },

    billingRow: {
      ...styles.billingRow,
    },

    billingPanel: {
      ...styles.billingPanel,
      backgroundColor: theme.panel,
    },

    sectionTitle: {
      ...styles.sectionTitle,
      color: theme.heading,
    },

    companyName: {
      ...styles.companyName,
      color: theme.page.text,
    },

    muted: {
      ...styles.muted,
      color: theme.mutedText,
    },

    fieldLabel: {
      ...styles.fieldLabel,
      color: theme.page.text,
    },

    fieldValue: {
      ...styles.fieldValue,
      color: theme.page.text,
    },

    tableHeader: {
      ...styles.tableHeader,
      backgroundColor: theme.tableHeader,
    },

    tableHeaderText: {
      ...styles.tableHeaderText,
      color: theme.page.text,
    },

    itemRow: {
      ...styles.itemRow,
      backgroundColor: theme.tableRow,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },

    itemName: {
      ...styles.itemName,
      color: theme.page.text,
    },

    itemDescription: {
      ...styles.itemDescription,
      color: theme.mutedText,
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
    },

    grandTotalLabel: {
      ...styles.grandTotalLabel,
      color: theme.totalText,
    },

    grandTotalValue: {
      ...styles.grandTotalValue,
      color: theme.totalText,
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
    <Page
      size="A4"
      style={{
        ...dynamicStyles.page,
        backgroundColor: theme.page.background,
        color: theme.page.text,
        fontFamily: invoice.theme.font,
      }}
    >
      {/* HEADER */}

      <View style={dynamicStyles.header}>
        <View style={styles.headerLeft}>
          <Text
            style={{
              ...styles.invoiceTitle,
              color: theme.accent,
            }}
          >
            {invoice.invoice.prefix}-{invoice.invoice.serialNumber}
          </Text>

          <View style={styles.invoiceDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Serial Number</Text>

              <Text
                style={{
                  ...styles.detailValue,
                  color: theme.mutedText,
                }}
              >
                {invoice.invoice.serialNumber}
              </Text>
            </View>

            {invoice.invoice.date && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Date</Text>

                <Text
                  style={{
                    ...styles.detailValue,
                    color: theme.mutedText,
                  }}
                >
                  {formatDate(invoice.invoice.date)}
                </Text>
              </View>
            )}

            {invoice.invoice.dueDate && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Due Date</Text>

                <Text
                  style={{
                    ...styles.detailValue,
                    color: theme.mutedText,
                  }}
                >
                  {formatDate(invoice.invoice.dueDate)}
                </Text>
              </View>
            )}

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Currency</Text>

              <Text
                style={{
                  ...styles.detailValue,
                  color: theme.mutedText,
                }}
              >
                {invoice.invoice.currency}
              </Text>
            </View>
          </View>
        </View>

        {invoice.company.logo && (
          <Image src={invoice.company.logo} style={styles.logo} />
        )}
      </View>

      {/* BILLING */}

      <View style={dynamicStyles.billingRow}>
        {/* Billed By */}

        <View
          style={{
            ...styles.billingPanel,
            backgroundColor: theme.panel,
          }}
        >
          <Text
            style={{
              ...styles.sectionTitle,
              color: theme.accent,
            }}
          >
            Billed By
          </Text>

          <Text
            style={{
              ...styles.companyName,
              color: theme.page.text,
            }}
          >
            {invoice.company.name}
          </Text>

          <Text
            style={{
              ...styles.muted,
              color: theme.mutedText,
            }}
          >
            {invoice.company.address}
          </Text>

          {invoice.company.fields.map((field) => (
            <View key={field.id} style={styles.fieldRow}>
              <Text
                style={{
                  ...styles.fieldLabel,
                  color: theme.page.text,
                }}
              >
                {field.label}
              </Text>

              <Text
                style={{
                  ...styles.fieldValue,
                  color: theme.mutedText,
                }}
              >
                {field.value}
              </Text>
            </View>
          ))}
        </View>

        {/* Billed To */}

        <View
          style={{
            ...styles.billingPanel,
            backgroundColor: theme.panel,
          }}
        >
          <Text
            style={{
              ...styles.sectionTitle,
              color: theme.accent,
            }}
          >
            Billed To
          </Text>

          <Text
            style={{
              ...styles.companyName,
              color: theme.page.text,
            }}
          >
            {invoice.client.name}
          </Text>

          <Text
            style={{
              ...styles.muted,
              color: theme.mutedText,
            }}
          >
            {invoice.client.address}
          </Text>

          {invoice.client.fields.map((field) => (
            <View key={field.id} style={styles.fieldRow}>
              <Text
                style={{
                  ...styles.fieldLabel,
                  color: theme.page.text,
                }}
              >
                {field.label}
              </Text>

              <Text
                style={{
                  ...styles.fieldValue,
                  color: theme.mutedText,
                }}
              >
                {field.value}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* ITEMS */}

      <View style={styles.itemsContainer}>
        <View
          style={{
            ...styles.tableHeader,
            backgroundColor: theme.tableHeader,
          }}
        >
          <Text
            style={{
              ...styles.itemColumn,
              ...styles.tableHeaderText,
              color: theme.page.background,
            }}
          >
            Item
          </Text>

          <Text
            style={{
              ...styles.quantityColumn,
              ...styles.tableHeaderText,
              color: theme.page.background,
            }}
          >
            Qty
          </Text>

          <Text
            style={{
              ...styles.priceColumn,
              ...styles.tableHeaderText,
              color: theme.page.background,
            }}
          >
            Price
          </Text>

          <Text
            style={{
              ...styles.totalColumn,
              ...styles.tableHeaderText,
              color: theme.page.background,
            }}
          >
            Total
          </Text>
        </View>

        {invoice.items.map((item, index) => (
          <View
            key={item.id}
            wrap={false}
            style={{
              ...styles.itemRow,
              backgroundColor:
                index % 2 === 0 ? theme.page.background : theme.tableRow,
              borderBottomWidth: 1,
              borderBottomColor: theme.border,
            }}
          >
            <View style={styles.itemColumn}>
              <Text
                style={{
                  ...styles.itemName,
                  color: theme.page.text,
                }}
              >
                {item.name}
              </Text>

              {item.description && (
                <Text
                  style={{
                    ...styles.itemDescription,
                    color: theme.mutedText,
                  }}
                >
                  {item.description}
                </Text>
              )}
            </View>

            <Text
              style={{
                ...styles.quantityColumn,
                color: theme.page.text,
              }}
            >
              {item.quantity}
            </Text>

            <Text
              style={{
                ...styles.priceColumn,
                color: theme.page.text,
              }}
            >
              {formatCurrency(invoice.invoice.currency, item.unitPrice)}
            </Text>

            <Text
              style={{
                ...styles.totalColumn,
                color: theme.page.text,
              }}
            >
              {formatCurrency(
                invoice.invoice.currency,
                calculateItemTotal(item)
              )}
            </Text>
          </View>
        ))}
      </View>

      {/* SPACER */}

      <View style={styles.pageSpacer} />

      {/* BOTTOM CONTENT */}

      <View wrap={false} style={styles.bottomSection}>
        {/* LEFT SIDE */}

        <View style={styles.metadataColumn}>
          {invoice.metadata.paymentDetails.length > 0 && (
            <View style={styles.metadataSection}>
              <Text
                style={{
                  ...styles.sectionTitle,
                  color: theme.accent,
                }}
              >
                Payment Information
              </Text>

              {invoice.metadata.paymentDetails.map((field) => (
                <View key={field.id} style={styles.fieldRow}>
                  <Text
                    style={{
                      ...styles.fieldLabel,
                      color: theme.page.text,
                    }}
                  >
                    {field.label}
                  </Text>

                  <Text
                    style={{
                      ...styles.fieldValue,
                      color: theme.mutedText,
                    }}
                  >
                    {field.value}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {invoice.metadata.terms && (
            <View style={styles.metadataSection}>
              <Text
                style={{
                  ...styles.sectionTitle,
                  color: theme.accent,
                }}
              >
                Terms
              </Text>

              <Text
                style={{
                  color: theme.mutedText,
                  fontSize: 7,
                  lineHeight: 1.4,
                }}
              >
                {invoice.metadata.terms}
              </Text>
            </View>
          )}

          {invoice.metadata.notes && (
            <View style={styles.metadataSection}>
              <Text
                style={{
                  ...styles.sectionTitle,
                  color: theme.accent,
                }}
              >
                Notes
              </Text>

              <Text
                style={{
                  color: theme.mutedText,
                  fontSize: 7,
                  lineHeight: 1.4,
                }}
              >
                {invoice.metadata.notes}
              </Text>
            </View>
          )}
        </View>

        {/* RIGHT SIDE */}

        <View style={styles.totalsColumn}>
          {/* Signature */}

          {invoice.company.signature && (
            <View style={styles.signatureContainer}>
              <Text
                style={{
                  ...styles.signatureVerified,
                  color: theme.mutedText,
                }}
              >
                Verified by {invoice.company.name}
              </Text>

              <Image src={invoice.company.signature} style={styles.signature} />
            </View>
          )}

          {/* Subtotal */}

          <View style={styles.totalRow}>
            <Text
              style={{
                ...styles.totalLabel,
                color: theme.page.text,
              }}
            >
              Subtotal
            </Text>

            <Text
              style={{
                ...styles.totalValue,
                color: theme.mutedText,
              }}
            >
              {formatCurrency(invoice.invoice.currency, subtotal)}
            </Text>
          </View>

          {/* Billing Details */}

          {invoice.invoice.billingDetails.map((detail) => (
            <View key={detail.id} style={styles.totalRow}>
              <Text
                style={{
                  ...styles.totalLabel,
                  color: theme.page.text,
                }}
              >
                {detail.label}
              </Text>

              <Text
                style={{
                  ...styles.totalValue,
                  color: theme.mutedText,
                }}
              >
                {detail.type === "percentage"
                  ? `${detail.value}%`
                  : formatCurrency(invoice.invoice.currency, detail.value)}
              </Text>
            </View>
          ))}

          {/* Tax */}

          {invoice.invoice.taxRate > 0 && (
            <View style={styles.totalRow}>
              <Text
                style={{
                  ...styles.totalLabel,
                  color: theme.page.text,
                }}
              >
                Tax ({invoice.invoice.taxRate}%)
              </Text>

              <Text
                style={{
                  ...styles.totalValue,
                  color: theme.mutedText,
                }}
              >
                {formatCurrency(invoice.invoice.currency, tax)}
              </Text>
            </View>
          )}

          {/* Discount */}

          {discount > 0 && (
            <View style={styles.totalRow}>
              <Text
                style={{
                  ...styles.totalLabel,
                  color: theme.page.text,
                }}
              >
                Discount
              </Text>

              <Text
                style={{
                  ...styles.totalValue,
                  color: theme.mutedText,
                }}
              >
                -{formatCurrency(invoice.invoice.currency, discount)}
              </Text>
            </View>
          )}

          {/* Grand Total */}

          <View
            style={{
              ...styles.grandTotal,
              borderTopColor: theme.border,
            }}
          >
            <Text
              style={{
                ...styles.grandTotalLabel,
                color: theme.totalText,
              }}
            >
              Total
            </Text>

            <Text
              style={{
                ...styles.grandTotalValue,
                color: theme.totalText,
              }}
            >
              {formatCurrency(invoice.invoice.currency, total)}
            </Text>
          </View>

          {/* Total in words */}

          <Text
            style={{
              ...styles.wordsLabel,
              color: theme.mutedText,
            }}
          >
            Invoice Total (in words)
          </Text>

          <Text
            style={{
              ...styles.words,
              color: theme.page.text,
            }}
          >
            {numberToWords(total)}
          </Text>
        </View>
      </View>
    </Page>
  )
}
