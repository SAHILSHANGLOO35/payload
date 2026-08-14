import { InvoiceItem } from "@/types/invoice"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Info } from "lucide-react"
import React from "react"
import { TbTrashFilled } from "react-icons/tb"

type ItemCustomFieldProps = {
  field: InvoiceItem
  onChange: (data: Partial<InvoiceItem>) => void
  onRemove: () => void
}

export const ItemCustomField = ({
  field,
  onChange,
  onRemove,
}: ItemCustomFieldProps) => {
  return (
    <div className="flex items-start gap-2">
      <div className="flex flex-1 flex-col gap-2">
        {/* Item Name */}
        <div className="space-y-1.5">
          <Label className="text-xs">Item Name</Label>

          <Input
            placeholder="Item Name"
            value={field.name}
            onChange={(event) =>
              onChange({
                name: event.target.value,
              })
            }
          />

          <p className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Info className="size-2.5 shrink-0" />
            Enter the name of the item
          </p>
        </div>

        {/* Item Description */}
        <div className="space-y-1.5">
          <Label className="text-xs">Item Description</Label>

          <Input
            placeholder="Item Description"
            value={field.description}
            onChange={(event) =>
              onChange({
                description: event.target.value,
              })
            }
          />

          <p className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Info className="size-2.5 shrink-0" />
            Enter a description for the item
          </p>
        </div>

        <div className="flex gap-2">
          {/* Quantity */}
          <div className="flex-1 space-y-1.5">
            <Label className="text-xs">Quantity</Label>

            <Input
              type="number"
              placeholder="1"
              value={field.quantity}
              onChange={(event) =>
                onChange({
                  quantity: Number(event.target.value),
                })
              }
            />

            <p className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Info className="size-2.5 shrink-0" />
              Enter the quantity
            </p>
          </div>

          {/* Unit Price */}
          <div className="flex-1 space-y-1.5">
            <Label className="text-xs">Unit Price</Label>

            <Input
              type="number"
              placeholder="1"
              value={field.unitPrice}
              onChange={(event) =>
                onChange({
                  unitPrice: Number(event.target.value),
                })
              }
            />

            <p className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Info className="size-2.5 shrink-0" />
              Enter the unit price
            </p>
          </div>
        </div>
      </div>

      {/* Delete */}
      <div className="space-y-1.5">
        <Label className="invisible text-xs">Delete</Label>

        <Button
          type="button"
          variant="destructive"
          size="icon"
          className="h-9 w-9 shrink-0 cursor-pointer rounded-md bg-linear-to-b from-red-500 to-red-600 shadow-xs ring-1 shadow-red-500/20 ring-white/25 transition-all duration-200 ease-in-out ring-inset hover:from-red-600 hover:to-red-600"
          onClick={onRemove}
        >
          <TbTrashFilled className="size-5 text-white" />
        </Button>
      </div>
    </div>
  )
}
