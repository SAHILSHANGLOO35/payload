import { Image, Page, Text, View } from "@react-pdf/renderer"
import { createTw } from "react-pdf-tailwind"

import type { Invoice } from "@/types/invoice"
import { pdfThemes } from "@/lib/invoice/pdf-theme"
import {
  calculateInvoiceTotals,
  calculateItemTotal,
  formatCurrency,
  formatDate,
  numberToWords,
} from "@/lib/invoice/calculation"
import { CurrencyText } from "@/lib/invoice/format"

type NotionPdfProps = {
  invoice: Invoice
}

const tw = createTw({
  theme: {
    fontFamily: {
      default: ["Geist"],
      geist: ["Geist"],
    },
    extend: {
      fontSize: {
        sm: "0.67rem",
        xs: "0.625rem",
        "2xs": "0.58rem",
        "3xs": "0.5rem",
        lg: "0.875rem",
      },
    },
  },
})

export default function NotionPdf({ invoice }: NotionPdfProps) {
  const theme = pdfThemes[invoice.theme.template] ?? pdfThemes.notion

  const { subtotal, tax, discount, total } = calculateInvoiceTotals(invoice)

  return (
    <Page
      size="A4"
      style={{
        ...tw("flex flex-col text-sm"),
        fontFamily: invoice.theme.font,
        backgroundColor: theme.page.background,
        color: theme.page.text,
        borderWidth: 1,
        borderColor: theme.border,
      }}
    >
      {/* Header */}
      <View
        style={{
          ...tw("flex flex-row p-4"),
          borderBottomWidth: 1,
          borderBottomColor: theme.border,
          backgroundColor: theme.panel ?? theme.page.background,
        }}
      >
        <Text
          style={{
            ...tw("font-medium text-[40px] leading-[40px] tracking-tighter"),
            color: theme.heading,
          }}
        >
          {invoice.invoice.prefix}-
          <Text
            style={{
              fontFamily: "Geist",
              letterSpacing: -1,
              color: theme.accent ?? theme.heading,
            }}
          >
            {invoice.invoice.serialNumber}
          </Text>
        </Text>
      </View>

      {/* Details & Logo */}
      <View
        style={{
          ...tw("flex flex-row justify-between"),
          borderBottomWidth: 1,
          borderBottomColor: theme.border,
        }}
      >
        <View
          style={{
            ...tw("flex flex-col gap-1 p-4 pr-8"),
            borderRightWidth: 1,
            borderRightColor: theme.border,
          }}
        >
          <View style={tw("flex flex-row items-center gap-1")}>
            <Text
              style={{
                ...tw("min-w-[90px] text-2xs"),
                color: theme.mutedText,
              }}
            >
              Serial Number
            </Text>

            <Text
              style={{
                ...tw("text-2xs font-normal"),
                color: theme.page.text,
              }}
            >
              {invoice.invoice.serialNumber}
            </Text>
          </View>

          {invoice.invoice.date && (
            <View style={tw("flex flex-row items-center gap-1")}>
              <Text
                style={{
                  ...tw("min-w-[90px] text-2xs"),
                  color: theme.mutedText,
                }}
              >
                Date
              </Text>

              <Text
                style={{
                  ...tw("text-2xs font-normal"),
                  color: theme.page.text,
                }}
              >
                {formatDate(invoice.invoice.date)}
              </Text>
            </View>
          )}

          {invoice.invoice.dueDate && (
            <View style={tw("flex flex-row items-center gap-1")}>
              <Text
                style={{
                  ...tw("min-w-[90px] text-2xs"),
                  color: theme.mutedText,
                }}
              >
                Due Date
              </Text>

              <Text
                style={{
                  ...tw("text-2xs font-normal"),
                  color: theme.page.text,
                }}
              >
                {formatDate(invoice.invoice.dueDate)}
              </Text>
            </View>
          )}

          <View style={tw("flex flex-row items-center gap-1")}>
            <Text
              style={{
                ...tw("min-w-[90px] text-2xs"),
                color: theme.mutedText,
              }}
            >
              Currency
            </Text>

            <Text
              style={{
                ...tw("text-2xs font-normal"),
                color: theme.page.text,
              }}
            >
              {invoice.invoice.currency}
            </Text>
          </View>
        </View>

        {invoice.company.logo && (
          <View
            style={{
              ...tw("flex items-center justify-center p-4"),
              borderLeftWidth: 1,
              borderLeftColor: theme.border,
            }}
          >
            <Image
              src={invoice.company.logo}
              style={tw("h-20 w-20 object-contain")}
            />
          </View>
        )}
      </View>

      {/* Billing */}
      <View
        style={{
          ...tw("flex w-full flex-row"),
          borderBottomWidth: 1,
          borderBottomColor: theme.border,
        }}
      >
        {/* Billed By */}
        <View
          style={{
            ...tw("flex w-1/2 flex-col gap-1 p-4"),
            borderRightWidth: 1,
            borderRightColor: theme.border,
          }}
        >
          <Text
            style={{
              ...tw("mb-0.5 text-sm uppercase"),
              color: theme.mutedText,
            }}
          >
            Billed By
          </Text>

          <Text
            style={{
              ...tw("mb-0.5 text-xs"),
              color: theme.heading,
            }}
          >
            {invoice.company.name}
          </Text>

          <Text
            style={{
              ...tw("mb-1 text-xs font-normal"),
              color: theme.mutedText,
            }}
          >
            {invoice.company.address}
          </Text>

          {invoice.company.fields.map((field) => (
            <View
              key={field.id}
              style={tw("mt-[1px] flex flex-row items-center gap-1")}
            >
              <Text
                style={{
                  ...tw("text-xs"),
                  color: theme.mutedText,
                }}
              >
                {field.label}
              </Text>

              <Text
                style={{
                  ...tw("text-xs font-normal"),
                  color: theme.page.text,
                }}
              >
                {field.value}
              </Text>
            </View>
          ))}
        </View>

        {/* Billed To */}
        <View style={tw("flex w-1/2 flex-col gap-1 p-4")}>
          <Text
            style={{
              ...tw("mb-0.5 text-sm uppercase"),
              color: theme.mutedText,
            }}
          >
            Billed To
          </Text>

          <Text
            style={{
              ...tw("mb-0.5 text-xs"),
              color: theme.heading,
            }}
          >
            {invoice.client.name}
          </Text>

          <Text
            style={{
              ...tw("mb-1 text-xs font-normal"),
              color: theme.mutedText,
            }}
          >
            {invoice.client.address}
          </Text>

          {invoice.client.fields.map((field) => (
            <View
              key={field.id}
              style={tw("mt-[1px] flex flex-row items-center gap-1")}
            >
              <Text
                style={{
                  ...tw("text-xs"),
                  color: theme.mutedText,
                }}
              >
                {field.label}
              </Text>

              <Text
                style={{
                  ...tw("text-xs font-normal"),
                  color: theme.page.text,
                }}
              >
                {field.value}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Items */}
      <View style={tw("grow")}>
        {/* Table Header */}
        <View
          fixed
          style={{
            ...tw("flex flex-row items-center px-4 py-2.5"),
            backgroundColor: theme.tableHeader,
            borderBottomWidth: 1,
            borderBottomColor: theme.border,
          }}
        >
          <Text
            style={{
              ...tw("w-[60%] text-xs font-semibold uppercase"),
              color: theme.mutedText,
            }}
          >
            Item
          </Text>

          <Text
            style={{
              ...tw("w-[10%] text-center text-xs font-semibold uppercase"),
              color: theme.mutedText,
            }}
          >
            Qty
          </Text>

          <Text
            style={{
              ...tw("w-[15%] text-right text-xs font-semibold uppercase"),
              color: theme.mutedText,
            }}
          >
            Price
          </Text>

          <Text
            style={{
              ...tw("w-[15%] text-right text-xs font-semibold uppercase"),
              color: theme.mutedText,
            }}
          >
            Total
          </Text>
        </View>

        {/* Rows */}
        {invoice.items.map((item, index) => (
          <View
            key={item.id}
            wrap={false}
            style={{
              ...tw("flex flex-row items-center px-4 py-2.5 min-h-[36px]"),
              backgroundColor:
                index % 2 === 0 ? theme.page.background : theme.tableRow,
              borderBottomWidth: 1,
              borderBottomColor: theme.border,
            }}
          >
            <View style={tw("flex w-[60%] flex-col justify-center")}>
              <Text
                style={{
                  ...tw("text-2xs leading-[12px]"),
                  color: theme.heading,
                }}
              >
                {item.name}
              </Text>

              {item.description && (
                <Text
                  style={{
                    ...tw("mt-0.5 text-xs leading-[10px] font-normal"),
                    color: theme.mutedText,
                  }}
                >
                  {item.description}
                </Text>
              )}
            </View>

            <Text
              style={{
                ...tw("w-[10%] text-center text-2xs"),
                fontFamily: "Geist",
                letterSpacing: -0.5,
                color: theme.page.text,
              }}
            >
              {item.quantity}
            </Text>

            <View style={tw("w-[15%] items-end")}>
              <CurrencyText
                currency={invoice.invoice.currency}
                value={item.unitPrice}
                fontSize={9}
                color={theme.page.text}
              />
            </View>

            <View style={tw("w-[15%] items-end")}>
              <CurrencyText
                currency={invoice.invoice.currency}
                value={calculateItemTotal(item)}
                fontSize={9}
                color={theme.page.text}
              />
            </View>
          </View>
        ))}
      </View>

      {/* Bottom */}
      <View
        wrap={false}
        style={{
          ...tw("flex flex-row"),
          borderTopWidth: 1,
          borderTopColor: theme.border,
        }}
      >
        {/* Metadata */}
        <View
          style={{
            ...tw("flex w-1/2 flex-col"),
            borderRightWidth: 1,
            borderRightColor: theme.border,
          }}
        >
          {invoice.metadata.paymentDetails.length > 0 && (
            <View style={tw("flex flex-col gap-0.5 p-4")}>
              <Text
                style={{
                  ...tw("mb-0.5 text-sm uppercase"),
                  color: theme.heading,
                }}
              >
                Payment Information
              </Text>

              {invoice.metadata.paymentDetails.map((field) => (
                <View
                  key={field.id}
                  style={tw("mt-[1px] flex flex-row items-start gap-1")}
                >
                  <Text
                    style={{
                      ...tw("text-2xs"),
                      width: 85,
                      flexShrink: 0,
                      color: theme.mutedText,
                    }}
                  >
                    {field.label}
                  </Text>

                  <Text
                    style={{
                      ...tw("text-2xs font-normal"),
                      flexGrow: 1,
                      flexShrink: 1,
                      color: theme.page.text,
                    }}
                  >
                    {field.value}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {invoice.metadata.terms && (
            <View
              style={{
                ...tw("flex flex-col gap-0.5 p-4"),
                ...(invoice.metadata.paymentDetails.length > 0
                  ? {
                      borderTopWidth: 1,
                      borderTopColor: theme.border,
                    }
                  : {}),
              }}
            >
              <Text
                style={{
                  ...tw("mb-0.5 text-sm uppercase"),
                  color: theme.heading,
                }}
              >
                Terms
              </Text>

              <Text
                style={{
                  ...tw("mt-1 text-2xs font-normal"),
                  color: theme.mutedText,
                }}
              >
                {invoice.metadata.terms}
              </Text>
            </View>
          )}

          {invoice.metadata.notes && (
            <View
              style={{
                ...tw("flex flex-col gap-0.5 p-4"),
                ...(invoice.metadata.paymentDetails.length > 0 ||
                invoice.metadata.terms
                  ? {
                      borderTopWidth: 1,
                      borderTopColor: theme.border,
                    }
                  : {}),
              }}
            >
              <Text
                style={{
                  ...tw("mb-0.5 text-sm uppercase"),
                  color: theme.heading,
                }}
              >
                Notes
              </Text>

              <Text
                style={{
                  ...tw("mt-1 text-2xs font-normal"),
                  color: theme.mutedText,
                }}
              >
                {invoice.metadata.notes}
              </Text>
            </View>
          )}
        </View>

        {/* Totals & Signature */}
        <View style={tw("flex w-1/2 flex-col")}>
          {/* Signature */}
          {invoice.company.signature && (
            <View
              style={{
                ...tw("items-end p-3"),
                borderBottomWidth: 1,
                borderBottomColor: theme.border,
              }}
            >
              <Image
                src={invoice.company.signature}
                style={tw("h-16 w-16 object-cover")}
              />
            </View>
          )}

          {/* Totals Breakdown */}
          <View style={tw("flex flex-col gap-1 p-4")}>
            <View style={tw("flex flex-row items-center justify-between")}>
              <Text
                style={{
                  ...tw("text-2xs font-normal"),
                  color: theme.mutedText,
                }}
              >
                Subtotal
              </Text>

              <CurrencyText
                currency={invoice.invoice.currency}
                value={subtotal}
                fontSize={9}
                color={theme.page.text}
              />
            </View>

            {invoice.invoice.billingDetails.map((detail) => (
              <View
                key={detail.id}
                style={tw("flex flex-row items-center justify-between")}
              >
                <Text
                  style={{
                    ...tw("text-2xs font-normal"),
                    color: theme.mutedText,
                  }}
                >
                  {detail.label}
                </Text>

                <Text
                  style={{
                    ...tw("text-2xs"),
                    fontFamily: "Geist",
                    letterSpacing: -0.25,
                    color: theme.page.text,
                  }}
                >
                  {detail.type === "percentage"
                    ? `${detail.value}%`
                    : formatCurrency(invoice.invoice.currency, detail.value)}
                </Text>
              </View>
            ))}

            {invoice.invoice.taxRate > 0 && (
              <View style={tw("flex flex-row items-center justify-between")}>
                <Text
                  style={{
                    ...tw("text-2xs font-normal"),
                    color: theme.mutedText,
                  }}
                >
                  Tax ({invoice.invoice.taxRate}%)
                </Text>

                <Text
                  style={{
                    ...tw("text-2xs"),
                    fontFamily: "Geist",
                    letterSpacing: -0.25,
                    color: theme.page.text,
                  }}
                >
                  {formatCurrency(invoice.invoice.currency, tax)}
                </Text>
              </View>
            )}

            {invoice.invoice.discount > 0 && (
              <View style={tw("flex flex-row items-center justify-between")}>
                <Text
                  style={{
                    ...tw("text-2xs font-normal"),
                    color: theme.mutedText,
                  }}
                >
                  Discount
                </Text>

                <Text
                  style={{
                    ...tw("text-2xs"),
                    fontFamily: "Geist",
                    letterSpacing: -0.25,
                    color: theme.page.text,
                  }}
                >
                  -{formatCurrency(invoice.invoice.currency, discount)}
                </Text>
              </View>
            )}
          </View>

          {/* Grand Total */}
          <View
            style={{
              ...tw("flex flex-row items-center justify-between p-4"),
              borderTopWidth: 1,
              borderTopColor: theme.border,
              backgroundColor: theme.totalBackground ?? theme.panel,
            }}
          >
            <Text
              style={{
                ...tw("text-xs font-semibold"),
                color: theme.totalText ?? theme.heading,
              }}
            >
              Total
            </Text>

            <CurrencyText
              currency={invoice.invoice.currency}
              value={total}
              fontSize={12}
              color={theme.page.text}
              // bold
            />
          </View>

          {/* Total in Words */}
          <View
            style={{
              ...tw("flex flex-col gap-2 p-4"),
              borderTopWidth: 1,
              borderTopColor: theme.border,
            }}
          >
            <Text
              style={{
                ...tw("text-xs font-normal uppercase"),
                color: theme.mutedText,
              }}
            >
              Invoice Total (in words)
            </Text>

            <Text
              style={{
                ...tw("text-2xs font-normal"),
                color: theme.page.text,
              }}
            >
              {numberToWords(total)}
            </Text>
          </View>
        </View>
      </View>
    </Page>
  )
}
