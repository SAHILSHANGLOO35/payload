"use client"

import { DefaultTheme } from "@/components/icons/default"
import { VercelLogo } from "@/components/icons/vercel"
import { PdfThemeKey, pdfThemes } from "@/lib/invoice/pdf-theme"
import { useInvoiceStore } from "@/stores/invoice-store"
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@workspace/ui/components/combobox"
import { IoLogoGithub } from "react-icons/io"
import { RiNotionFill } from "react-icons/ri"
import { FaCcStripe } from "react-icons/fa6"

type ThemeItem = {
  icon: React.ReactNode
  title: string
  value: PdfThemeKey
}

export function InvoiceToolbar() {
  const fontItems = ["Helvetica", "Times-Roman", "Courier"]

  const themeItems: ThemeItem[] = [
    {
      icon: <DefaultTheme />,
      title: pdfThemes.default.name,
      value: "default",
    },
    {
      icon: <VercelLogo />,
      title: pdfThemes.vercel.name,
      value: "vercel",
    },
    {
      icon: <IoLogoGithub className="size-4.5" />,
      title: pdfThemes.github.name,
      value: "github",
    },
    {
      icon: <FaCcStripe className="size-4.5" />,
      title: pdfThemes.stripe.name,
      value: "stripe",
    },
    {
      icon: <RiNotionFill className="size-4.5" />,
      title: pdfThemes.notion.name,
      value: "notion",
    },
  ]

  const theme = useInvoiceStore((state) => state.invoice.theme)

  const setInvoiceTheme = useInvoiceStore((state) => state.setInvoiceTheme)

  const currentTheme = themeItems.find((item) => item.value === theme.template)

  const setInvoiceFont = useInvoiceStore((state) => state.setInvoiceFont)

  return (
    <div className="flex h-14 shrink-0 items-center justify-between border-b border-border/60 px-4">
      <h2 className="text-[14px] font-medium">Invoice Template</h2>

      <div className="flex items-center gap-2">
        {/* Font */}
        <Combobox
          items={fontItems}
          value={theme.font}
          onValueChange={(value) => {
            if (!value) return

            setInvoiceFont(value)
          }}
        >
          <ComboboxInput
            placeholder="Font"
            readOnly
            className="w-32 cursor-default border-border py-4 ring-0 outline-none focus:border-border focus:ring-0 focus:outline-none focus-visible:border-border focus-visible:ring-0 focus-visible:outline-none"
          />

          <ComboboxContent align="center" className="h-auto w-auto">
            <ComboboxList>
              {(fontItem) => (
                <ComboboxItem
                  key={fontItem}
                  value={fontItem}
                  className="font-geist"
                >
                  {fontItem}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>

        {/* Theme */}
        <Combobox
          items={themeItems}
          value={theme.template}
          onValueChange={(value) => {
            if (!value) return

            setInvoiceTheme(value as PdfThemeKey)
          }}
        >
          <div className="relative w-32">
            {/* Visible selected value */}
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center gap-2 px-3">
              <span className="flex w-5 shrink-0 items-center justify-center">
                {currentTheme?.icon}
              </span>

              <span className="truncate text-sm">
                {currentTheme?.title ?? "Default"}
              </span>
            </div>

            {/* Actual combobox input */}
            <ComboboxInput
              readOnly
              className="w-full cursor-default border-border py-4 text-transparent caret-transparent ring-0 outline-none selection:bg-transparent focus:border-border focus:ring-0 focus:outline-none focus-visible:border-border focus-visible:ring-0 focus-visible:outline-none"
            />
          </div>

          <ComboboxContent>
            <ComboboxList>
              {(themeItem) => (
                <ComboboxItem
                  key={themeItem.value}
                  value={themeItem.value}
                  className="font-geist"
                >
                  <div className="flex w-full items-center gap-2">
                    <span className="flex w-5 shrink-0 items-center justify-center">
                      {themeItem.icon}
                    </span>

                    <span>{themeItem.title}</span>
                  </div>
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    </div>
  )
}
