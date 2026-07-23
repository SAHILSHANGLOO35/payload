import { z } from "zod"

const metadataEntrySchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
})

export const saveInvoiceSchema = z.object({
  companyDetails: z
    .object({
      name: z.string().min(1, "Company name is required"),
      address: z.string().min(1, "Company address is required"),
      logo: z.string().url().optional().nullable(),
      signature: z.string().url().optional().nullable(),
      metadata: z.array(metadataEntrySchema).optional(),
    })
    .optional(),

  clientDetails: z
    .object({
      name: z.string().min(1, "Client name is required"),
      address: z.string().min(1, "Client address is required"),
      metadata: z.array(metadataEntrySchema).optional(),
    })
    .optional(),

  invoiceDetails: z
    .object({
      theme: z.record(z.string(), z.unknown()),
      currency: z.string().min(1),
      prefix: z.string().min(1),
      serialNumber: z.string().min(1),
      date: z.string().datetime({ message: "date must be ISO 8601" }),
      dueDate: z.string().datetime({ message: "dueDate must be ISO 8601" }),
      billingDetails: z
        .array(
          z.object({
            label: z.string().min(1),
            type: z.enum(["fixed", "percentage"]),
            value: z.number().nonnegative(),
          })
        )
        .optional(),
    })
    .optional(),

  items: z
    .array(
      z.object({
        name: z.string().min(1),
        description: z.string(),
        quantity: z.number().int().positive(),
        unitPrice: z.number().nonnegative(),
      })
    )
    .optional(),

  metadata: z
    .object({
      notes: z.string().optional(),
      terms: z.string().optional(),
      paymentDetails: z.array(metadataEntrySchema).optional(),
    })
    .optional(),
})
