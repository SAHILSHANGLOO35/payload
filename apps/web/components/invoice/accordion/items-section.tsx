import React from "react"
import { InvoiceSection } from "../common/invoice-section"
import { Button } from "@workspace/ui/components/button"
import { AddItem } from "@/components/icons/add-item"

export const ItemsSection = () => {
  return (
    <InvoiceSection value="items" title="Invoice Items">
      <Button
        variant="outline"
        className="w-full cursor-pointer border-dashed py-4"
      >
        <AddItem />
        Add Item
      </Button>
    </InvoiceSection>
  )
}
