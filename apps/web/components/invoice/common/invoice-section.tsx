import type { ReactNode } from "react"

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion"

type InvoiceSectionProps = {
  value: string
  title: string
  children: ReactNode
}

export function InvoiceSection({
  value,
  title,
  children,
}: InvoiceSectionProps) {
  return (
    <AccordionItem value={value} className="border-b border-border/60">
      <AccordionTrigger className="h-14 w-full cursor-pointer rounded-none px-4 py-4 text-[14px] font-medium transition-all duration-150 ease-in-out hover:bg-sidebar hover:no-underline focus:bg-sidebar focus:text-blue-600/95">
        {title}
      </AccordionTrigger>

      <AccordionContent className="px-4 py-4">{children}</AccordionContent>
    </AccordionItem>
  )
}
