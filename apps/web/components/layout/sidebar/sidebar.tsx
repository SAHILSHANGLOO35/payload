"use client"

import React, { useState } from "react"
import { SidebarItems } from "./sidebar-items"
import { AddItem } from "@/components/icons/add-item"
import { Invoice } from "@/components/icons/invoice"
import { Receipt } from "@/components/icons/receipt"
import { SidebarFooter } from "./sidebar-footer"
import { Logo } from "../../common/logo"

export const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Invoices")

  return (
    <div className="h-screen w-60">
      <div className="flex h-full flex-col items-start justify-between pr-4 pb-4">
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
              <SidebarItems
                title="Customers"
                icon={AddItem}
                active={activeItem === "Customers"}
                onClick={() => setActiveItem("Customers")}
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
