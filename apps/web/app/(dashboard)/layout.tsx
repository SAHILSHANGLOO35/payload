import { Sidebar } from "@/components/layout/sidebar/sidebar"
import React from "react"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="h-screen overflow-hidden bg-sidebar">
      <div className="flex pt-2 pl-4">
        <Sidebar />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
