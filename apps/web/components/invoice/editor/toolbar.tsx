"use client"

import { useState } from "react"
import { DefaultTheme } from "@/components/icons/default"
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@workspace/ui/components/combobox"
import { IoLogoGithub } from "react-icons/io"
import { VercelLogo } from "@/components/icons/vercel"

type ThemeItem = {
  icon: React.ReactNode
  title: string
}

export function InvoiceToolbar() {
  const fontItems = [
    "Inter",
    "JetBrains Mono",
    "Geist",
    "Helvetica",
    "Roboto",
    "Ubuntu",
  ]

  const themeItems: ThemeItem[] = [
    {
      icon: <DefaultTheme />,
      title: "Default",
    },
    {
      icon: <VercelLogo />,
      title: "Vercel",
    },
    {
      icon: <IoLogoGithub className="size-4.5" />,
      title: "GitHub",
    },
  ]

  const [selectedTheme, setSelectedTheme] = useState("Default")

  const currentTheme = themeItems.find((item) => item.title === selectedTheme)

  return (
    <div className="flex h-14 shrink-0 items-center justify-between border-b border-border/60 px-4">
      <h2 className="text-[14px] font-medium">Invoice Template</h2>

      <div className="flex items-center gap-2">
        {/* Font */}
        <Combobox items={fontItems}>
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
          value={selectedTheme}
          onValueChange={(value) => {
            if (value) {
              setSelectedTheme(value)
            }
          }}
        >
          <div className="relative w-32">
            {/* Custom visible value */}
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center gap-2 px-3">
              <span className="flex w-5 shrink-0 items-center justify-center">
                {currentTheme?.icon}
              </span>

              <span className="truncate text-sm">{currentTheme?.title}</span>
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
                  key={themeItem.title}
                  value={themeItem.title}
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
