import { CustomField } from "@/types/invoice"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Info } from "lucide-react"
import React from "react"
import { TbTrashFilled } from "react-icons/tb"

type CustomFieldProps = {
  field: CustomField
  onChange: (data: Partial<CustomField>) => void
  onRemove: () => void
}

export const CustomFieldInput = ({
  field,
  onChange,
  onRemove,
}: CustomFieldProps) => {
  return (
    <div className="flex items-start gap-2">
      <div className="flex flex-1 gap-2">
        <div className="w-full space-y-1.5">
          <Label className="text-xs">Label</Label>

          <Input
            placeholder="Label"
            value={field.label}
            onChange={(event) =>
              onChange({
                label: event.target.value,
              })
            }
          />

          <p className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Info className="size-2.5" />
            Enter the label for the field
          </p>
        </div>

        <div className="w-full space-y-1.5">
          <Label className="text-xs">Value</Label>

          <Input
            placeholder="Value"
            value={field.value}
            onChange={(event) =>
              onChange({
                value: event.target.value,
              })
            }
          />

          <p className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Info className="size-2.5" />
            Enter the value for the field
          </p>
        </div>
      </div>

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
