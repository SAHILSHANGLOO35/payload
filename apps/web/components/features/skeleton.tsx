import React from "react"

export const SkeletonFeatures = ({
  title,
  description,
}: {
  title: string
  description: string
}) => {
  return (
    <div className="flex h-40 flex-col gap-3 p-4 font-poppins sm:h-auto">
      <h2 className="text-base font-medium tracking-tight">{title}</h2>
      <p className="text-sm tracking-tight text-muted-foreground">
        {description}
      </p>
    </div>
  )
}
