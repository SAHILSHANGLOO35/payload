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
  const toggleSidebar = useSidebarStore((state) => state.toggle)

  return (
    <div className="relative flex h-screen overflow-hidden bg-sidebar">
      {/* Desktop sidebar space only */}
      <div
        className={`w-0 shrink-0 transition-all duration-300 ease-in-out ${
          isOpen ? "sm:w-60" : "sm:w-0"
        }`}
      >
        <Sidebar />
      </div>

      {/* Mobile backdrop */}
      {isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed inset-0 z-40 bg-black/40 sm:hidden"
          aria-label="Close sidebar"
        />
      )}

      <main className="min-w-0 flex-1 pt-0 pl-0 sm:pt-2 sm:pl-4">
        {children}
        <Login />
      </main>
    </div>
  )
}
