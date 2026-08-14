"use client"

import React from "react"
import { InvoiceSection } from "../common/invoice-section"
import { Label } from "@workspace/ui/components/label"
import { Input } from "@workspace/ui/components/input"
import { Textarea } from "@workspace/ui/components/textarea"
import { Button } from "@workspace/ui/components/button"
import { AddItem } from "@/components/icons/add-item"
import { useInvoiceStore } from "@/stores/invoice-store"
import { CustomFieldInput } from "../fields/custom-field"

type ClientSectionProps = {
  isActive: boolean
}

export const ClientSection = ({ isActive }: ClientSectionProps) => {
  const client = useInvoiceStore((state) => state.invoice.client)

  const updateClient = useInvoiceStore((state) => state.updateClient)

  const addClientField = useInvoiceStore((state) => state.addClientField)

  const updateClientField = useInvoiceStore((state) => state.updateClientField)

  const removeClientField = useInvoiceStore((state) => state.removeClientField)

  return (
    <InvoiceSection value="client" title="Client Details" isActive={isActive}>
      <div className="space-y-2">
        {/* Client Name */}
        <div className="space-y-2 pb-2">
          <Label className="text-xs">Client Name</Label>

          <Input
            placeholder="Client name"
            value={client.name}
            onChange={(event) => {
              updateClient({
                name: event.target.value,
              })
            }}
            className="px-3"
          />
        </div>

        {/* Client Address */}
        <div className="space-y-2 pb-2">
          <Label className="text-xs">Client Address</Label>

          <Textarea
            placeholder="Client address"
            value={client.address}
            onChange={(event) =>
              updateClient({
                address: event.target.value,
              })
            }
            className="px-3"
          />
        </div>

        {/* Client Additional Fields */}
        <div className="space-y-2">
          <Label className="text-xs">Additional Fields</Label>

          <div className="space-y-3">
            {client.fields.map((field) => (
              <CustomFieldInput
                key={field.id}
                field={field}
                onChange={(data) => updateClientField(field.id, data)}
                onRemove={() => removeClientField(field.id)}
              />
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={addClientField}
              className="w-full cursor-pointer border-dashed py-4"
            >
              <AddItem />
              Add New Field
            </Button>
          </div>
        </div>
      </div>
    </InvoiceSection>
  )
}
