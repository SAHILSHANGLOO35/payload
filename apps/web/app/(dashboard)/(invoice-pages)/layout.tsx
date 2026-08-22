import { DashboardHeader } from "@/components/common/dash-header"
import type { ReactNode } from "react"

export default function InvoiceLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <section className="flex h-full min-h-0 flex-col rounded-tl-2xl border bg-background p-0 font-geist text-foreground">
      <DashboardHeader />
      {children}
    </section>
  )
}
