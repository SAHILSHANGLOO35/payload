import { Page, StyleSheet, View } from "@react-pdf/renderer"

import type { Invoice } from "@/types/invoice"

import { Header } from "./header"
import { Company } from "./company"
import { Client } from "./client"
import { ItemsTable } from "./items-table"
import { Totals } from "./totals"
import { Footer } from "./footer"

type InvoicePageProps = {
  invoice: Invoice
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#ffffff",
    color: "#111111",
    fontSize: 10,
    fontFamily: "Helvetica",
    flexDirection: "column",
  },
  content: {
    flexGrow: 1,
  },
})

export function InvoicePage({ invoice }: InvoicePageProps) {
  return (
    <Page size="A4" style={styles.page}>
      <Header invoice={invoice} />

      <View style={styles.content}>
        <Company invoice={invoice} />
        <Client invoice={invoice} />
        <ItemsTable invoice={invoice} />
        <Totals invoice={invoice} />
      </View>

      {/* wrap={false} prevents the footer from awkwardly splitting or jumping alone to page 2 */}
      <Footer invoice={invoice} />
    </Page>
  )
}
