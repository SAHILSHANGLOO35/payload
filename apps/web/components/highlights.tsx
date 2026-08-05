import React from "react"
import { SiGithub } from "react-icons/si"
import { FaArrowTurnDown, FaCircleArrowRight } from "react-icons/fa6"
import { Container } from "./container"
import { Button } from "@workspace/ui/components/button"
import { TwistyArrow } from "./icons/twisty-arrow"
import Link from "next/link"

export const Highlights = () => {
  return (
    <section>
      <Container className="relative h-[calc(100svh-60px)]">
        <div className="absolute inset-0 -z-10 mask-t-from-20% mask-r-from-20% mask-b-from-20% mask-l-from-20%">
          {/* eslint-disable @next/next/no-img-element */}
          <img
            src="/payload-mask-image.png"
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            loading="eager"
            decoding="async"
            draggable={false}
            className="block h-full w-full object-cover"
          />
        </div>

        <div className="absolute inset-0 flex h-full items-center p-4">
          <div className="flex max-w-2xl flex-col gap-8">
            <span className="font-instrument-serif text-7xl leading-18 tracking-tight">
              <span className="text-sky-600 dark:text-sky-300">Send</span>{" "}
              Invoices People{" "}
              <span className="text-sky-600 dark:text-sky-300">Open.</span>{" "}
              <span className="text-sky-600 dark:text-sky-300">Not</span> Ones
              They{" "}
              <span className="text-sky-600 dark:text-sky-300">Dread.</span>
            </span>

            <div className="flex items-center gap-3 font-geist">
              <Button className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-4 text-center text-sm text-white shadow-xs transition-all text-shadow-2xs hover:bg-blue-700 focus:bg-blue-500 active:bg-blue-500 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                Get Started
                <FaCircleArrowRight className="-rotate-45" />
              </Button>

              <div className="group relative inline-flex">
                <span className="pointer-events-none absolute top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 font-instrument-serif text-[10px] font-medium tracking-[0.2em] whitespace-nowrap text-sky-700 opacity-90 transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:opacity-0 dark:text-sky-200/40">
                  <TwistyArrow />
                  hover me
                </span>

                <span className="pointer-events-none absolute top-9 left-1/2 flex -translate-x-1/2 items-center font-instrument-serif text-[10px] font-medium tracking-[0.2em] whitespace-nowrap text-sky-700 opacity-0 transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:opacity-100 dark:text-sky-200/40">
                  give a star : )
                </span>

                <Link
                  href="https://github.com/SAHILSHANGLOO35/payload"
                  target="_blank"
                >
                  <Button
                    variant="secondary"
                    className="cursor-pointer rounded-md p-4 font-geist"
                  >
                    <span className="text-shadow-2xs">Built in Public</span>
                    <SiGithub />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
