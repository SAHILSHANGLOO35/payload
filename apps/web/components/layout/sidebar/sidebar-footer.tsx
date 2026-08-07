import Link from "next/link"
import React from "react"
import { SiGithub } from "react-icons/si"

export const SidebarFooter = () => {
  return (
    <div className="flex flex-col gap-1">
      <Link
        href="https://github.com/SAHILSHANGLOO35/payload"
        target="_blank"
        draggable="false"
        className="mb-2 flex h-full cursor-pointer items-center gap-2 rounded-md bg-muted-foreground/10 px-2 py-1 font-geist text-[13px] transition-all duration-200 ease-in-out hover:bg-primary/10 hover:text-primary dark:text-neutral-400 dark:hover:text-white"
      >
        <SiGithub className="size-4" />
        <span className="pt-0.5 tracking-tight">Built in Public</span>
      </Link>

      <div className="flex h-full flex-col gap-2 rounded-md bg-muted-foreground/10 p-4 font-geist text-[13px] transition-all duration-200">
        <span className="font-instrument-serif text-lg font-semibold tracking-wide">
          Login
        </span>

        <span className="font-geist text-xs font-normal text-muted-foreground">
          Create an account to keep everything backed up and easy to access.
        </span>

        <Link
          href=""
          draggable="false"
          className={`flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-blue-600 py-1.5 text-center text-sm font-medium text-white shadow-xs [box-shadow:inset_0_1px_0_rgba(255,255,255,0.18)] transition-all text-shadow-xs hover:bg-blue-700 focus:bg-blue-500 active:bg-blue-500 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
        >
          Login
        </Link>
      </div>
    </div>
  )
}
