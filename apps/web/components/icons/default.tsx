import React from "react"

type DefaultThemeProps = {
  className?: string
}

export const DefaultTheme = ({ className }: DefaultThemeProps) => {
  return (
    <svg
      className={`size-5 text-black dark:text-white ${className}`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.4"
        d="M12 2C12 2 12.35 7.2 14.6 9.4C16.85 11.6 22 12 22 12C22 12 16.85 12.4 14.6 14.6C12.35 16.8 12 22 12 22C12 22 11.65 16.8 9.4 14.6C7.15 12.4 2 12 2 12C2 12 7.15 11.6 9.4 9.4C11.65 7.2 12 2 12 2Z"
        fill="currentColor"
      />
      <path
        d="M18.5 2C18.5 2 18.68 3.85 19.63 4.8C20.58 5.75 22 6 22 6C22 6 20.58 6.25 19.63 7.2C18.68 8.15 18.5 10 18.5 10C18.5 10 18.32 8.15 17.37 7.2C16.42 6.25 15 6 15 6C15 6 16.42 5.75 17.37 4.8C18.32 3.85 18.5 2 18.5 2Z"
        fill="currentColor"
      />
      <path
        d="M6.5 15C6.5 15 6.68 16.35 7.38 17.05C8.08 17.75 9 18 9 18C9 18 8.08 18.25 7.38 18.95C6.68 19.65 6.5 21 6.5 21C6.5 21 6.32 19.65 5.62 18.95C4.92 18.25 4 18 4 18C4 18 4.92 17.75 5.62 17.05C6.32 16.35 6.5 15 6.5 15Z"
        fill="currentColor"
      />
    </svg>
  )
}
