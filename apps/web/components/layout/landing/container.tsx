import { cn } from "@workspace/ui/lib/utils"
import React from "react"

export const Container = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        "mx-auto max-w-5xl border border-t-0 sm:border-dashed",
        className
      )}
    >
      {children}
    </div>
  )
}
