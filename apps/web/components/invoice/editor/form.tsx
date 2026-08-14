"use client"

import { useState } from "react"

import { ScrollArea } from "@workspace/ui/components/scroll-area"
import { Accordion } from "@workspace/ui/components/accordion"

import { CompanySection } from "../accordion/company-section"
import { ClientSection } from "../accordion/client-section"
import { InvoiceDetailsSection } from "../accordion/invoice-details-section"
import { ItemsSection } from "../accordion/items-section"
import { AdditionalSection } from "../accordion/additional-section"
import { InvoiceToolbar } from "./toolbar"

export const InvoiceForm = () => {
  const [activeSection, setActiveSection] = useState<string[]>(["company"])

  return (
    <div className="flex h-full min-h-0 flex-col border-r">
      <InvoiceToolbar />

      <ScrollArea className="min-h-0 flex-1">
        <Accordion
          className="w-full"
          value={activeSection}
          onValueChange={setActiveSection}
        >
          <CompanySection isActive={activeSection.includes("company")} />

          <ClientSection isActive={activeSection.includes("client")} />

          <InvoiceDetailsSection
            isActive={activeSection.includes("invoice-details")}
          />

          <ItemsSection isActive={activeSection.includes("items")} />

          <AdditionalSection isActive={activeSection.includes("additional")} />
        </Accordion>
      </ScrollArea>
    </div>
  )
}
