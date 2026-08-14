import React from "react"
import { InvoiceSection } from "../common/invoice-section"
import { Button } from "@workspace/ui/components/button"
import { AddItem } from "@/components/icons/add-item"

type ItemsSectionProps = {
  isActive: boolean
}

export const ItemsSection = ({ isActive }: ItemsSectionProps) => {
  return (
    <InvoiceSection value="items" title="Invoice Items" isActive={isActive}>
      <Button
        variant="outline"
        className="w-full cursor-pointer border-dashed py-4"
      >
        <AddItem />
        Add New Item
      </Button>
    </InvoiceSection>
  )
}
