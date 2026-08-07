import type { ReactNode } from "react"

export default function InvoiceLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <section className="flex h-full min-h-0 flex-col p-0">{children}</section>
  )
}
