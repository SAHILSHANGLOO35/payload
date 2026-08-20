"use client"

import React, { useState } from "react"
import { SidebarItems } from "./sidebar-items"
import { Invoice } from "@/components/icons/invoice"
import { Receipt } from "@/components/icons/receipt"
import { SidebarFooter } from "./sidebar-footer"
import { Logo } from "../../common/logo"
import { useSidebarStore } from "@/stores/sidebar-store"

export const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Invoices")
  const isOpen = useSidebarStore((state) => state.isOpen)

  return (
    <div
      className={`scrollbar-hide top-0 left-0 z-50 h-screen w-60 overflow-hidden pl-4 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="flex h-full flex-col items-start justify-between pb-4">
        <div className="flex w-full flex-col gap-3">
          <div className="flex items-center">
            <Logo className="w-14" />
            <span className="font-instrument-serif text-2xl font-semibold">
              Payload
            </span>
          </div>

          <div className="flex flex-col gap-8 font-geist">
            <div className="flex flex-col gap-1">
              <span className="mb-1 px-3 text-xs font-medium text-muted-foreground select-none">
                Navigation
              </span>

              <SidebarItems
                title="Invoices"
                icon={Invoice}
                active={activeItem === "Invoices"}
                onClick={() => setActiveItem("Invoices")}
              />
            </div>

            <div className="flex flex-col gap-1">
              <span className="mb-1 px-3 text-xs font-medium text-muted-foreground select-none">
                Workspace
              </span>

              <SidebarItems
                title="Create Invoice"
                icon={Receipt}
                active={activeItem === "Create Invoice"}
                onClick={() => setActiveItem("Create Invoice")}
              />
            </div>
          </div>
        </div>
        <div className="w-full">
          <SidebarFooter />
        </div>
      </div>
    </div>
  )
}
