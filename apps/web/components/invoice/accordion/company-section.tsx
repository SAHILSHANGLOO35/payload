"use client"

import React, { useEffect, useMemo, useState } from "react"
import { Info, X } from "lucide-react"

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
import { useViewModeStore } from "@/stores/view-mode-store"
import { cn } from "@workspace/ui/lib/utils"

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"]

type CompanySectionProps = {
  isActive: boolean
}

type SmoothPreviewImageProps = {
  src: string
  alt: string
}

const SmoothPreviewImage = ({ src, alt }: SmoothPreviewImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className="relative h-full w-full overflow-hidden">
      {!isLoaded && <div className="absolute inset-0 animate-pulse bg-muted" />}

      {/* eslint-disable @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        className={`h-full w-full object-cover object-center transition-opacity duration-300 ease-out ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  )
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

  const viewMode = useViewModeStore((state) => state.viewMode)
  const isFormOnly = viewMode === "form"

  const logoPreview = useMemo(() => {
    if (!company.logo) return null

    if (typeof company.logo === "string") {
      return company.logo
    }

    return URL.createObjectURL(company.logo)
  }, [company.logo])

  const signaturePreview = useMemo(() => {
    if (!company.signature) return null

    if (typeof company.signature === "string") {
      return company.signature
    }

    return URL.createObjectURL(company.signature)
  }, [company.signature])

  useEffect(() => {
    return () => {
      if (company.logo instanceof File && logoPreview) {
        URL.revokeObjectURL(logoPreview)
      }
    }
  }, [company.logo, logoPreview])

  useEffect(() => {
    return () => {
      if (company.signature instanceof File && signaturePreview) {
        URL.revokeObjectURL(signaturePreview)
      }
    }
  }, [company.signature, signaturePreview])

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
      <div
        className={cn(
          "space-y-3",
          isFormOnly &&
            "xl:grid xl:grid-cols-[260px_260px_minmax(0,1fr)] xl:items-start xl:gap-5 xl:space-y-0"
        )}
      >
        {/* Logo + Signature */}
        <div className={cn("flex w-full gap-4", isFormOnly && "xl:contents")}>
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

                  {logoPreview && (
                    <SmoothPreviewImage
                      key={logoPreview}
                      src={logoPreview}
                      alt="Company logo preview"
                    />
                  )}
                </div>
              ) : (
                <>
                  <Gallery className="size-7" />

                  <span className="text-[10px] font-medium sm:mb-1.5 sm:text-xs">
                    Select Image From Gallery
                  </span>

                  <p className="flex items-center gap-1 p-2 text-[10px] text-muted-foreground">
                    <Info className="size-2.5" />
                    Max file size: 5 MB · PNG or JPEG only
                  </p>
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

                  {signaturePreview && (
                    <SmoothPreviewImage
                      key={signaturePreview}
                      src={signaturePreview}
                      alt="Company signature preview"
                    />
                  )}
                </div>
              ) : (
                <>
                  <Signature />

                  <span className="text-[10px] font-medium sm:mb-1.5 sm:text-xs">
                    Select Image From Gallery
                  </span>

                  <p className="flex items-center gap-1 p-2 text-[10px] text-muted-foreground">
                    <Info className="size-2.5" />
                    Max file size: 5 MB · PNG or JPEG only
                  </p>
                </>
              )}
            </label>
          </div>
        </div>

        {/* Right side details */}
        <div className="space-y-3">
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
      </div>
    </InvoiceSection>
  )
}
