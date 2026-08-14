import { BillingDetails } from "@/types/invoice"
import { Button } from "@workspace/ui/components/button"
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@workspace/ui/components/combobox"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Info } from "lucide-react"
import React from "react"
import { TbTrashFilled } from "react-icons/tb"

type BillingCustomFieldProps = {
  field: BillingDetails
  onChange: (data: Partial<BillingDetails>) => void
  onRemove: () => void
}

export const BillingCustomField = ({
  field,
  onChange,
  onRemove,
}: BillingCustomFieldProps) => {
  const billingTypes = ["Fixed", "Percentage"]

  const selectedBillingType = field.type === "fixed" ? "Fixed" : "Percentage"

  return (
    <div className="flex items-start gap-2">
      <div className="flex flex-1 gap-2">
        {/* Label */}
        <div className="flex-1 space-y-1.5">
          <Label className="flex items-center text-xs">
            Label
            <span className="ml-1 rounded bg-muted px-1.5 py-0.5 text-[10px] leading-none">
              Tax/Discount
            </span>
          </Label>

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
            <Info className="size-2.5 shrink-0" />
            Enter the label for the field
          </p>
        </div>

        {/* Type */}
        <div className="flex-1 space-y-1.5">
          <Label className="text-xs">Type</Label>

          <Combobox items={billingTypes} value={selectedBillingType}>
            <ComboboxInput
              placeholder="Type"
              value={selectedBillingType}
              readOnly
              onChange={(event) => {
                const value = event.currentTarget.value

                onChange({
                  type: value === "Fixed" ? "fixed" : "percentage",
                })
              }}
              className="h-9 w-full cursor-default border-border py-4 ring-0 outline-none focus:border-border focus:ring-0 focus:outline-none focus-visible:border-border focus-visible:ring-0 focus-visible:outline-none"
            />

            <ComboboxContent align="start" className="h-auto w-auto">
              <ComboboxList>
                {(billingType) => (
                  <ComboboxItem
                    key={billingType}
                    value={billingType}
                    className="font-geist"
                  >
                    {billingType}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>

          <p className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Info className="size-2.5 shrink-0" />
            Select the billing type
          </p>
        </div>

        {/* Value */}
        <div className="flex-1 space-y-1.5">
          <Label className="text-xs">Value</Label>

          <Input
            type="number"
            placeholder="Value"
            value={field.value}
            onChange={(event) =>
              onChange({
                value: Number(event.target.value),
              })
            }
          />

          <p className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Info className="size-2.5 shrink-0" />
            Enter the value for the field
          </p>
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
