import { ScrollArea } from "@workspace/ui/components/scroll-area"
import { CompanySection } from "../accordion/company-section"
import { ClientSection } from "../accordion/client-section"
import { InvoiceSection } from "../accordion/invoice-section"
import { ItemsSection } from "../accordion/items-section"
import { AdditionalSection } from "../accordion/additional-section"
import { InvoiceToolbar } from "./toolbar"
import { Accordion } from "@workspace/ui/components/accordion"

export const InvoiceForm = () => {
  return (
    <div className="scrollbar-hide flex h-full min-h-0 flex-col border-r">
      <InvoiceToolbar />

      <ScrollArea className="min-h-0 flex-1">
        <Accordion className="w-full" defaultValue={["company"]}>
          <CompanySection />
          <ClientSection />
          <InvoiceSection />
          <ItemsSection />
          <AdditionalSection />
        </Accordion>
      </ScrollArea>
    </div>
  )
}
