import crypto from "crypto"
import type { Response } from "express"
import type { AuthRequest } from "../../../types"
import { prisma } from "db/client"

async function resolveOwnership(
  req: AuthRequest,
  res: Response
): Promise<{ userId: string | null; guestSessionId: string | null } | null> {
  if (req.user) {
    return {
      userId: req.user.id,
      guestSessionId: null,
    }
  }

  // Guest Flow
  let guestId = req.cookies.guestId

  if (!guestId) {
    guestId: crypto.randomUUID()
    res.cookie("guestId", guestId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
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

  return { userId: null, guestSessionId: guestSession.id }
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
    console.error(error)

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    })
  }
}

export const saveInvoice = async (req: AuthRequest, res: Response) => {
  try {
  } catch (error) {
    console.error("[saveInvoice]", error)
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" })
  }
}
