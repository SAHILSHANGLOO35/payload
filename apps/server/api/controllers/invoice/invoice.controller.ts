import crypto from "crypto"
import type { Response } from "express"
import type { AuthRequest } from "../../../types"
import { prisma } from "db/client"
import {
  saveInvoiceSchema,
  updateInvoiceStatusSchema,
} from "../../validators/invoice.validator"
import { supabaseAdmin } from "../../../lib/supabase-admin"

async function resolveOwnership(
  req: AuthRequest,
  res: Response
): Promise<{
  userId: string | null
  guestSessionId: string | null
} | null> {
  if (req.user) {
    return {
      userId: req.user.id,
      guestSessionId: null,
    }
  }

  const isProduction = process.env.NODE_ENV === "production"

  // Guest Flow
  let guestId = req.cookies.guestId

  if (!guestId) {
    guestId = crypto.randomUUID()

    res.cookie("guestId", guestId, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })
  }

  let guestSession = await prisma.guestSession.findUnique({
    where: {
      guestId,
    },
  })

  if (!guestSession) {
    guestSession = await prisma.guestSession.create({
      data: {
        guestId,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    })
  }

  return {
    userId: null,
    guestSessionId: guestSession.id,
  }
}

export const createInvoice = async (req: AuthRequest, res: Response) => {
  try {
    const ownership = await resolveOwnership(req, res)
    if (!ownership) return

    const { userId, guestSessionId } = ownership

    // Guest: enforce 1-invoice limit
    if (guestSessionId) {
      const existingInvoice = await prisma.invoice.findFirst({
        where: { guestSessionId },
      })

      if (existingInvoice) {
        return res.status(403).json({
          success: false,
          requiresAuth: true,
          message: "Please sign in to create more invoices",
        })
      }
    }

    const invoice = await prisma.invoice.create({
      data: {
        userId,
        guestSessionId,
        invoiceData: {
          create: {},
        },
      },
      include: {
        invoiceData: true,
      },
    })

    return res.status(201).json({
      success: true,
      invoice,
    })
  } catch (error) {
    console.error("[CREATE INVOICE ERROR]:", error)

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    })
  }
}

export const saveInvoice = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid invoice id",
      })
    }

    // 1. Validate body
    const parsed = saveInvoiceSchema.safeParse(req.body)
    if (!parsed.success) {
      console.log("VALIDATION ISSUES:", parsed.error.issues)

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        issues: parsed.error.issues,
      })
    }

    const body = parsed.data

    // 2. Resolve caller identity
    const ownership = await resolveOwnership(req, res)
    if (!ownership) return

    const { userId, guestSessionId } = ownership

    // 3. Find the invoice and verify ownership
    const invoice = await prisma.invoice.findUnique({
      where: { id },
    })

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      })
    }

    const ownsInvoice =
      (userId && invoice.userId === userId) ||
      (guestSessionId && invoice.guestSessionId === guestSessionId)

    if (!ownsInvoice) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      })
    }

    // 4. Upsert InvoiceData parent record (the hub for all nested data)
    const invoiceData = await prisma.invoiceData.upsert({
      where: {
        invoiceId: id,
      },
      create: {
        invoiceId: id,
      },
      update: {}, // nothing to update on the hub itself
    })

    const invoiceDataId = invoiceData.id

    // 5. Run all nested upserts inside a transaction so it's all-or-nothing.
    await prisma.$transaction(async (tx) => {
      // Company details
      if (body.companyDetails) {
        const { metadata, ...companyFields } = body.companyDetails

        const company = await tx.invoiceCompanyDetails.upsert({
          where: {
            invoiceDataId,
          },
          create: { invoiceDataId, ...companyFields },
          update: companyFields,
        })

        if (metadata !== undefined) {
          await tx.invoiceCompanyDetailsMetadata.deleteMany({
            where: {
              invoiceCompanyDetailsId: company.id,
            },
          })
          if (metadata.length > 0) {
            await tx.invoiceCompanyDetailsMetadata.createMany({
              data: metadata.map((m) => ({
                ...m,
                invoiceCompanyDetailsId: company.id,
              })),
            })
          }
        }
      }

      // Client Details
      if (body.clientDetails) {
        const { metadata, ...clientFields } = body.clientDetails

        const client = await tx.invoiceClientDetails.upsert({
          where: { invoiceDataId },
          create: { invoiceDataId, ...clientFields },
          update: clientFields,
        })

        if (metadata !== undefined) {
          await tx.invoiceClientDetailsMetadata.deleteMany({
            where: { invoiceClientDetailsId: client.id },
          })
          if (metadata.length > 0) {
            await tx.invoiceClientDetailsMetadata.createMany({
              data: metadata.map((m) => ({
                ...m,
                invoiceClientDetailsId: client.id,
              })),
            })
          }
        }
      }

      // Invoice Details
      if (body.invoiceDetails) {
        const { billingDetails, date, dueDate, ...detailsFields } =
          body.invoiceDetails

        const details = await tx.invoiceDetails.upsert({
          where: { invoiceDataId },
          create: {
            invoiceDataId,
            ...detailsFields,
            date: new Date(date),
            dueDate: new Date(dueDate),
          },
          update: {
            ...detailsFields,
            date: new Date(date),
            dueDate: new Date(dueDate),
          },
        })

        // Same delete-then-recreate rationale as metadata above
        if (billingDetails !== undefined) {
          await tx.invoiceBillingDetails.deleteMany({
            where: { invoiceDetailsId: details.id },
          })
          if (billingDetails.length > 0) {
            await tx.invoiceBillingDetails.createMany({
              data: billingDetails.map((b) => ({
                ...b,
                invoiceDetailsId: details.id,
              })),
            })
          }
        }
      }

      // Items
      if (body.items != undefined) {
        await tx.invoiceItem.deleteMany({
          where: {
            invoiceDataId,
          },
        })
        if (body.items.length > 0) {
          await tx.invoiceItem.createMany({
            data: body.items.map((i) => ({
              ...i,
              invoiceDataId,
            })),
          })
        }
      }

      // Metadata
      if (body.metadata) {
        const { paymentDetails, ...metaFields } = body.metadata

        const meta = await tx.invoiceMetadata.upsert({
          where: {
            invoiceDataId,
          },
          create: {
            invoiceDataId,
            ...metaFields,
          },
          update: metaFields,
        })

        if (paymentDetails !== undefined) {
          await tx.invoicePaymentDetail.deleteMany({
            where: {
              invoiceMetadataId: meta.id,
            },
          })
          if (paymentDetails.length > 0) {
            await tx.invoicePaymentDetail.createMany({
              data: paymentDetails.map((p) => ({
                ...p,
                invoiceMetadataId: meta.id,
              })),
            })
          }
        }
      }
    })

    // 6. Return the fully hydrated invoice so the frontend stays in sync
    const fullInvoice = await fetchFullInvoice(id)

    return res.status(200).json({
      success: true,
      invoice: fullInvoice,
    })
  } catch (error) {
    console.error("[saveInvoice]", error)
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" })
  }
}

