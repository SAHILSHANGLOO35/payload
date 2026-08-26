import { DashboardHeader } from "@/components/common/dash-header"
import type { ReactNode } from "react"

export default function InvoiceLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <section className="flex h-full min-h-0 flex-col border bg-background font-geist text-foreground sm:rounded-tl-2xl">
      <DashboardHeader />
      {children}
    </section>
  )
}
