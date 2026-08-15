import { Invoice } from "@/types/invoice"
import React from "react"

type InvoiceProps = {
  invoice: Invoice
}

export const Company = ({ invoice }: InvoiceProps) => {
  return <div>Company</div>
}