export const updateInvoiceStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid invoice id",
      })
    }

    // Validate only the status
    const parsed = updateInvoiceStatusSchema.safeParse(req.body)

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid invoice status",
        issues: parsed.error.issues,
      })
    }

    const { status } = parsed.data

    // Get logged-in user or guest ownership
    const ownership = await resolveOwnership(req, res)

    if (!ownership) return

    const { userId, guestSessionId } = ownership

    // Find invoice
    const invoice = await prisma.invoice.findUnique({
      where: {
        id,
      },
    })

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      })
    }

    // Check ownership
    const ownsInvoice =
      (userId && invoice.userId === userId) ||
      (guestSessionId && invoice.guestSessionId === guestSessionId)

    if (!ownsInvoice) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      })
    }

    // Update only status + paidAt
    await prisma.invoice.update({
      where: {
        id,
      },
      data: {
        status,
        paidAt: status === "paid" ? new Date() : null,
      },
    })

    // Return complete updated invoice
    const updatedInvoice = await fetchFullInvoice(id)

    return res.status(200).json({
      success: true,
      invoice: updatedInvoice,
    })
  } catch (error) {
    console.error("[updateInvoiceStatus]", error)

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    })
  }
}

export const getInvoices = async (req: AuthRequest, res: Response) => {
  try {
    const ownership = await resolveOwnership(req, res)
    if (!ownership) return

    const { userId, guestSessionId } = ownership

    // Pagination, default page 1, max 25 per page
    const page = Math.max(1, parseInt(req.query.page as string) || 1)
    const limit = Math.min(
      25,
      Math.max(1, parseInt(req.query.limit as string) || 10)
    )
    const skip = (page - 1) * limit

    const where = userId ? { userId } : { guestSessionId }

    const [invoices, total] = await Promise.all([
      prisma.invoice.findMany({
        where,
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
        include: {
          invoiceData: {
            include: {
              clientDetails: {
                select: {
                  name: true,
                },
              },
              invoiceDetails: {
                select: {
                  currency: true,
                  serialNumber: true,
                  prefix: true,
                  date: true,
                  dueDate: true,
                },
              },
            },
          },
        },
      }),
      prisma.invoice.count({ where }),
    ])

    return res.status(200).json({
      success: true,
      invoices,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("[getInvoices]", error)
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" })
  }
}

export const getInvoice = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid invoice id",
      })
    }
    const ownership = await resolveOwnership(req, res)
    if (!ownership) return

    const { userId, guestSessionId } = ownership

    const invoice = await prisma.invoice.findUnique({
      where: {
        id,
      },
    })

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      })
    }

    const ownsInvoice =
      (userId && invoice.userId === userId) ||
      (guestSessionId && invoice.guestSessionId === guestSessionId)

    if (!ownsInvoice) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      })
    }

    const fullInvoice = await fetchFullInvoice(id)

    return res.status(200).json({
      success: true,
      invoice: fullInvoice,
    })
  } catch (error) {
    console.error("[getInvoice]", error)
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" })
  }
}

