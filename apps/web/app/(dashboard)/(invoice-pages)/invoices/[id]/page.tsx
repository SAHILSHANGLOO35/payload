"use client"

import Workspace from "@/components/common/workspace"
import { useInvoiceStore } from "@/stores/invoice-store"
import { Invoice } from "@/types/invoice"
import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Loading from "./loading"

export default function Page() {
  const { id } = useParams<{ id: string }>()

  const setInvoice = useInvoiceStore((state) => state.setInvoice)

  const setInvoiceId = useInvoiceStore((state) => state.setInvoiceId)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        setIsLoading(true)

        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/invoices/${id}`,
          {
            withCredentials: true,
          }
        )

        const fetchedInvoice = data.invoice
        const invoiceData = fetchedInvoice.invoiceData

        const mappedInvoice: Invoice = {
          theme: invoiceData.invoiceDetails.theme,

          company: {
            name: invoiceData.companyDetails?.name ?? "",
            address: invoiceData.companyDetails?.address ?? "",
            logo: invoiceData.companyDetails?.logo ?? null,
            signature: invoiceData.companyDetails?.signature ?? null,
            fields: invoiceData.companyDetails?.metadata ?? [],
          },

          client: {
            name: invoiceData.clientDetails?.name ?? "",
            address: invoiceData.clientDetails?.address ?? "",
            fields: invoiceData.clientDetails?.metadata ?? [],
          },

          invoice: {
            prefix: invoiceData.invoiceDetails?.prefix ?? "",
            serialNumber: invoiceData.invoiceDetails?.serialNumber ?? "",
            date: invoiceData.invoiceDetails?.date?.slice(0, 10) ?? "",
            dueDate: invoiceData.invoiceDetails?.dueDate?.slice(0, 10) ?? "",
            currency: invoiceData.invoiceDetails?.currency ?? "INR",
            billingDetails:
              invoiceData.invoiceDetails?.billingDetails?.map(
                (detail: {
                  id: string
                  label: string
                  type: "fixed" | "percentage"
                  value: string | number
                }) => ({
                  id: detail.id,
                  label: detail.label,
                  type: detail.type,
                  value: Number(detail.value),
                })
              ) ?? [],

            taxRate: Number(invoiceData.invoiceDetails?.taxRate ?? 0),

            discount: Number(invoiceData.invoiceDetails?.discount ?? 0),
          },

          items:
            invoiceData.items?.map(
              (item: {
                id: string
                name: string
                description: string
                quantity: number
                unitPrice: string | number
              }) => ({
                id: item.id,
                name: item.name,
                description: item.description,
                quantity: Number(item.quantity),
                unitPrice: Number(item.unitPrice),
              })
            ) ?? [],

          metadata: {
            notes: invoiceData.metadata?.notes ?? "",
            terms: invoiceData.metadata?.terms ?? "",
            paymentDetails: invoiceData.metadata?.paymentDetails ?? [],
          },
        }

        setInvoice(mappedInvoice)
        setInvoiceId(id)
      } catch (error) {
        console.error("Failed to fetch invoice:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchInvoice()
  }, [id, setInvoice, setInvoiceId])

  if (isLoading) {
    return <Loading />
  }

  return <Workspace />
}
