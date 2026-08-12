"use client"

import React from "react"
import { ThemeSwitcher } from "./theme-switcher"
import { SidebarToggle } from "../icons/sidebar-toggle"
import { ReceiptIcon } from "@phosphor-icons/react"
import { useSidebarStore } from "@/stores/sidebar-store"

export const DashboardHeader = () => {
  const toggleSidebar = useSidebarStore((state) => state.toggle)

  return (
    <div className="flex w-full items-center justify-between border-b px-4">
      <div className="flex items-center gap-3">
        <button
          className="cursor-pointer rounded-sm p-1 transition-colors duration-200 ease-in-out hover:bg-neutral-400/20"
          draggable="false"
          onClick={toggleSidebar}
        >
          <SidebarToggle />
        </button>
        <div className="h-full w-px border-r py-6" />
        <div className="flex items-center justify-center gap-2">
          <ReceiptIcon size={27} color="#1e55f2" weight="fill" />
          <span className="font-instrument-serif text-xl font-semibold tracking-wide">
            Create Invoice
          </span>
        </div>
      </div>
      <div>
        <ThemeSwitcher />
      </div>
    </div>
  )
}
