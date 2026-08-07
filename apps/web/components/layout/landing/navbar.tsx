"use client"

import React, { useEffect, useState } from "react"
import { NavigationArrowIcon } from "@phosphor-icons/react"
import { Container } from "./container"
import { Button } from "@workspace/ui/components/button"
import Link from "next/link"
import { Logo } from "@/components/common/logo"
import { ThemeSwitcher } from "@/components/common/theme-switcher"

export const Navbar = () => {
  const [time, setTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
          .format(new Date())
          .replace("am", "AM")
          .replace("pm", "PM")
      )
    }
    updateTime()

    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  })

  return (
    <Container className="grid h-15 grid-cols-2 divide-dashed font-poppins sm:divide-x">
      <div className="flex items-center overflow-hidden pr-4">
        <div className="border-r border-dashed">
          <Logo />
        </div>
        <div className="ml-20 hidden font-geist text-sm font-medium tracking-wider sm:block">
          {time} IND
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 px-4">
        <ThemeSwitcher />
        <Link href="/create/invoice" draggable="false">
          <Button
            variant="secondary"
            className="cursor-pointer rounded-md py-4 font-geist text-shadow-2xs"
          >
            Workspace
            <NavigationArrowIcon className="rotate-90 text-neutral-400" />
          </Button>
        </Link>
      </div>
    </Container>
  )
}
