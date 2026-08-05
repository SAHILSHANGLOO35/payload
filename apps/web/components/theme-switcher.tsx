/* eslint-disable react-hooks/set-state-in-effect */

"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { cn } from "@workspace/ui/lib/utils"

import { SystemIcon } from "./icons/system-icon"
import { LightIcon } from "./icons/light-icon"
import { DarkIcon } from "./icons/dark-icon"

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-8 w-25 animate-pulse rounded-lg border border-border bg-muted transition-all" />
    )
  }

  const options = [
    { value: "system", icon: SystemIcon },
    { value: "light", icon: LightIcon },
    { value: "dark", icon: DarkIcon },
  ]

  return (
    <div className="inline-flex w-25 items-center justify-between rounded-md bg-muted p-0.5">
      {options.map(({ value, icon: Icon }) => {
        const active = theme === value

        return (
          <button
            key={value}
            onClick={() => setTheme(value)}
            className={cn(
              "flex size-7 items-center justify-center rounded-md transition-all duration-200 outline-none",
              active
                ? "bg-background text-foreground"
                : "text-muted-foreground hover:bg-background/60 hover:text-foreground"
            )}
          >
            <Icon />
          </button>
        )
      })}
    </div>
  )
}
