"use client"

import React, { useState } from "react"
import { InvoiceSection } from "../common/invoice-section"
import { Label } from "@workspace/ui/components/label"
import { Input } from "@workspace/ui/components/input"
import { Textarea } from "@workspace/ui/components/textarea"
import { Signature } from "@/components/icons/signature"
import { Gallery } from "@/components/icons/gallery"
import { Button } from "@workspace/ui/components/button"
import { AddItem } from "@/components/icons/add-item"

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"]

export const CompanySection = () => {
  const [logo, setLogo] = useState<File | null>(null)
  const [signature, setSignature] = useState<File | null>(null)

  const [logoError, setLogoError] = useState<string | null>(null)
  const [signatureError, setSignatureError] = useState<string | null>(null)

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "logo" | "signature"
  ) => {
    const file = event.target.files?.[0]

    if (!file) return

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      if (type === "logo") {
        setLogoError("Only JPG and PNG images are allowed.")
        setLogo(null)
      } else {
        setSignatureError("Only JPG and PNG images are allowed.")
        setSignature(null)
      }

      event.target.value = ""
      return
    }

    if (type === "logo") {
      setLogoError(null)
      setLogo(file)
    } else {
      setSignatureError(null)
      setSignature(file)
    }
  }

  return (
    <InvoiceSection value="company" title="Company Details">
      <div className="space-y-2">
        <div className="flex w-full gap-4">
          <div className="flex flex-1 flex-col items-start gap-2">
            <Label className="text-xs">Company Logo</Label>

            <label
              htmlFor="company-logo"
              className="flex h-65 w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-dashed bg-background transition-colors duration-150 hover:bg-sidebar"
            >
              <input
                id="company-logo"
                type="file"
                accept="image/jpeg,image/png"
                className="sr-only"
                onChange={(event) => handleImageChange(event, "logo")}
              />

              {logo ? (
                <div className="flex h-full w-full items-center justify-center p-4">
                  {/* eslint-disable @next/next/no-img-element */}
                  <img
                    src={URL.createObjectURL(logo)}
                    alt="Company logo preview"
                    className="max-h-full max-w-full object-contain"
                  />
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

            {logoError && (
              <p className="text-xs text-destructive">{logoError}</p>
            )}
          </div>

          {/* Company Signature */}
          <div className="flex flex-1 flex-col items-start gap-2">
            <Label className="text-xs">Company Signature</Label>

            <label
              htmlFor="company-signature"
              className="flex h-65 w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-dashed bg-background transition-colors duration-150 hover:bg-sidebar"
            >
              <input
                id="company-signature"
                type="file"
                accept="image/jpeg,image/png"
                className="sr-only"
                onChange={(event) => handleImageChange(event, "signature")}
              />

              {signature ? (
                <div className="flex h-full w-full items-center justify-center p-4">
                  <img
                    src={URL.createObjectURL(signature)}
                    alt="Company signature preview"
                    className="max-h-full max-w-full object-contain"
                  />
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

            {signatureError && (
              <p className="text-xs text-destructive">{signatureError}</p>
            )}
          </div>
        </div>

        {/* Company Name */}
        <div className="space-y-2 pb-2">
          <Label className="text-xs">Company Name</Label>

          <Input
            placeholder="Your company name"
            defaultValue={"Payload Tech"}
            className="px-3"
          />
        </div>

        <div className="space-y-2 pb-2">
          <Label className="text-xs">Company Address</Label>

          <Textarea
            placeholder="Your company address"
            className="px-3"
            defaultValue={"7th Floor Aerocity, New Delhi, India"}
          />
        </div>

        {/* Company Additional Fields */}
        <div>
          <Button
            variant="outline"
            className="w-full cursor-pointer border-dashed py-4"
          >
            <AddItem />
            Add New Field
          </Button>
        </div>
      </div>
    </InvoiceSection>
  )
}
