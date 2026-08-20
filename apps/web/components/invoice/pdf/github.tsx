import { Image, Page, Text, View } from "@react-pdf/renderer"
import { createTw } from "react-pdf-tailwind"

import type { Invoice } from "@/types/invoice"
import {
  calculateInvoiceTotals,
  calculateItemTotal,
  formatCurrency,
  formatDate,
  numberToWords,
} from "@/lib/invoice/calculation"
import { pdfThemes } from "@/lib/invoice/pdf-theme"
import { CurrencyText } from "@/lib/invoice/format"

type GithubPdfProps = {
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

function tint(hex: string, alpha: number) {
  const clean = hex.replace("#", "")
  const bigint = parseInt(clean, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export default function GithubPdf({ invoice }: GithubPdfProps) {
  const theme = pdfThemes[invoice.theme.template] ?? pdfThemes.default

  const { subtotal, tax, discount, total } = calculateInvoiceTotals(invoice)

  const isMono = invoice.theme.font === "JetBrains Mono"
  const alternateRowBg = tint(theme.page.text, 0.05)

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
          ...tw("flex flex-row items-center justify-between p-4"),
          borderBottomWidth: 1,
          borderBottomColor: theme.border,
        }}
      >
        <View style={tw("flex flex-col gap-1.5")}>
          {/* Badge */}
          <View
            style={{
              ...tw(
                "w-[52px] h-[18px] self-start items-center justify-center rounded-[3px]"
              ),
              borderWidth: 1,
              borderColor: theme.accent,
            }}
          >
            <Text
              style={{
                ...tw("text-xs font-semibold tracking-[0.5px] uppercase"),
                color: theme.accent,
              }}
            >
              Invoice
            </Text>
          </View>

          {/* Invoice Number */}
          <Text
            style={{
              ...tw("text-[40px] leading-[40px] font-semibold"),
              letterSpacing: isMono ? 0 : -0.5,
              color: theme.heading,
            }}
          >
            {invoice.invoice.prefix}-{invoice.invoice.serialNumber}
          </Text>
        </View>

        {invoice.company.logo && (
          <Image
            src={invoice.company.logo}
            style={{
              ...tw("w-[60px] h-[60px] object-contain"),
              borderWidth: 1,
              borderColor: theme.border,
            }}
          />
        )}
      </View>

      {/* Meta Bar */}
      <View
        style={{
          ...tw("flex flex-row items-center h-[30px] px-4"),
          backgroundColor: theme.panel,
          borderBottomWidth: 1,
          borderBottomColor: theme.border,
        }}
      >
        {invoice.invoice.date && (
          <View style={tw("flex flex-row items-center gap-[3px] mr-5")}>
            <View
              style={{
                ...tw("w-1 h-1 rounded-[2px]"),
                backgroundColor: theme.accent,
              }}
            />
            <Text
              style={{
                ...tw("text-2xs uppercase tracking-[0.3px]"),
                color: theme.mutedText,
              }}
            >
              Issued
            </Text>
            <Text
              style={{
                ...tw("text-2xs font-semibold"),
                color: theme.page.text,
              }}
            >
              {formatDate(invoice.invoice.date)}
            </Text>
          </View>
        )}

        {invoice.invoice.dueDate && (
          <View style={tw("flex flex-row items-center gap-[3px] mr-5")}>
            <View
              style={{
                ...tw("w-1 h-1 rounded-[2px]"),
                backgroundColor: theme.accent,
              }}
            />
            <Text
              style={{
                ...tw("text-2xs uppercase tracking-[0.3px]"),
                color: theme.mutedText,
              }}
            >
              Due
            </Text>
            <Text
              style={{
                ...tw("text-2xs font-semibold"),
                color: theme.page.text,
              }}
            >
              {formatDate(invoice.invoice.dueDate)}
            </Text>
          </View>
        )}

        <View style={tw("flex flex-row items-center gap-[3px] mr-5")}>
          <View
            style={{
              ...tw("w-1 h-1 rounded-[2px]"),
              backgroundColor: theme.accent,
            }}
          />
          <Text
            style={{
              ...tw("text-2xs uppercase tracking-[0.3px]"),
              color: theme.mutedText,
            }}
          >
            Currency
          </Text>
          <Text
            style={{
              ...tw("text-2xs font-semibold"),
              color: theme.page.text,
            }}
          >
            {invoice.invoice.currency}
          </Text>
        </View>
      </View>

      {/* Billing */}
      <View
        style={{
          ...tw("flex flex-row w-full"),
          borderBottomWidth: 1,
          borderBottomColor: theme.border,
        }}
      >
        {/* Billed By */}
        <View style={tw("flex flex-col w-1/2 gap-[3px] p-4")}>
          <View style={tw("flex flex-row items-center gap-[5px] mb-[5px]")}>
            <View
              style={{
                ...tw("w-[6px] h-[6px] rounded-[1px]"),
                backgroundColor: theme.accent,
              }}
            />
            <Text
              style={{
                ...tw("text-sm font-semibold uppercase tracking-[0.5px]"),
                color: theme.mutedText,
              }}
            >
              Billed By
            </Text>
          </View>

          <Text
            style={{
              ...tw("text-xs font-semibold mb-0.5"),
              color: theme.heading,
            }}
          >
            {invoice.company.name}
          </Text>

          <Text
            style={{
              ...tw("text-xs leading-[9.45px] mb-1"),
              color: theme.mutedText,
            }}
          >
            {invoice.company.address}
          </Text>

          {invoice.company.fields.map((field) => (
            <View
              key={field.id}
              style={tw("flex flex-row items-center gap-1 mt-[1px]")}
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
                  ...tw("text-xs font-medium"),
                  color: theme.page.text,
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
            ...tw("flex flex-col w-1/2 gap-[3px] p-4"),
            borderLeftWidth: 1,
            borderLeftColor: theme.border,
          }}
        >
          <View style={tw("flex flex-row items-center gap-[5px] mb-[5px]")}>
            <View
              style={{
                ...tw("w-[6px] h-[6px] rounded-[1px]"),
                backgroundColor: theme.accent,
              }}
            />
            <Text
              style={{
                ...tw("text-sm font-semibold uppercase tracking-[0.5px]"),
                color: theme.mutedText,
              }}
            >
              Billed To
            </Text>
          </View>

          <Text
            style={{
              ...tw("text-xs font-semibold mb-0.5"),
              color: theme.heading,
            }}
          >
            {invoice.client.name}
          </Text>

          <Text
            style={{
              ...tw("text-xs leading-[9.45px] mb-1"),
              color: theme.mutedText,
            }}
          >
            {invoice.client.address}
          </Text>

          {invoice.client.fields.map((field) => (
            <View
              key={field.id}
              style={tw("flex flex-row items-center gap-1 mt-[1px]")}
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
                  ...tw("text-xs font-medium"),
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
            ...tw("flex flex-row items-center h-[30px] px-4"),
            backgroundColor: theme.tableHeader,
            borderBottomWidth: 1,
            borderBottomColor: theme.border,
          }}
        >
          <Text
            style={{
              ...tw("w-[60%] text-xs font-semibold uppercase tracking-[0.3px]"),
              color: theme.mutedText,
            }}
          >
            Item
          </Text>

          <Text
            style={{
              ...tw(
                "w-[10%] text-center text-xs font-semibold uppercase tracking-[0.3px]"
              ),
              color: theme.mutedText,
            }}
          >
            Qty
          </Text>

          <Text
            style={{
              ...tw(
                "w-[15%] text-right text-xs font-semibold uppercase tracking-[0.3px]"
              ),
              color: theme.mutedText,
            }}
          >
            Rate
          </Text>

          <Text
            style={{
              ...tw(
                "w-[15%] text-right text-xs font-semibold uppercase tracking-[0.3px]"
              ),
              color: theme.mutedText,
            }}
          >
            Amount
          </Text>
        </View>

        {/* Table Rows */}
        {invoice.items.map((item, index) => (
          <View
            key={item.id}
            wrap={false}
            style={{
              ...tw("flex flex-row items-center px-4 py-2.5 min-h-[36px]"),
              backgroundColor:
                index % 2 === 0 ? theme.page.background : alternateRowBg,
              borderBottomWidth: 1,
              borderBottomColor: theme.border,
              borderLeftWidth: 2,
              borderLeftColor: theme.accent,
            }}
          >
            <View style={tw("flex flex-col justify-center w-[60%]")}>
              <Text
                style={{
                  ...tw("text-2xs font-semibold"),
                  color: theme.heading,
                }}
              >
                {item.name}
              </Text>

              {item.description && (
                <Text
                  style={{
                    ...tw("text-xs mt-0.5 leading-[8.45px]"),
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
                letterSpacing: isMono ? 0 : -0.3,
                color: theme.page.text,
              }}
            >
              {item.quantity}
            </Text>

            {/* Item Rate */}
            <View style={tw("w-[15%] items-end")}>
              <CurrencyText
                currency={invoice.invoice.currency}
                value={item.unitPrice}
                fontSize={9}
                color={theme.page.text}
              />
            </View>

            {/* Item Amount */}
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
            ...tw("flex flex-col w-1/2"),
            borderRightWidth: 1,
            borderRightColor: theme.border,
          }}
        >
          {/* Payment Information */}
          {invoice.metadata.paymentDetails.length > 0 && (
            <View style={tw("flex flex-col gap-0.5 p-4")}>
              <Text
                style={{
                  ...tw("text-sm font-semibold uppercase tracking-[0.5px]"),
                  color: theme.mutedText,
                }}
              >
                Payment Information
              </Text>

              <View style={tw("flex flex-col gap-0.5 mt-1.5")}>
                {invoice.metadata.paymentDetails.map((field) => (
                  <View
                    key={field.id}
                    style={tw("flex flex-row items-start gap-1 flex-wrap")}
                  >
                    <Text
                      style={{
                        ...tw("text-2xs"),
                        width: 85,
                        color: theme.mutedText,
                      }}
                    >
                      {field.label}
                    </Text>

                    <Text
                      style={{
                        ...tw("text-2xs font-medium"),
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
            </View>
          )}

          {/* Terms */}
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
                  ...tw("text-sm font-semibold uppercase tracking-[0.5px]"),
                  color: theme.mutedText,
                }}
              >
                Terms
              </Text>

              <Text
                style={{
                  ...tw("text-2xs mt-1 leading-[9.1px]"),
                  color: theme.mutedText,
                }}
              >
                {invoice.metadata.terms}
              </Text>
            </View>
          )}

          {/* Notes */}
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
                  ...tw("text-sm font-semibold uppercase tracking-[0.5px]"),
                  color: theme.mutedText,
                }}
              >
                Notes
              </Text>

              <Text
                style={{
                  ...tw("text-2xs mt-1 leading-[9.1px]"),
                  color: theme.mutedText,
                }}
              >
                {invoice.metadata.notes}
              </Text>
            </View>
          )}
        </View>

        {/* Pricing */}
        <View style={tw("flex flex-col w-1/2")}>
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
                style={tw("w-[60px] h-[60px] object-cover")}
              />
            </View>
          )}

          {/* Totals Breakdown */}
          <View style={tw("flex flex-col gap-1 p-4")}>
            <View style={tw("flex flex-row items-center justify-between")}>
              <Text
                style={{
                  ...tw("text-2xs"),
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
                    ...tw("text-2xs"),
                    color: theme.mutedText,
                  }}
                >
                  {detail.label}
                </Text>
                <Text
                  style={{
                    ...tw("text-2xs"),
                    letterSpacing: isMono ? 0 : -0.3,
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
                    ...tw("text-2xs"),
                    color: theme.mutedText,
                  }}
                >
                  Tax ({invoice.invoice.taxRate}%)
                </Text>
                <Text
                  style={{
                    ...tw("text-2xs"),
                    letterSpacing: isMono ? 0 : -0.3,
                    color: theme.page.text,
                  }}
                >
                  {formatCurrency(invoice.invoice.currency, tax)}
                </Text>
              </View>
            )}

            {discount > 0 && (
              <View style={tw("flex flex-row items-center justify-between")}>
                <Text
                  style={{
                    ...tw("text-2xs"),
                    color: theme.mutedText,
                  }}
                >
                  Discount
                </Text>
                <Text
                  style={{
                    ...tw("text-2xs"),
                    letterSpacing: isMono ? 0 : -0.3,
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
              ...tw(
                "flex flex-row items-center justify-between mx-4 mb-3 p-3 rounded"
              ),
              backgroundColor: tint(theme.success, 0.12),
              borderWidth: 1,
              borderColor: tint(theme.success, 0.4),
            }}
          >
            <View style={tw("flex flex-row items-center")}>
              <Text
                style={{
                  ...tw(
                    "w-[10px] text-center text-[9px] leading-[10px] font-bold mr-1.5"
                  ),
                  color: theme.success,
                }}
              >
                +
              </Text>

              <Text
                style={{
                  ...tw("text-xs leading-[10px] font-semibold"),
                  color: theme.totalText,
                }}
              >
                Total Due
              </Text>
            </View>

            <CurrencyText
              currency={invoice.invoice.currency}
              value={total}
              fontSize={12}
              color={theme.success}
            />
          </View>

          {/* Total in Words */}
          <View style={tw("flex flex-col gap-2 px-4 pb-4")}>
            <Text
              style={{
                ...tw("text-xs uppercase tracking-[0.3px]"),
                color: theme.mutedText,
              }}
            >
              Invoice Total (in words)
            </Text>
            <Text
              style={{
                ...tw("text-2xs"),
                color: theme.mutedText,
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
