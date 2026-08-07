/* eslint-disable react-hooks/set-state-in-effect */

"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export const Logo = ({ className }: { className?: string }) => {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const src =
    mounted && resolvedTheme === "dark" ? "/logo-dark.png" : "/logo-light.png"

  return (
    <div className={`flex size-18 shrink-0 ${className}`}>
      {/* eslint-disable @next/next/no-img-element */}
      <img
        src={src}
        alt="Payload Logo"
        loading="eager"
        decoding="async"
        draggable="false"
        fetchPriority="high"
        className="size-full object-contain"
      />
    </div>
  )
}
