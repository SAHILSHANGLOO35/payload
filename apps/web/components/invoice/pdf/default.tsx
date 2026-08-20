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

type DefaultPdfProps = {
  invoice: Invoice
}

const tw = createTw({
  theme: {
    extend: {
      fontSize: {
        "3xs": "0.375rem", // 6px
        "2xs": "0.46875rem", // 7.5px
        xs: "0.5625rem", // 9px
        sm: "0.65625rem", // 10.5px
        lg: "0.84375rem", // 13.5px
        "2xl": "1.125rem", // 18px
      },
    },
  },
})

export default function DefaultPdf({ invoice }: DefaultPdfProps) {
  const theme = pdfThemes[invoice.theme.template] ?? pdfThemes.default

  const { subtotal, tax, discount, total } = calculateInvoiceTotals(invoice)

  return (
    <Page
      size="A4"
      style={{
        ...tw("p-8 py-8 text-xs flex flex-col"),
        backgroundColor: theme.page.background,
        color: theme.page.text,
        fontFamily: invoice.theme.font,
      }}
    >
      {/* Header */}
      <View style={tw("flex flex-row justify-between items-start")}>
        <View style={tw("flex flex-col")}>
          <Text
            style={{
              ...tw("text-2xl font-semibold leading-[20px] tracking-[-0.9px]"),
              color: theme.accent,
            }}
          >
            {invoice.invoice.prefix}-{invoice.invoice.serialNumber}
          </Text>

          <View style={tw("flex flex-col gap-1 mt-3")}>
            <View style={tw("flex flex-row items-center")}>
              <Text
                style={{
                  ...tw("w-[72px] text-2xs font-semibold"),
                }}
              >
                Serial Number
              </Text>

              <Text
                style={{
                  ...tw("text-2xs font-normal"),
                  color: theme.mutedText,
                }}
              >
                {invoice.invoice.serialNumber}
              </Text>
            </View>

            {invoice.invoice.date && (
              <View style={tw("flex flex-row items-center")}>
                <Text
                  style={{
                    ...tw("w-[72px] text-2xs font-semibold"),
                  }}
                >
                  Date
                </Text>

                <Text
                  style={{
                    ...tw("text-2xs font-normal"),
                    color: theme.mutedText,
                  }}
                >
                  {formatDate(invoice.invoice.date)}
                </Text>
              </View>
            )}

            {invoice.invoice.dueDate && (
              <View style={tw("flex flex-row items-center")}>
                <Text
                  style={{
                    ...tw("w-[72px] text-2xs font-semibold"),
                  }}
                >
                  Due Date
                </Text>

                <Text
                  style={{
                    ...tw("text-2xs font-normal"),
                    color: theme.mutedText,
                  }}
                >
                  {formatDate(invoice.invoice.dueDate)}
                </Text>
              </View>
            )}

            <View style={tw("flex flex-row items-center")}>
              <Text
                style={{
                  ...tw("w-[72px] text-2xs font-semibold"),
                }}
              >
                Currency
              </Text>

              <Text
                style={{
                  ...tw("text-2xs font-normal"),
                  color: theme.mutedText,
                }}
              >
                {invoice.invoice.currency}
              </Text>
            </View>
          </View>
        </View>

        {invoice.company.logo && (
          <Image
            src={invoice.company.logo}
            style={tw("w-[62px] h-[62px] object-contain")}
          />
        )}
      </View>

      {/* Billing */}
      <View style={tw("flex flex-row gap-2.5 mt-[22px]")}>
        {/* Billed By */}
        <View
          style={{
            ...tw("w-1/2 pt-2.5 pr-[11px] pb-2.5 pl-[11px] rounded-sm"),
            backgroundColor: theme.panel,
          }}
        >
          <Text
            style={{
              ...tw("text-sm font-semibold mb-1.5 uppercase"),
              color: theme.accent,
            }}
          >
            Billed By
          </Text>

          <Text
            style={{
              ...tw("text-2xs font-semibold mb-[3px]"),
              color: theme.page.text,
            }}
          >
            {invoice.company.name}
          </Text>

          <Text
            style={{
              ...tw("text-2xs font-normal"),
              color: theme.mutedText,
            }}
          >
            {invoice.company.address}
          </Text>

          {invoice.company.fields.map((field) => (
            <View key={field.id} style={tw("flex flex-row gap-1 mt-[3px]")}>
              <Text
                style={{
                  ...tw("text-2xs font-semibold"),
                  color: theme.page.text,
                }}
              >
                {field.label}
              </Text>

              <Text
                style={{
                  ...tw("text-2xs font-normal"),
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
            ...tw("w-1/2 pt-2.5 pr-[11px] pb-2.5 pl-[11px] rounded-sm"),
            backgroundColor: theme.panel,
          }}
        >
          <Text
            style={{
              ...tw("text-sm font-semibold mb-1.5 uppercase"),
              color: theme.accent,
            }}
          >
            Billed To
          </Text>

          <Text
            style={{
              ...tw("text-2xs font-semibold mb-[3px]"),
              color: theme.page.text,
            }}
          >
            {invoice.client.name}
          </Text>

          <Text
            style={{
              ...tw("text-2xs font-normal"),
              color: theme.mutedText,
            }}
          >
            {invoice.client.address}
          </Text>

          {invoice.client.fields.map((field) => (
            <View key={field.id} style={tw("flex flex-row gap-1 mt-[3px]")}>
              <Text
                style={{
                  ...tw("text-2xs font-semibold"),
                  color: theme.page.text,
                }}
              >
                {field.label}
              </Text>

              <Text
                style={{
                  ...tw("text-2xs font-normal"),
                  color: theme.mutedText,
                }}
              >
                {field.value}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Items */}
      <View style={tw("mt-5")}>
        <View
          style={{
            ...tw("flex flex-row items-center py-[7px] px-2 rounded-[3px]"),
            backgroundColor: theme.tableHeader,
          }}
        >
          <Text
            style={{
              ...tw("w-[60%] text-2xs font-semibold uppercase"),
              color: theme.page.background,
            }}
          >
            Item
          </Text>

          <Text
            style={{
              ...tw("w-[10%] text-center text-2xs font-semibold uppercase"),
              color: theme.page.background,
            }}
          >
            Qty
          </Text>

          <Text
            style={{
              ...tw("w-[15%] text-right text-2xs font-semibold uppercase"),
              color: theme.page.background,
            }}
          >
            Price
          </Text>

          <Text
            style={{
              ...tw("w-[15%] text-right text-2xs font-semibold uppercase"),
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
              ...tw("flex flex-row items-center px-2 py-2.5 min-h-[36px]"),
              backgroundColor:
                index % 2 === 0 ? theme.page.background : theme.tableRow,
              borderBottomWidth: 1,
              borderBottomColor: theme.border,
            }}
          >
            <View style={tw("w-[60%] flex flex-col justify-center")}>
              <Text
                style={{
                  ...tw("text-sm font-semibold"),
                  color: theme.page.text,
                }}
              >
                {item.name}
              </Text>

              {item.description && (
                <Text
                  style={{
                    ...tw("text-xs font-normal mt-0.5"),
                    color: theme.mutedText,
                  }}
                >
                  {item.description}
                </Text>
              )}
            </View>

            <Text
              style={{
                ...tw("w-[10%] text-center text-sm tracking-[-0.5px]"),
                fontFamily: "Geist",
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

      {/* Push bottom content to bottom */}
      <View style={tw("grow")} />

      {/* Bottom */}
      <View wrap={false} style={tw("flex flex-row gap-[35px] mt-[18px]")}>
        {/* Metadata */}
        <View style={tw("w-1/2 flex flex-col justify-end gap-[13px]")}>
          {invoice.metadata.paymentDetails.length > 0 && (
            <View style={tw("flex flex-col")}>
              <Text
                style={{
                  ...tw("text-sm font-semibold mb-1.5 uppercase"),
                  color: theme.accent,
                }}
              >
                Payment Information
              </Text>

              {invoice.metadata.paymentDetails.map((field) => (
                <View key={field.id} style={tw("flex flex-row gap-1 mt-[3px]")}>
                  <Text
                    style={{
                      ...tw("text-2xs font-semibold"),
                      color: theme.page.text,
                    }}
                  >
                    {field.label}
                  </Text>

                  <Text
                    style={{
                      ...tw("text-2xs font-normal"),
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
            <View style={tw("flex flex-col")}>
              <Text
                style={{
                  ...tw("text-sm font-semibold mb-1.5 uppercase"),
                  color: theme.accent,
                }}
              >
                Terms
              </Text>

              <Text
                style={{
                  ...tw("text-2xs font-normal leading-[10.5px]"),
                  color: theme.mutedText,
                }}
              >
                {invoice.metadata.terms}
              </Text>
            </View>
          )}

          {invoice.metadata.notes && (
            <View style={tw("flex flex-col")}>
              <Text
                style={{
                  ...tw("text-sm font-semibold mb-1.5 uppercase"),
                  color: theme.accent,
                }}
              >
                Notes
              </Text>

              <Text
                style={{
                  ...tw("text-2xs font-normal leading-[10.5px]"),
                  color: theme.mutedText,
                }}
              >
                {invoice.metadata.notes}
              </Text>
            </View>
          )}
        </View>

        {/* Totals */}
        <View style={tw("w-1/2 flex flex-col justify-end")}>
          {/* Signature */}
          {invoice.company.signature && (
            <View style={tw("flex flex-col items-end mb-[9px]")}>
              <Text
                style={{
                  ...tw("text-3xs font-normal mb-1"),
                  color: theme.mutedText,
                }}
              >
                Verified by {invoice.company.name}
              </Text>

              <Image
                src={invoice.company.signature}
                style={tw("w-[58px] h-[58px] object-contain")}
              />
            </View>
          )}

          {/* Subtotal */}
          <View
            style={tw("flex flex-row justify-between items-center mb-[5px]")}
          >
            <Text
              style={{
                ...tw("text-2xs font-semibold"),
                color: theme.page.text,
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

          {/* Billing Details */}
          {invoice.invoice.billingDetails.map((detail) => (
            <View
              key={detail.id}
              style={tw("flex flex-row justify-between items-center mb-[5px]")}
            >
              <Text
                style={{
                  ...tw("text-2xs font-semibold"),
                  color: theme.page.text,
                }}
              >
                {detail.label}
              </Text>

              <Text
                style={{
                  ...tw("text-2xs font-normal tracking-[-0.2px]"),
                  fontFamily: "Geist",
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
            <View
              style={tw("flex flex-row justify-between items-center mb-[5px]")}
            >
              <Text
                style={{
                  ...tw("text-2xs font-semibold"),
                  color: theme.page.text,
                }}
              >
                Tax ({invoice.invoice.taxRate}%)
              </Text>

              <Text
                style={{
                  ...tw("text-2xs font-normal tracking-[-0.2px]"),
                  fontFamily: "Geist",
                  color: theme.mutedText,
                }}
              >
                {formatCurrency(invoice.invoice.currency, tax)}
              </Text>
            </View>
          )}

          {/* Discount */}
          {discount > 0 && (
            <View
              style={tw("flex flex-row justify-between items-center mb-[5px]")}
            >
              <Text
                style={{
                  ...tw("text-2xs font-semibold"),
                  color: theme.page.text,
                }}
              >
                Discount
              </Text>

              <Text
                style={{
                  ...tw("text-2xs font-normal tracking-[-0.2px]"),
                  fontFamily: "Geist",
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
              ...tw("flex flex-row justify-between items-center mt-[7px] pt-2"),
              borderTopWidth: 1,
              borderTopColor: theme.border,
            }}
          >
            <Text
              style={{
                ...tw("text-xs font-semibold"),
                color: theme.totalText,
              }}
            >
              Total
            </Text>

            <CurrencyText
              currency={invoice.invoice.currency}
              value={total}
              fontSize={12}
              color={theme.page.text}
            />
          </View>

          {/* Total in words */}
          <Text
            style={{
              ...tw("text-xs font-normal mt-2 uppercase"),
              color: theme.mutedText,
            }}
          >
            Invoice Total (in words)
          </Text>

          <Text
            style={{
              ...tw("text-2xs font-normal mt-[4px]"),
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
