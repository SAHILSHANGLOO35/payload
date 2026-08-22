"use client"

import { Receipt } from "@/components/icons/receipt"
import { Signature } from "@/components/icons/signature"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import { TbTrashFilled } from "react-icons/tb"
import { useEffect, useState } from "react"
import {
  InvoiceListItem,
  InvoiceStatus,
  invoiceStatuses,
} from "@/types/invoice"
import axios from "axios"
import { updateInvoiceStatus } from "@/lib/invoice/invoice-api"
import { Warning } from "@/components/icons/loading"

const statusStyles = {
  pending: "bg-yellow-500/10 text-yellow-500",
  paid: "bg-emerald-500/10 text-emerald-500",
  failed: "bg-red-500/10 text-red-500",
  expired: "bg-zinc-500/10 text-zinc-500",
  refunded: "bg-blue-500/10 text-blue-500",
  cancelled: "bg-orange-500/10 text-orange-500",
}

// Keep this in sync with the `limit` used in the invoices fetch below.
// It drives how tall the loading / empty states are, so the table never
// jumps in height once real rows come in.
const PAGE_SIZE = 10
// h-12 on a row === 3rem === 48px
const ROW_HEIGHT_PX = 48
const TABLE_BODY_HEIGHT_PX = PAGE_SIZE * ROW_HEIGHT_PX

const formatDate = (date: string) => {
  if (!date) return "-"

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

const formatDateTime = (date: string) => {
  const value = new Date(date)

  const formattedDate = value.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })

  const formattedTime = value.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })

  return `${formattedDate} - ${formattedTime}`
}

