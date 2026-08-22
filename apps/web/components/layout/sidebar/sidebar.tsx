"use client"

import React from "react"
import { SidebarItems } from "./sidebar-items"
import { Invoice } from "@/components/icons/invoice"
import { Receipt } from "@/components/icons/receipt"
import { SidebarFooter } from "./sidebar-footer"
import { Logo } from "../../common/logo"
import { useSidebarStore } from "@/stores/sidebar-store"
import { usePathname, useRouter } from "next/navigation"

export const Sidebar = () => {
  const isOpen = useSidebarStore((state) => state.isOpen)

  const pathname = usePathname()

  const router = useRouter()

  return (
    <div
      className={`scrollbar-hide fixed top-0 left-0 z-50 h-screen w-60 overflow-hidden bg-sidebar pr-4 pl-4 transition-transform duration-300 ease-in-out sm:relative sm:pr-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex h-full flex-col items-start justify-between pb-4">
        <div className="flex w-full flex-col gap-3">
          <div
            className="flex cursor-pointer items-center"
            onClick={() => {
              router.push("/")
            }}
          >
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
                active={pathname === "/invoices"}
                href="/invoices"
              />
            </div>

            <div className="flex flex-col gap-1">
              <span className="mb-1 px-3 text-xs font-medium text-muted-foreground select-none">
                Workspace
              </span>

              <SidebarItems
                title="Create Invoice"
                icon={Receipt}
                active={pathname === "/create/invoice"}
                href="/create/invoice"
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
