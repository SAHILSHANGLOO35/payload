"use client"

import Workspace from "@/components/common/workspace"
import { useInvoiceStore } from "@/stores/invoice-store"
import { useEffect } from "react"

export default function Page() {
  const resetInvoice = useInvoiceStore((state) => state.resetInvoice)

  useEffect(() => {
    resetInvoice()

    sessionStorage.removeItem("payload_invoice_id")
  }, [resetInvoice])

  return <Workspace />
}
