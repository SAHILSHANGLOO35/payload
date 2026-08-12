import React from "react"

export const VercelLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      className={`size-3.5 text-black dark:text-white ${className}`}
      viewBox="0 0 115 100"
      height="32"
      width="37"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M57.5 0 115 100H0z"
        clipRule="evenodd"
      />
    </svg>
  )
}
