import React from "react"

export const SystemIcon = ({ className }: { className?: string }) => {
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
        d="M1 3.25C1 1.45 2.46 0 4.25 0h7.5C13.55 0 15 1.46 15 3.25V16H1V3.25M4.25 1.5c-.97 0-1.75.78-1.75 1.75V14.5h11V3.25c0-.97-.78-1.75-1.75-1.75zM4 4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6H4zm5 9h3v-1.5H9z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}
