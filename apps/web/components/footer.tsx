"use client"

import React from "react"
import { Container } from "./container"
import { Logo } from "./logo"
import { FaRegCircleCheck } from "react-icons/fa6"
import { SiGithub } from "react-icons/si"
import {
  CopyrightIcon,
  EnvelopeIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  XLogoIcon,
} from "@phosphor-icons/react"

const socials = [
  {
    label: "Email",
    href: "mailto:sahilshangloo35@gmail.com",
    Icon: EnvelopeIcon,
  },
  { label: "X", href: "https://x.com/doubleSdotdev", Icon: XLogoIcon },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sahil-shangloo/",
    Icon: LinkedinLogoIcon,
  },
  {
    label: "GitHub",
    href: "https://github.com/SAHILSHANGLOO35",
    Icon: SiGithub,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/sahilshangloo.35/",
    Icon: InstagramLogoIcon,
  },
]

export const Footer = () => {
  return (
    <footer>
      <Container>
        <div className="flex flex-col divide-y divide-dashed font-poppins">
          {/* Top */}
          <div className="grid w-full grid-cols-1 items-center justify-between divide-x divide-y divide-dashed sm:grid-cols-2 sm:divide-y-0">
            {/* Left half */}
            <div className="grid h-full grid-cols-2 divide-x divide-dashed">
              <div className="flex h-full items-center justify-center">
                <Logo className="size-40" />
              </div>
              <div className="flex flex-col justify-center gap-1 p-2">
                <div className="text-base font-medium">Payload</div>
                <div className="flex flex-col gap-4 text-xs tracking-normal text-foreground">
                  <div>Professional invoicing made simple.</div>
                  <div className="flex flex-col gap-1 tracking-normal text-muted-foreground">
                    <span className="flex gap-1">
                      <FaRegCircleCheck />
                      Beautiful invoices.
                    </span>
                    <span className="flex gap-1">
                      <FaRegCircleCheck />
                      Powerful customizations.
                    </span>
                    <span className="flex gap-1">
                      <FaRegCircleCheck />
                      Zero subscription fees.
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Right half */}
            <div className="flex flex-col gap-3 p-4">
              <div className="text-sm font-medium tracking-tight text-foreground">
                Reach the Developer at
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-1">
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    className="group relative overflow-hidden rounded-md border border-dashed px-3 py-2 transition-colors duration-300 ease-out hover:border-foreground/40"
                  >
                    <span className="absolute inset-0 origin-left scale-x-0 bg-foreground/10 transition-transform duration-300 ease-out group-hover:scale-x-100 dark:bg-foreground/15" />
                    <span className="relative z-10 flex items-center gap-3">
                      <Icon
                        size={20}
                        className="shrink-0 transition-colors duration-300 ease-out group-hover:text-foreground"
                      />
                      <span className="text-xs text-muted-foreground transition-colors duration-300 ease-out group-hover:text-foreground">
                        {label}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
            <div className="flex h-full items-center gap-1">
              <CopyrightIcon size={15} />
              <div className="text-xs">2026 Payload. All rights reserved.</div>
            </div>
            <div className="text-xs">
              ~ Created with ❤️ by Sahil Shangloo AKA doubleSdotdev
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
