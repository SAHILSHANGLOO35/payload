import React from "react"

export const SkeletonFeatures = ({
  title,
  description,
}: {
  title: string
  description: string
}) => {
  return (
    <div className="flex h-40 flex-col gap-3 border-b border-dashed p-4 font-poppins last:border-0 sm:h-auto sm:border-0 sm:border-r">
      <h2 className="text-base font-medium tracking-tight">{title}</h2>
      <p className="text-sm tracking-tight text-muted-foreground">
        {description}
      </p>
    </div>
  )
}
