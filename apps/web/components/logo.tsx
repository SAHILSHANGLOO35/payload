import React from "react"

export const Logo = () => {
  return (
    /* eslint-disable @next/next/no-img-element */
    <div className="flex size-18 border border-r border-dashed">
      <img
        src="/logo-dark.png"
        alt="Payload Logo"
        className="size-full object-contain"
        loading="lazy"
        decoding="async"
        fetchPriority="high"
      />
    </div>
  )
}
