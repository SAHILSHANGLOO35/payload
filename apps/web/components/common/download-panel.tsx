"use client"

import React, { useState } from "react"
import {
  Combobox,
  ComboboxContent,
  ComboboxItem,
  ComboboxInput,
  ComboboxList,
} from "@workspace/ui/components/combobox"
import { Button } from "@workspace/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { Download } from "../icons/download"
import { Preview } from "../icons/preview"
import { Gallery } from "../icons/gallery"
import { Invoice } from "../icons/invoice"
import { ShowBoth } from "../icons/show-both"

type ItemsPanel = {
  icon?: React.ReactNode
  title: string
}

export const DownloadPanel = () => {
  const items: ItemsPanel[] = [
    {
      icon: <Invoice />,
      title: "Form",
    },
    {
      icon: <Preview />,
      title: "Preview",
    },
    {
      icon: <ShowBoth />,
      title: "Both",
    },
  ]

  const [selectedPreference, setSelectedPreference] = useState("Both")

  const currentPreference = items.find(
    (item) => item.title === selectedPreference
  )

  return (
    <div className="flex w-full items-center justify-between border-b px-4 py-2 font-geist">
      <div />

      <div className="flex w-60 items-center gap-2">
        <Combobox
          items={items}
          defaultValue="Both"
          onValueChange={(value) => {
            if (value) {
              setSelectedPreference(value)
            }
          }}
        >
          <div className="relative w-32">
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center gap-2 px-3">
              {currentPreference?.icon}

              <span className="text-sm">{currentPreference?.title}</span>
            </div>

            <ComboboxInput
              readOnly
              className="w-full cursor-default border-border py-4 text-transparent caret-transparent ring-0 outline-none selection:bg-transparent focus:border-border focus:ring-0 focus:outline-none focus-visible:border-border focus-visible:ring-0 focus-visible:outline-none"
            />
          </div>

          <ComboboxContent>
            <ComboboxList>
              {(item) => (
                <ComboboxItem
                  key={item.title}
                  value={item.title}
                  className="font-geist"
                >
                  <div className="flex w-full items-center gap-2">
                    <span className="flex w-5 shrink-0 items-center justify-center">
                      {item.icon}
                    </span>
                    <span>{item.title}</span>
                  </div>
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button className="flex cursor-pointer items-center justify-center gap-1.5 rounded-md border border-transparent bg-blue-600 py-4 text-center text-sm font-medium text-white shadow-xs [box-shadow:inset_0_1px_0_rgba(255,255,255,0.18)] transition-colors hover:bg-blue-700 focus:bg-blue-600 focus-visible:bg-blue-600 focus-visible:ring-0 focus-visible:outline-none active:bg-blue-600 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                <Download />
                Download
              </Button>
            }
          />

          <DropdownMenuContent className="flex w-40 cursor-pointer items-center font-geist">
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer p-1.5">
                <Download className="flex w-5 shrink-0 items-center justify-center" />
                Save Invoice
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer p-1.5">
                <Preview className="flex w-5 shrink-0 items-center justify-center" />
                View Invoice
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer p-1.5">
                <Invoice className="flex w-5 shrink-0 items-center justify-center" />
                Download PDF
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer p-1.5">
                <Gallery className="flex w-5 shrink-0 items-center justify-center" />
                Download PNG
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
