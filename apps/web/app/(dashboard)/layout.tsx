"use client"

import React from "react"
import { Sidebar } from "@/components/layout/sidebar/sidebar"
import { useSidebarStore } from "@/stores/sidebar-store"
import Login from "../(auth)/login/page"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isOpen = useSidebarStore((state) => state.isOpen)

  return (
    <div className="flex h-screen overflow-hidden bg-sidebar">
      <div
        className={`shrink-0 transition-all duration-300 ease-in-out ${
          isOpen ? "w-60" : "w-0"
        }`}
      >
        <Sidebar />
      </div>

      <main className="min-w-0 flex-1 pt-2 pl-4">
        {children}
        <Login />
      </main>
    </div>
  )
}
