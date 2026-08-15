import { Invoice } from "@/types/invoice"
import React from "react"

type InvoiceProps = {
  invoice: Invoice
}

export const Header = ({ invoice }: InvoiceProps) => {
  return <div>Header</div>
}
