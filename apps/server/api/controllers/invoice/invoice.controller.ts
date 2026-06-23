import crypto from "crypto"
import type { Response } from "express"
import type { AuthRequest } from "../../../types"
import { prisma } from "db/client"

export const createInvoice = async (req: AuthRequest, res: Response) => {
  try {
    let userId: string | null = null
    let guestSessionId: string | null = null

    // Logged-in user
    if (req.user) {
      userId = req.user.id
    } else {
      // Guest user
      let guestId = req.cookies.guestId

      if (!guestId) {
        guestId = crypto.randomUUID()

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

      const existingInvoice = await prisma.invoice.findFirst({
        where: {
          guestSessionId: guestSession.id,
        },
      })

      if (existingInvoice) {
        return res.status(403).json({
          success: false,
          requiresAuth: true,
          message: "Please sign in to create more invoices",
        })
      }

      guestSessionId = guestSession.id
    }

    const invoice = await prisma.invoice.create({
      data: {
        userId,
        guestSessionId,
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
