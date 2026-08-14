import React from "react"

type WarningProps = {
  className?: string
}

export const Warning = ({ className }: WarningProps) => {
  return (
    <svg
      className={`size-4.5 text-black dark:text-white ${className}`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.4"
        d="M10.87 3.62L2.82 17.19C1.75 19 3.05 21.25 5.16 21.25H18.84C20.95 21.25 22.25 19 21.18 17.19L13.13 3.62C12.62 2.76 11.38 2.76 10.87 3.62Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 8C12.4142 8 12.75 8.33579 12.75 8.75V13.25C12.75 13.6642 12.4142 14 12 14C11.5858 14 11.25 13.6642 11.25 13.25V8.75C11.25 8.33579 11.5858 8 12 8ZM12 16C12.5523 16 13 16.4477 13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16Z"
        fill="currentColor"
      />
    </svg>
  )
}
