import { Text, View } from "@react-pdf/renderer"
import { formatCurrency } from "./calculation"

function splitCurrency(formatted: string) {
  const match = formatted.match(/^(\D+)(.*)$/)
  if (!match) return { symbol: "", amount: formatted }

  const [, rawSymbol = "", rawAmount = ""] = match

  return {
    symbol: rawSymbol.trim(),
    amount: rawAmount.trim(),
  }
}

export function CurrencyText({
  currency,
  value,
  fontSize,
  color,
  bold = false,
  fontFamily = "Geist",
}: {
  currency: string
  value: number
  fontSize: number
  color: string
  bold?: boolean
  fontFamily?: string
}) {
  const { symbol, amount } = splitCurrency(formatCurrency(currency, value))

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Text
        style={{
          fontSize,
          color,
          fontWeight: bold ? 700 : 400,
          marginRight: 1,
          fontFamily,
        }}
      >
        {symbol}
      </Text>
      <Text
        style={{
          fontSize,
          color,
          fontFamily,
          letterSpacing: -0.5,
          fontWeight: bold ? 700 : 400,
        }}
      >
        {amount}
      </Text>
    </View>
  )
}
