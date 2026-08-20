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

type VercelPdfProps = {
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
        xs: "0.625rem", // was 0.58rem
        "2xs": "0.58rem", // was 0.625rem
        "3xs": "0.5rem",
        lg: "0.875rem",
      },
    },
  },
})

const colors = {
  background: "#0A0A0A",
  row: "#111111",
  border: "#1c1c1c",

  white: "#fafafa",
  text: "#e5e5e5",

  muted: "#a3a3a3",
  mutedDark: "#737373",
  subtle: "#525252",
}

export default function VercelPdf({ invoice }: VercelPdfProps) {
  const { subtotal, tax, discount, total } = calculateInvoiceTotals(invoice)

  return (
    <Page
      size="A4"
      style={{
        ...tw("text-sm"),
        flexDirection: "column",
        fontFamily: invoice.theme.font,
        backgroundColor: colors.background,
        color: colors.text,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      {/* Header */}
      <View
        style={{
          ...tw("flex flex-row p-4"),
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}
      >
        <Text
          style={{
            ...tw("font-medium text-[40px] leading-[40px] tracking-tighter"),
            color: colors.white,
          }}
        >
          {invoice.invoice.prefix}-
          <Text
            style={{
              fontFamily: "Geist",
              letterSpacing: -1,
              color: colors.white,
            }}
          >
            {invoice.invoice.serialNumber}
          </Text>
        </Text>
      </View>

      {/* Invoice Details */}
      <View
        style={{
          ...tw("flex flex-row justify-between"),
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}
      >
        <View
          style={{
            ...tw("flex flex-col gap-1 p-4 pr-8"),
            borderRightWidth: 1,
            borderRightColor: colors.border,
          }}
        >
          <View style={tw("flex flex-row items-center gap-1")}>
            <Text
              style={{
                ...tw("text-2xs min-w-[100px]"),
                color: colors.subtle,
              }}
            >
              Serial Number
            </Text>

            <Text
              style={{
                ...tw("text-2xs font-normal"),
                color: colors.text,
              }}
            >
              {invoice.invoice.serialNumber}
            </Text>
          </View>

          {invoice.invoice.date && (
            <View style={tw("flex flex-row items-center gap-1")}>
              <Text
                style={{
                  ...tw("text-2xs min-w-[100px]"),
                  color: colors.subtle,
                }}
              >
                Date
              </Text>

              <Text
                style={{
                  ...tw("text-2xs font-normal"),
                  color: colors.text,
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
                  ...tw("text-2xs min-w-[100px]"),
                  color: colors.subtle,
                }}
              >
                Due Date
              </Text>

              <Text
                style={{
                  ...tw("text-2xs font-normal"),
                  color: colors.text,
                }}
              >
                {formatDate(invoice.invoice.dueDate)}
              </Text>
            </View>
          )}

          <View style={tw("flex flex-row items-center gap-1")}>
            <Text
              style={{
                ...tw("text-2xs min-w-[100px]"),
                color: colors.subtle,
              }}
            >
              Currency
            </Text>

            <Text
              style={{
                ...tw("text-2xs font-normal"),
                color: colors.text,
              }}
            >
              {invoice.invoice.currency}
            </Text>
          </View>
        </View>

        {invoice.company.logo && (
          <View
            style={{
              ...tw("flex items-center justify-center"),
              borderLeftWidth: 1,
              borderLeftColor: colors.border,
            }}
          >
            <Image
              src={invoice.company.logo}
              style={{
                aspectRatio: 1,
                ...tw("w-32 h-32 object-contain object-right"),
              }}
            />
          </View>
        )}
      </View>

      {/* Billing */}
      <View
        style={{
          ...tw("flex flex-row w-full gap-2.5"),
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}
      >
        <View style={tw("flex flex-col gap-1.5 p-4 w-1/2")}>
          <Text
            style={{
              ...tw("text-sm"),
              color: colors.subtle,
              textTransform: "uppercase",
            }}
          >
            Billed By
          </Text>

          <Text
            style={{
              ...tw("text-xs"),
              color: colors.white,
            }}
          >
            {invoice.company.name}
          </Text>

          <Text
            style={{
              ...tw("text-xs font-normal"),
              color: colors.mutedDark,
            }}
          >
            {invoice.company.address}
          </Text>

          {invoice.company.fields.map((field) => (
            <View key={field.id} style={tw("flex flex-row items-center gap-1")}>
              <Text
                style={{
                  ...tw("text-xs"),
                  color: colors.subtle,
                }}
              >
                {field.label}
              </Text>

              <Text
                style={{
                  ...tw("text-xs font-normal"),
                  color: colors.muted,
                }}
              >
                {field.value}
              </Text>
            </View>
          ))}
        </View>

        <View
          style={{
            ...tw("flex flex-col gap-1.5 p-4 w-1/2"),
            borderLeftWidth: 1,
            borderLeftColor: colors.border,
          }}
        >
          <Text
            style={{
              ...tw("text-sm"),
              color: colors.subtle,
              textTransform: "uppercase",
            }}
          >
            Billed To
          </Text>

          <Text
            style={{
              ...tw("text-xs"),
              color: colors.white,
            }}
          >
            {invoice.client.name}
          </Text>

          <Text
            style={{
              ...tw("text-xs font-normal"),
              color: colors.mutedDark,
            }}
          >
            {invoice.client.address}
          </Text>

          {invoice.client.fields.map((field) => (
            <View key={field.id} style={tw("flex flex-row items-center gap-1")}>
              <Text
                style={{
                  ...tw("text-xs leading-[10px]"),
                  color: colors.subtle,
                }}
              >
                {field.label}
              </Text>

              <Text
                style={{
                  ...tw("text-xs leading-[10px] font-normal"),
                  color: colors.muted,
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
        <View
          fixed
          style={{
            ...tw("flex flex-row items-center h-[30px] px-4 py-2.5 text-xs"),
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
            backgroundColor: colors.background,
            color: colors.white,
          }}
        >
          <Text style={tw("w-[60%] uppercase font-semibold")}>Item</Text>

          <Text style={tw("w-[10%] text-center uppercase font-semibold")}>
            Qty
          </Text>

          <Text style={tw("w-[15%] text-right uppercase font-semibold")}>
            Price
          </Text>

          <Text style={tw("w-[15%] text-right uppercase font-semibold")}>
            Total
          </Text>
        </View>

        <View style={tw("flex flex-col")}>
          {invoice.items.map((item, index) => (
            <View
              key={item.id}
              wrap={false}
              style={{
                ...tw("flex flex-row px-4 py-3 text-2xs"),
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
                backgroundColor:
                  index % 2 === 0 ? colors.row : colors.background,
              }}
            >
              <View style={tw("flex flex-col w-[60%]")}>
                <Text
                  style={{
                    ...tw("w-full text-2xs leading-[12px]"),
                    color: colors.white,
                  }}
                >
                  {item.name}
                </Text>

                {item.description && (
                  <Text
                    style={{
                      ...tw("text-xs leading-[10px] mt-1 font-normal"),
                      color: colors.subtle,
                    }}
                  >
                    {item.description}
                  </Text>
                )}
              </View>

              <Text
                style={{
                  ...tw("w-[10%] text-center"),
                  fontFamily: "Geist",
                  letterSpacing: -0.5,
                  color: colors.white,
                }}
              >
                {item.quantity}
              </Text>

              <Text
                style={{
                  ...tw("w-[15%] text-right"),
                  fontFamily: "Geist",
                  letterSpacing: -0.5,
                  color: colors.white,
                }}
              >
                {formatCurrency(invoice.invoice.currency, item.unitPrice)}
              </Text>

              <Text
                style={{
                  ...tw("w-[15%] text-right"),
                  fontFamily: "Geist",
                  letterSpacing: -0.5,
                  color: colors.white,
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
      </View>

      {/* Bottom */}
      <View
        wrap={false}
        style={{
          ...tw("flex flex-row"),
          borderTopWidth: 1,
          borderTopColor: colors.border,
        }}
      >
        {/* Metadata */}
        <View
          style={{
            ...tw("flex flex-col w-1/2"),
            borderRightWidth: 1,
            borderRightColor: colors.border,
          }}
        >
          {invoice.metadata.paymentDetails.length > 0 && (
            <View style={tw("flex flex-col gap-0.5 pr-2.5 p-4")}>
              <Text
                style={{
                  ...tw("text-sm"),
                  color: colors.white,
                  textTransform: "uppercase",
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
                        color: colors.subtle,
                      }}
                    >
                      {field.label}
                    </Text>

                    <Text
                      style={{
                        ...tw("text-2xs font-normal"),
                        flexGrow: 1,
                        flexShrink: 1,
                        color: colors.muted,
                      }}
                    >
                      {field.value}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {invoice.metadata.terms && (
            <View
              style={{
                ...tw("flex flex-col gap-0.5 p-4"),
                borderTopWidth: 1,
                borderTopColor: colors.border,
              }}
            >
              <Text
                style={{
                  ...tw("text-sm"),
                  color: colors.white,
                  textTransform: "uppercase",
                }}
              >
                Terms
              </Text>

              <Text
                style={{
                  ...tw("text-2xs font-normal mt-1"),
                  color: colors.mutedDark,
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
                borderTopWidth: 1,
                borderTopColor: colors.border,
              }}
            >
              <Text
                style={{
                  ...tw("text-sm"),
                  color: colors.white,
                  textTransform: "uppercase",
                }}
              >
                Notes
              </Text>

              <Text
                style={{
                  ...tw("text-2xs font-normal mt-1"),
                  color: colors.mutedDark,
                }}
              >
                {invoice.metadata.notes}
              </Text>
            </View>
          )}
        </View>

        {/* Pricing */}
        <View style={tw("flex flex-col w-1/2")}>
          {invoice.company.signature && (
            <View
              style={{
                ...tw("flex flex-col items-end"),
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
              }}
            >
              <Image
                src={invoice.company.signature}
                style={{
                  aspectRatio: 1,
                  ...tw("h-24 w-24 object-cover"),
                  borderLeftWidth: 1,
                  borderLeftColor: colors.border,
                }}
              />
            </View>
          )}

          <View style={tw("flex flex-col gap-1 p-4")}>
            <View style={tw("flex flex-row items-center justify-between")}>
              <Text
                style={{
                  ...tw("text-2xs"),
                  color: colors.mutedDark,
                }}
              >
                Subtotal
              </Text>

              <Text
                style={{
                  ...tw("text-2xs leading-[10px]"),
                  fontFamily: "Geist",
                  letterSpacing: -0.25,
                  color: colors.muted,
                }}
              >
                {formatCurrency(invoice.invoice.currency, subtotal)}
              </Text>
            </View>

            {invoice.invoice.billingDetails.map((detail) => (
              <View
                key={detail.id}
                style={tw("flex flex-row items-center justify-between")}
              >
                <Text
                  style={{
                    ...tw("text-2xs"),
                    color: colors.mutedDark,
                  }}
                >
                  {detail.label}
                </Text>

                <Text
                  style={{
                    ...tw("text-2xs leading-[10px]"),
                    fontFamily: "Geist",
                    letterSpacing: -0.25,
                    color: colors.muted,
                  }}
                >
                  {detail.type === "percentage"
                    ? `${detail.value} %`
                    : formatCurrency(invoice.invoice.currency, detail.value)}
                </Text>
              </View>
            ))}

            {invoice.invoice.taxRate > 0 && (
              <View style={tw("flex flex-row items-center justify-between")}>
                <Text
                  style={{
                    ...tw("text-2xs"),
                    color: colors.mutedDark,
                  }}
                >
                  Tax ({invoice.invoice.taxRate}%)
                </Text>

                <Text
                  style={{
                    ...tw("text-2xs leading-[10px]"),
                    fontFamily: "Geist",
                    letterSpacing: -0.25,
                    color: colors.muted,
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
                    ...tw("text-2xs"),
                    color: colors.mutedDark,
                  }}
                >
                  Discount
                </Text>

                <Text
                  style={{
                    ...tw("text-2xs leading-[10px]"),
                    fontFamily: "Geist",
                    letterSpacing: -0.25,
                    color: colors.muted,
                  }}
                >
                  -{formatCurrency(invoice.invoice.currency, discount)}
                </Text>
              </View>
            )}
          </View>

          {/* Total */}
          <View
            style={{
              ...tw("flex flex-row items-center justify-between p-4"),
              borderTopWidth: 1,
              borderTopColor: colors.border,
            }}
          >
            <Text
              style={{
                ...tw("text-xs"),
                color: colors.mutedDark,
              }}
            >
              Total
            </Text>

            <Text
              style={{
                ...tw("text-lg leading-[16px]"),
                fontFamily: "Geist",
                letterSpacing: -0.25,
                color: colors.white,
              }}
            >
              {formatCurrency(invoice.invoice.currency, total)}
            </Text>
          </View>

          {/* Total in Words */}
          <View
            style={{
              ...tw("flex flex-col gap-2 p-4"),
              borderTopWidth: 1,
              borderTopColor: colors.border,
            }}
          >
            <Text
              style={{
                ...tw("text-xs font-normal text-neutral-500 uppercase"),
                color: colors.mutedDark,
              }}
            >
              Invoice Total (in words)
            </Text>

            <Text
              style={{
                ...tw("text-2xs font-normal"),
                color: colors.text,
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
