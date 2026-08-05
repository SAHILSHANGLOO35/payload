/* eslint-disable react-hooks/set-state-in-effect */

"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export const Logo = ({ className }: { className?: string }) => {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className={`flex size-18 ${className}`}>
      {/* eslint-disable @next/next/no-img-element  */}
      <img
        src={resolvedTheme === "dark" ? "/logo-dark.png" : "/logo-light.png"}
        alt="Payload Logo"
        loading="lazy"
        decoding="async"
        fetchPriority="high"
        className="size-full object-contain"
      />
    </div>
  )
}
