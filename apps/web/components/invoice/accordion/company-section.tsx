"use client"

import React, { useEffect, useMemo } from "react"
import { X } from "lucide-react"

import { InvoiceSection } from "../common/invoice-section"

import { Label } from "@workspace/ui/components/label"
import { Input } from "@workspace/ui/components/input"
import { Textarea } from "@workspace/ui/components/textarea"
import { Button } from "@workspace/ui/components/button"

import { Signature } from "@/components/icons/signature"
import { Gallery } from "@/components/icons/gallery"
import { AddItem } from "@/components/icons/add-item"

import { useInvoiceStore } from "@/stores/invoice-store"
import { CustomFieldInput } from "../fields/custom-field"

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"]

type CompanySectionProps = {
  isActive: boolean
}

export const CompanySection = ({ isActive }: CompanySectionProps) => {
  const company = useInvoiceStore((state) => state.invoice.company)

  const updateCompany = useInvoiceStore((state) => state.updateCompany)

  const addCompanyField = useInvoiceStore((state) => state.addCompanyField)

  const updateCompanyField = useInvoiceStore(
    (state) => state.updateCompanyField
  )

  const removeCompanyField = useInvoiceStore(
    (state) => state.removeCompanyField
  )

  const logoPreview = useMemo(
    () => (company.logo ? URL.createObjectURL(company.logo) : null),
    [company.logo]
  )

  const signaturePreview = useMemo(
    () => (company.signature ? URL.createObjectURL(company.signature) : null),
    [company.signature]
  )

  useEffect(() => {
    return () => {
      if (logoPreview) URL.revokeObjectURL(logoPreview)
      if (signaturePreview) URL.revokeObjectURL(signaturePreview)
    }
  }, [logoPreview, signaturePreview])

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "logo" | "signature"
  ) => {
    const file = event.target.files?.[0]

    if (!file) return

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      event.target.value = ""
      return
    }

    updateCompany({
      [type]: file, // [type]: file --> { logo : file} or {signature: file}
    })

    event.target.value = ""
  }

  return (
    <InvoiceSection value="company" title="Company Details" isActive={isActive}>
      <div className="space-y-3">
        {/* Logo + Signature */}
        <div className="flex w-full gap-4">
          {/* Company Logo */}
          <div className="flex flex-1 flex-col items-start gap-2">
            <Label className="text-xs">Company Logo</Label>

            <label
              htmlFor="company-logo"
              className="flex h-65 w-full cursor-pointer flex-col items-center justify-center gap-1 overflow-hidden rounded-md border border-dashed bg-background transition-colors duration-150 hover:bg-sidebar"
            >
              <input
                id="company-logo"
                type="file"
                accept="image/jpeg,image/png"
                className="sr-only"
                onChange={(event) => handleImageChange(event, "logo")}
              />

              {company.logo ? (
                <div className="relative flex h-full w-full items-center justify-center">
                  <button
                    type="button"
                    // Prevent default and stop propagation so clicking the
                    // remove button doesn't trigger the parent label (which
                    // would open the file picker). Then clear the logo.
                    onClick={(event) => {
                      event.preventDefault()
                      event.stopPropagation()

                      updateCompany({
                        logo: null,
                      })
                    }}
                    className="absolute top-1 right-1 z-10 cursor-pointer rounded-full bg-neutral-700 p-1 transition-colors hover:bg-neutral-800"
                  >
                    <X size={14} className="text-white" />
                  </button>

                  {/* eslint-disable @next/next/no-img-element */}
                  {logoPreview && (
                    <img
                      src={logoPreview}
                      alt="Company logo preview"
                      className="h-full w-full object-cover object-center"
                    />
                  )}
                </div>
              ) : (
                <>
                  <Gallery className="size-7" />

                  <span className="text-[10px] font-medium sm:mb-1.5 sm:text-xs">
                    Select Image From Gallery
                  </span>
                </>
              )}
            </label>
          </div>

          {/* Company Signature */}
          <div className="flex flex-1 flex-col items-start gap-2">
            <Label className="text-xs">Company Signature</Label>

            <label
              htmlFor="company-signature"
              className="flex h-65 w-full cursor-pointer flex-col items-center justify-center gap-1 overflow-hidden rounded-md border border-dashed bg-background transition-colors duration-150 hover:bg-sidebar"
            >
              <input
                id="company-signature"
                type="file"
                accept="image/jpeg,image/png"
                className="sr-only"
                onChange={(event) => handleImageChange(event, "signature")}
              />

              {company.signature ? (
                <div className="relative flex h-full w-full items-center justify-center">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.preventDefault()
                      event.stopPropagation()

                      updateCompany({
                        signature: null,
                      })
                    }}
                    className="absolute top-1 right-1 z-10 cursor-pointer rounded-full bg-neutral-700 p-1 transition-colors hover:bg-neutral-800"
                  >
                    <X size={14} className="text-white" />
                  </button>

                  {/* eslint-disable @next/next/no-img-element */}
                  {signaturePreview && (
                    <img
                      src={signaturePreview}
                      alt="Company signature preview"
                      className="h-full w-full object-cover object-center"
                    />
                  )}
                </div>
              ) : (
                <>
                  <Signature />

                  <span className="text-[10px] font-medium sm:mb-1.5 sm:text-xs">
                    Select Image From Gallery
                  </span>
                </>
              )}
            </label>
          </div>
        </div>

        {/* Company Name */}
        <div className="space-y-2">
          <Label className="text-xs">Company Name</Label>

          <Input
            placeholder="Your company name"
            value={company.name}
            onChange={(event) =>
              updateCompany({
                name: event.target.value,
              })
            }
            className="px-3"
          />
        </div>

        {/* Company Address */}
        <div className="space-y-2">
          <Label className="text-xs">Company Address</Label>

          <Textarea
            placeholder="Your company address"
            value={company.address}
            onChange={(event) =>
              updateCompany({
                address: event.target.value,
              })
            }
            className="px-3"
          />
        </div>

        {/* Company Additional Fields */}
        <div className="space-y-2">
          <Label className="text-xs">Additional Fields</Label>

          <div className="space-y-3">
            {company.fields.map((field) => (
              <CustomFieldInput
                key={field.id}
                field={field}
                onChange={(data) => updateCompanyField(field.id, data)}
                onRemove={() => removeCompanyField(field.id)}
              />
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={addCompanyField}
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
