import React from "react"

export const LightIcon = ({ className }: { className?: string }) => {
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
        d="M8.75.75V0h-1.5v2h1.5V.75M3.26 4.32l-.53-.53-.35-.35-.53-.53L2.9 1.85l.53.53.35.35.53.53zm8.42-1.06.53-.53.35-.35.53-.53 1.06 1.06-.53.53-.35.35-.53.53zM8 11.25a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5m0 1.5a4.75 4.75 0 1 0 0-9.5 4.75 4.75 0 0 0 0 9.5m6-5.5h2v1.5h-2zm-13.25 0H0v1.5h2v-1.5H.75m1.62 5.32-.53.53 1.06 1.06.53-.53.35-.35.53-.53-1.06-1.06-.53.53zm10.2 1.06.53.53 1.06-1.06-.53-.53-.35-.35-.53-.53-1.06 1.06.53.53zM8.75 14v2h-1.5v-2z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}
