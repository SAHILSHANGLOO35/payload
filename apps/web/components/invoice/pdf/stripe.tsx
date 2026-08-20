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

type StripePdfProps = {
  invoice: Invoice
}

const tw = createTw({})

export default function StripePdf({ invoice }: StripePdfProps) {
  const theme = pdfThemes[invoice.theme.template] ?? pdfThemes.default

  const { subtotal, tax, discount, total } = calculateInvoiceTotals(invoice)

  return (
    <Page
      size="A4"
      style={{
        ...tw("flex flex-col gap-3 p-6 text-[8px]"),
        fontFamily: invoice.theme.font,
        backgroundColor: theme.page.background,
        color: theme.page.text,
      }}
    >
      {/* Header */}
      <View
        style={{
          ...tw("flex flex-row items-center rounded-lg p-4"),
          borderWidth: 1,
          borderColor: theme.border,
          backgroundColor: theme.panel ?? theme.page.background,
        }}
      >
        <Text
          style={{
            ...tw("text-[28px] font-semibold leading-[28px] tracking-[-1px]"),
            color: theme.heading,
          }}
        >
          {invoice.invoice.prefix}-
          <Text
            style={{
              color: theme.accent ?? theme.heading,
            }}
          >
            {invoice.invoice.serialNumber}
          </Text>
        </Text>
      </View>

      {/* Details */}
      <View
        style={{
          ...tw("flex flex-row justify-between overflow-hidden rounded-lg"),
          borderWidth: 1,
          borderColor: theme.border,
          backgroundColor: theme.page.background,
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
                ...tw("min-w-[90px] text-[7px] font-medium"),
                color: theme.mutedText,
              }}
            >
              Serial Number
            </Text>

            <Text
              style={{
                ...tw("text-[7px] font-normal"),
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
                  ...tw("min-w-[90px] text-[7px] font-medium"),
                  color: theme.mutedText,
                }}
              >
                Date
              </Text>

              <Text
                style={{
                  ...tw("text-[7px] font-normal"),
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
                  ...tw("min-w-[90px] text-[7px] font-medium"),
                  color: theme.mutedText,
                }}
              >
                Due Date
              </Text>

              <Text
                style={{
                  ...tw("text-[7px] font-normal"),
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
                ...tw("min-w-[90px] text-[7px] font-medium"),
                color: theme.mutedText,
              }}
            >
              Currency
            </Text>

            <Text
              style={{
                ...tw("text-[7px] font-normal"),
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
      <View style={tw("flex flex-row gap-2")}>
        {/* Billed By */}
        <View
          style={{
            ...tw("flex-1 gap-1 rounded-md p-3"),
            borderWidth: 1,
            borderColor: theme.border,
            backgroundColor: theme.page.background,
          }}
        >
          <Text
            style={{
              ...tw("mb-0.5 text-[7px] font-semibold uppercase"),
              color: theme.mutedText,
            }}
          >
            Billed By
          </Text>

          <Text
            style={{
              ...tw("mb-0.5 text-[9px] font-semibold"),
              color: theme.heading,
            }}
          >
            {invoice.company.name}
          </Text>

          <Text
            style={{
              ...tw("mb-1 text-[7px] font-normal leading-[9.1px]"),
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
                  ...tw("min-w-[55px] text-[7px]"),
                  color: theme.mutedText,
                }}
              >
                {field.label}
              </Text>

              <Text
                style={{
                  ...tw("text-[7px] font-normal"),
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
            ...tw("flex-1 gap-1 rounded-md p-3"),
            borderWidth: 1,
            borderColor: theme.border,
            backgroundColor: theme.page.background,
          }}
        >
          <Text
            style={{
              ...tw("mb-0.5 text-[7px] font-semibold uppercase"),
              color: theme.mutedText,
            }}
          >
            Billed To
          </Text>

          <Text
            style={{
              ...tw("mb-0.5 text-[9px] font-semibold"),
              color: theme.heading,
            }}
          >
            {invoice.client.name}
          </Text>

          <Text
            style={{
              ...tw("mb-1 text-[7px] font-normal leading-[9.1px]"),
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
                  ...tw("min-w-[55px] text-[7px]"),
                  color: theme.mutedText,
                }}
              >
                {field.label}
              </Text>

              <Text
                style={{
                  ...tw("text-[7px] font-normal"),
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
      <View
        style={{
          ...tw("grow overflow-hidden rounded-lg"),
          borderWidth: 1,
          borderColor: theme.border,
          backgroundColor: theme.page.background,
        }}
      >
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
              ...tw("w-[60%] text-[8px] font-semibold uppercase"),
              color: theme.mutedText,
            }}
          >
            Item
          </Text>

          <Text
            style={{
              ...tw("w-[10%] text-center text-[8px] font-semibold uppercase"),
              color: theme.mutedText,
            }}
          >
            Qty
          </Text>

          <Text
            style={{
              ...tw("w-[15%] text-right text-[8px] font-semibold uppercase"),
              color: theme.mutedText,
            }}
          >
            Price
          </Text>

          <Text
            style={{
              ...tw("w-[15%] text-right text-[8px] font-semibold uppercase"),
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
                  ...tw("text-[8px] font-semibold"),
                  color: theme.heading,
                }}
              >
                {item.name}
              </Text>

              {item.description && (
                <Text
                  style={{
                    ...tw("mt-0.5 text-[7px]"),
                    color: theme.mutedText,
                  }}
                >
                  {item.description}
                </Text>
              )}
            </View>

            <Text
              style={{
                ...tw("w-[10%] text-center text-[8px]"),
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
      <View wrap={false} style={tw("flex flex-row gap-2")}>
        {/* Metadata */}
        <View style={tw("flex w-1/2 flex-col gap-2")}>
          {invoice.metadata.paymentDetails.length > 0 && (
            <View
              style={{
                ...tw("gap-1 rounded-md p-3"),
                borderWidth: 1,
                borderColor: theme.border,
                backgroundColor: theme.page.background,
              }}
            >
              <Text
                style={{
                  ...tw("mb-0.5 text-[7px] font-semibold uppercase"),
                  color: theme.heading,
                }}
              >
                Payment Information
              </Text>

              {invoice.metadata.paymentDetails.map((field) => (
                <View
                  key={field.id}
                  style={tw("mt-[1px] flex flex-row items-center gap-1")}
                >
                  <Text
                    style={{
                      ...tw("min-w-[55px] text-[7px]"),
                      color: theme.mutedText,
                    }}
                  >
                    {field.label}
                  </Text>

                  <Text
                    style={{
                      ...tw("text-[7px] font-normal"),
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
                ...tw("gap-1 rounded-md p-3"),
                borderWidth: 1,
                borderColor: theme.border,
                backgroundColor: theme.page.background,
              }}
            >
              <Text
                style={{
                  ...tw("mb-0.5 text-[7px] font-semibold uppercase"),
                  color: theme.heading,
                }}
              >
                Terms
              </Text>

              <Text
                style={{
                  ...tw("text-[7px] font-normal leading-[9.1px]"),
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
                ...tw("gap-1 rounded-md p-3"),
                borderWidth: 1,
                borderColor: theme.border,
                backgroundColor: theme.page.background,
              }}
            >
              <Text
                style={{
                  ...tw("mb-0.5 text-[7px] font-semibold uppercase"),
                  color: theme.heading,
                }}
              >
                Notes
              </Text>

              <Text
                style={{
                  ...tw("text-[7px] font-normal leading-[9.1px]"),
                  color: theme.mutedText,
                }}
              >
                {invoice.metadata.notes}
              </Text>
            </View>
          )}
        </View>

        {/* Totals */}
        <View style={tw("flex w-1/2 flex-col gap-2")}>
          {/* Signature */}
          {invoice.company.signature && (
            <View
              style={{
                ...tw("items-end rounded-md p-3"),
                borderWidth: 1,
                borderColor: theme.border,
                backgroundColor: theme.page.background,
              }}
            >
              <Image
                src={invoice.company.signature}
                style={tw("h-16 w-16 object-cover")}
              />
            </View>
          )}

          {/* Totals Card */}
          <View
            style={{
              ...tw("overflow-hidden rounded-md"),
              borderWidth: 1,
              borderColor: theme.border,
              backgroundColor: theme.page.background,
            }}
          >
            <View style={tw("flex flex-col gap-1 p-3")}>
              <View style={tw("flex flex-row items-center justify-between")}>
                <Text
                  style={{
                    ...tw("text-[7px] font-normal"),
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
                      ...tw("text-[7px] font-normal"),
                      color: theme.mutedText,
                    }}
                  >
                    {detail.label}
                  </Text>

                  <Text
                    style={{
                      ...tw("text-[7px]"),
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
                      ...tw("text-[7px] font-normal"),
                      color: theme.mutedText,
                    }}
                  >
                    Tax ({invoice.invoice.taxRate}%)
                  </Text>

                  <Text
                    style={{
                      ...tw("text-[7px]"),
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
                      ...tw("text-[7px] font-normal"),
                      color: theme.mutedText,
                    }}
                  >
                    Discount
                  </Text>

                  <Text
                    style={{
                      ...tw("text-[7px]"),
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
                ...tw("flex flex-row items-center justify-between p-3"),
                borderTopWidth: 1,
                borderTopColor: theme.border,
                backgroundColor: theme.totalBackground ?? theme.panel,
              }}
            >
              <Text
                style={{
                  ...tw("text-[9px] font-semibold"),
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
                ...tw("flex flex-col gap-0.5 p-3"),
                borderTopWidth: 1,
                borderTopColor: theme.border,
              }}
            >
              <Text
                style={{
                  ...tw("text-[6px] font-normal uppercase"),
                  color: theme.mutedText,
                }}
              >
                Invoice Total (in words)
              </Text>

              <Text
                style={{
                  ...tw("text-[7px] font-normal"),
                  color: theme.page.text,
                }}
              >
                {numberToWords(total)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Page>
  )
}
