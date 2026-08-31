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
        "mx-auto max-w-5xl border border-x-0 border-t-0 border-dashed sm:border-x",
        className
      )}
    >
      {children}
    </div>
  )
}
