import React from "react"
import { InvoiceSection } from "../common/invoice-section"
import { Button } from "@workspace/ui/components/button"
import { AddItem } from "@/components/icons/add-item"
import { ItemCustomField } from "../fields/items-custom-field"
import { useInvoiceStore } from "@/stores/invoice-store"

type ItemsSectionProps = {
  isActive: boolean
}

export const ItemsSection = ({ isActive }: ItemsSectionProps) => {
  const invoice = useInvoiceStore((state) => state.invoice)

  const addItem = useInvoiceStore((state) => state.addItem)
  const updateItem = useInvoiceStore((state) => state.updateItem)
  const removeItem = useInvoiceStore((state) => state.removeItem)

  return (
    <InvoiceSection value="items" title="Invoice Items" isActive={isActive}>
      <div className="space-y-3">
        {invoice.items.map((item, index) => (
          <div
            key={item.id}
            className="rounded-lg border border-border/60 bg-muted/20 p-3"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">
                Item {index + 1}
              </span>
            </div>

            <ItemCustomField
              field={item}
              onChange={(data) => updateItem(item.id, data)}
              onRemove={() => removeItem(item.id)}
            />
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={addItem}
          className="w-full cursor-pointer border-dashed py-4"
        >
          <AddItem />
          Add New Item
        </Button>
      </div>
    </InvoiceSection>
  )
}
