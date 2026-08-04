import React from "react"

export const DarkIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 16 16"
      height="16"
      width="16"
      data-slot="geist-icon"
      style={{ color: "currentcolor" }}
      className={className}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M1.5 8a6 6 0 0 1 3.62-5.51 7 7 0 0 0 7.08 9.25A5.99 5.99 0 0 1 1.5 8M6.42.58a7.5 7.5 0 1 0 7.96 10.41l-.92-1.01a5.5 5.5 0 0 1-6.3-8.25zm6.83.42v1.75H15v1.5h-1.75V6h-1.5V4.25H10v-1.5h1.75V1z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}
