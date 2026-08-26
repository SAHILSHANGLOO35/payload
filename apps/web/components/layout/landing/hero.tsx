"use client"

import React from "react"
import { Container } from "./container"
import Link from "next/link"
import { ArrowRightIcon } from "@phosphor-icons/react"

export const Hero = () => {
  return (
    <section>
      <Container className="relative overflow-hidden">
        {/* eslint-disable @next/next/no-img-element */}
        <img
          src="/payload-hero-dither.png"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          draggable={false}
          className="absolute inset-0 -z-10 h-full w-full bg-black/20 object-cover object-center select-none"
        />

        {/* Overlay */}
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-black/70 via-black/10 to-black/70" />

        <div className="grid min-h-[calc(100svh-60px)] grid-cols-1 grid-rows-2 divide-y divide-dashed overflow-hidden md:grid-cols-2 md:grid-rows-1 md:divide-x md:divide-y-0">
          {/* Left */}
          <div className="grid grid-rows-2 divide-y divide-dashed overflow-hidden">
            <div className="relative flex flex-col items-center justify-center bg-background px-6 py-12 text-center backdrop-blur-sm sm:px-8 sm:py-16 md:p-0">
              <span className="font-poppins text-7xl leading-none font-semibold tracking-tight text-foreground sm:font-normal md:text-8xl lg:text-9xl">
                Payload
              </span>
            </div>

            <div className="relative p-4">
              <span className="absolute right-3 bottom-3 font-mono text-xs tracking-widest text-foreground">
                02
              </span>
            </div>
          </div>

          {/* Right */}
          <div className="grid grid-rows-2 divide-y divide-dashed">
            <div className="relative p-4">
              <span className="absolute right-3 bottom-3 font-mono text-xs tracking-widest text-foreground">
                03
              </span>
            </div>

            <div className="relative flex h-full flex-col items-center justify-between gap-8 bg-background p-4 font-poppins backdrop-blur-sm sm:p-6">
              <p className="font-popins max-w-lg text-base leading-6 font-medium sm:text-lg md:text-xl">
                Payload is a free, lifetime invoice application for creating
                beautiful, professional, and interactive invoices. Generate,
                customize, and share invoices with ease-no subscriptions, no
                hidden costs.
              </p>

              <Link
                href="/create/invoice"
                className="flex w-full cursor-pointer items-center justify-between gap-4 border border-foreground bg-foreground px-4 py-3 text-left text-background transition-all duration-200 hover:bg-transparent hover:text-foreground sm:px-5"
              >
                <span className="font-poppins">Create Your First Invoice</span>
                <ArrowRightIcon size={20} />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
