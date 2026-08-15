import { Invoice } from "@/types/invoice"
import React from "react"

type InvoiceProps = {
  invoice: Invoice
}

export const Client = ({ invoice }: InvoiceProps) => {
  return <div>Client</div>
}