export default function Invoices() {
  const [invoices, setInvoices] = useState<InvoiceListItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/invoices`,
          {
            params: {
              page: 1,
              limit: PAGE_SIZE,
            },
            withCredentials: true,
          }
        )

        setInvoices(response.data.invoices)
      } catch (error) {
        console.error("Failed to fetch invoices:", error)
        setError("Failed to load invoices")
      } finally {
        setIsLoading(false)
      }
    }

    fetchInvoices()
  }, [])

  const handleUpdateInvoiceStatus = async (
    invoiceId: string,
    status: InvoiceStatus
  ) => {
    try {
      const updatedInvoice = await updateInvoiceStatus(invoiceId, status)

      setInvoices((currentInvoices) =>
        currentInvoices.map((invoice) =>
          invoice.id === invoiceId ? updatedInvoice : invoice
        )
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("STATUS UPDATE ERROR:", {
          status: error.response?.status,
          data: error.response?.data,
          url: error.config?.url,
        })

        return
      }
      console.error("Failed to update invoice status:", error)
    }
  }

  if (error) {
    return (
      <div className="w-full p-4">
        <div className="flex h-40 flex-col items-center justify-center rounded-lg border text-sm text-destructive">
          <Warning className="size-7" />
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full p-4">
      <div className="w-full overflow-x-auto rounded-lg border">
        <Table className="w-full min-w-225">
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="h-10 px-4">
                <span className="inline-flex items-center rounded-sm px-2 py-1.5 text-xs font-medium whitespace-nowrap text-secondary-foreground">
                  ID
                </span>
              </TableHead>

              <TableHead className="h-10 px-4">
                <span className="inline-flex items-center rounded-sm px-2 py-1.5 text-xs font-medium whitespace-nowrap text-secondary-foreground">
                  Serial No.
                </span>
              </TableHead>

              <TableHead className="h-10 px-2">
                <span className="inline-flex items-center rounded-sm px-2 py-1.5 text-xs font-medium whitespace-nowrap text-secondary-foreground">
                  Invoice Date
                </span>
              </TableHead>

              <TableHead className="h-10 px-2">
                <span className="inline-flex items-center rounded-sm px-2 py-1.5 text-xs font-medium whitespace-nowrap text-secondary-foreground">
                  Due Date
                </span>
              </TableHead>

              <TableHead className="h-10 px-2">
                <span className="inline-flex items-center rounded-sm px-2 py-1.5 text-xs font-medium whitespace-nowrap text-secondary-foreground">
                  Status
                </span>
              </TableHead>

              <TableHead className="h-10 px-2">
                <span className="inline-flex items-center rounded-sm px-2 py-1.5 text-xs font-medium whitespace-nowrap text-secondary-foreground">
                  Paid At
                </span>
              </TableHead>

              <TableHead className="h-10 w-25 px-2 text-center">
                <div className="flex w-full justify-center">
                  <span className="text-xs font-medium whitespace-nowrap text-secondary-foreground">
                    Actions
                  </span>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              Array.from({ length: PAGE_SIZE }).map((_, index) => (
                <TableRow
                  key={`skeleton-${index}`}
                  className="h-12 border-b last:border-b-0 hover:bg-transparent"
                >
                  <TableCell className="px-6">
                    <div className="h-3.5 w-16 animate-pulse rounded-sm bg-muted" />
                  </TableCell>
                  <TableCell className="px-6">
                    <div className="h-3.5 w-20 animate-pulse rounded-sm bg-muted" />
                  </TableCell>
                  <TableCell className="px-4">
                    <div className="h-3.5 w-16 animate-pulse rounded-sm bg-muted" />
                  </TableCell>
                  <TableCell className="px-4">
                    <div className="h-3.5 w-16 animate-pulse rounded-sm bg-muted" />
                  </TableCell>
                  <TableCell className="px-4">
                    <div className="h-5 w-14 animate-pulse rounded-sm bg-muted" />
                  </TableCell>
                  <TableCell className="px-4">
                    <div className="h-3.5 w-24 animate-pulse rounded-sm bg-muted" />
                  </TableCell>
                  <TableCell className="w-25 px-2">
                    <div className="flex w-full justify-center">
                      <div className="h-5 w-12 animate-pulse rounded-sm bg-muted" />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : invoices.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={7}
                  className="text-center align-middle"
                  style={{ height: TABLE_BODY_HEIGHT_PX }}
                >
                  <div className="inline-flex flex-col items-center justify-center text-[16px] text-muted-foreground">
                    <Warning className="size-9" />
                    <span>Oops! No invoices here.</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              invoices.map((invoice) => (
                <TableRow
                  key={invoice.id}
                  className="h-12 border-b transition-colors last:border-b-0"
                >
                  <TableCell className="h-10 px-6 align-middle text-xs whitespace-nowrap text-muted-foreground">
                    {invoice.id ?? "-"}
                  </TableCell>

                  <TableCell className="h-10 px-6 align-middle text-xs whitespace-nowrap">
                    {invoice.invoiceData?.invoiceDetails?.serialNumber ?? "-"}
                  </TableCell>

                  <TableCell className="px-4 text-xs whitespace-nowrap text-muted-foreground">
                    {invoice.invoiceData?.invoiceDetails?.date
                      ? formatDate(invoice.invoiceData.invoiceDetails.date)
                      : formatDate(invoice.createdAt)}
                  </TableCell>

                  <TableCell className="px-4 text-xs whitespace-nowrap text-muted-foreground">
                    {invoice.invoiceData?.invoiceDetails?.dueDate
                      ? formatDate(invoice.invoiceData.invoiceDetails.dueDate)
                      : "-"}
                  </TableCell>

                  <TableCell className="px-4 text-xs">
                    <span
                      className={`inline-flex items-center rounded-sm px-2 py-0.75 text-xs capitalize ${statusStyles[invoice.status]}`}
                    >
                      {invoice.status}
                    </span>
                  </TableCell>

                  <TableCell className="px-4 text-xs whitespace-nowrap">
                    {invoice.status === "paid" && invoice.paidAt ? (
                      <span className="text-xs whitespace-nowrap text-muted-foreground">
                        {formatDateTime(invoice.paidAt)}
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-sm bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                        Unpaid
                      </span>
                    )}
                  </TableCell>

                  <TableCell className="h-12 w-25 px-2">
                    <div className="flex w-full justify-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <button className="inline-flex cursor-pointer items-center rounded-sm bg-muted px-2.5 py-0.75 text-xs font-medium transition-colors hover:bg-muted/80">
                              View
                              <span className="sr-only">Open menu</span>
                            </button>
                          }
                        />

                        <DropdownMenuContent
                          align="end"
                          className="w-42 space-y-1.5 py-1.5 font-geist"
                        >
                          <DropdownMenuItem className="grid cursor-pointer grid-cols-[20px_1fr] items-center gap-x-2">
                            <span className="flex w-5 items-center justify-center">
                              <Signature className="size-4.5" />
                            </span>

                            <span>Edit</span>
                          </DropdownMenuItem>

                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger className="grid cursor-pointer grid-cols-[20px_1fr_auto] items-center gap-x-2">
                              <span className="flex w-5 items-center justify-center">
                                <Receipt className="size-4.25" />
                              </span>

                              <span>Update Status</span>
                            </DropdownMenuSubTrigger>

                            <DropdownMenuSubContent className="mr-2.25 w-32 border border-neutral-400/15 font-geist">
                              {invoiceStatuses.map((status) => (
                                <DropdownMenuItem
                                  key={status}
                                  disabled={invoice.status === status}
                                  onClick={() =>
                                    handleUpdateInvoiceStatus(
                                      invoice.id,
                                      status
                                    )
                                  }
                                  className="cursor-pointer capitalize"
                                >
                                  {status}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuSubContent>
                          </DropdownMenuSub>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            variant="destructive"
                            className="grid cursor-pointer grid-cols-[20px_1fr] items-center gap-x-2"
                          >
                            <span className="flex size-5 items-center justify-center rounded-[4px] bg-linear-to-b from-red-500 to-red-600 shadow-xs ring-1 shadow-red-500/20 ring-white/25 ring-inset">
                              <TbTrashFilled className="size-3.75 text-white" />
                            </span>

                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
