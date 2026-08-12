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
      <AccordionTrigger className="px-4 py-4 text-base font-semibold hover:no-underline">
        {title}
      </AccordionTrigger>

      <AccordionContent className="px-5 pb-5">{children}</AccordionContent>
    </AccordionItem>
  )
}