export const deleteInvoice = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid invoice id",
      })
    }

    const ownership = await resolveOwnership(req, res)
    if (!ownership) return

    const { userId, guestSessionId } = ownership

    const invoice = await prisma.invoice.findUnique({
      where: {
        id,
      },
    })

    if (!invoice) {
      return res
        .status(404)
        .json({ success: false, message: "Invoice not found" })
    }

    const ownsInvoice =
      (userId && invoice.userId === userId) ||
      (guestSessionId && invoice.guestSessionId === guestSessionId)

    if (!ownsInvoice) {
      return res.status(403).json({ success: false, message: "Forbidden" })
    }

    await prisma.invoice.delete({ where: { id } })

    return res.status(200).json({ success: true, message: "Invoice deleted" })
  } catch (error) {
    console.error("[deleteInvoice]", error)
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" })
  }
}

export const uploadInvoiceAssets = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid invoice id",
      })
    }

    const ownership = await resolveOwnership(req, res)

    if (!ownership) return

    const { userId, guestSessionId } = ownership

    const invoice = await prisma.invoice.findUnique({
      where: {
        id,
      },
      include: {
        invoiceData: {
          include: {
            companyDetails: true,
          },
        },
      },
    })

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      })
    }

    const ownsInvoice =
      (userId && invoice.userId === userId) ||
      (guestSessionId && invoice.guestSessionId === guestSessionId)

    if (!ownsInvoice) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      })
    }

    if (!invoice.invoiceData?.companyDetails) {
      return res.status(400).json({
        success: false,
        message: "Save invoice details before uploading assets",
      })
    }

    const files = req.files as
      | {
          logo?: Express.Multer.File[]
          signature?: Express.Multer.File[]
        }
      | undefined

    const logo = files?.logo?.[0]
    const signature = files?.signature?.[0]

    if (!logo && !signature) {
      return res.status(400).json({
        success: false,
        message: "No assets provided",
      })
    }

    let logoPath: string | undefined
    let signaturePath: string | undefined

    if (logo) {
      logoPath = `${id}/logo`

      const { error } = await supabaseAdmin.storage
        .from("invoice-assets")
        .upload(logoPath, logo.buffer, {
          contentType: logo.mimetype,
          upsert: true,
        })

      if (error) {
        throw error
      }
    }

    if (signature) {
      signaturePath = `${id}/signature`

      const { error } = await supabaseAdmin.storage
        .from("invoice-assets")
        .upload(signaturePath, signature.buffer, {
          contentType: signature.mimetype,
          upsert: true,
        })

      if (error) {
        throw error
      }
    }

    await prisma.invoiceCompanyDetails.update({
      where: {
        invoiceDataId: invoice.invoiceData.id,
      },

      data: {
        ...(logoPath && {
          logo: logoPath,
        }),

        ...(signaturePath && {
          signature: signaturePath,
        }),
      },
    })

    const updatedInvoice = await fetchFullInvoice(id)

    return res.status(200).json({
      success: true,
      invoice: updatedInvoice,
    })
  } catch (error) {
    console.error("[uploadInvoiceAssets]", error)

    return res.status(500).json({
      success: false,
      message: "Failed to upload invoice assets",
    })
  }
}

const createAssetSignedUrl = async (path: string | null) => {
  if (!path) return null

  const { data, error } = await supabaseAdmin.storage
    .from("invoice-assets")
    .createSignedUrl(path, 60 * 60 * 24)

  if (error) {
    console.error("[createAssetSignedUrl]", error)

    return null
  }

  return data.signedUrl
}

async function fetchFullInvoice(id: string) {
  const invoice = await prisma.invoice.findUnique({
    where: {
      id,
    },

    include: {
      invoiceData: {
        include: {
          companyDetails: {
            include: {
              metadata: true,
            },
          },

          clientDetails: {
            include: {
              metadata: true,
            },
          },

          invoiceDetails: {
            include: {
              billingDetails: true,
            },
          },

          items: true,

          metadata: {
            include: {
              paymentDetails: true,
            },
          },
        },
      },
    },
  })

  if (!invoice) {
    return null
  }

  const company = invoice.invoiceData?.companyDetails

  if (!company) {
    return invoice
  }

  const [logo, signature] = await Promise.all([
    createAssetSignedUrl(company.logo),
    createAssetSignedUrl(company.signature),
  ])

  return {
    ...invoice,

    invoiceData: {
      ...invoice.invoiceData!,

      companyDetails: {
        ...company,
        logo,
        signature,
      },
    },
  }
}
