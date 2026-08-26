import type { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { supabase } from "../../../lib/supabase"
import { prisma } from "db/client"
import { migrateGuestInvoices } from "../../services/guest.service"
import type { AuthRequest } from "../../middlewares/auth.middleware"

export const googleLoginController = async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string

    if (!code) {
      return res.status(400).json({ error: "Authorization code is required" })
    }

    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (error || !data.user) {
      console.error("Supabase auth error:", error)
      return res
        .status(400)
        .json({ success: false, message: error?.message ?? "No user returned" })
    }

    const supabaseUser = data.user

    const authId = supabaseUser.id
    const email = supabaseUser.email!
    const fullName =
      supabaseUser.user_metadata?.full_name ||
      supabaseUser.user_metadata?.name ||
      email.split("@")[0]
    const avatarUrl =
      supabaseUser.user_metadata?.avatar_url ||
      supabaseUser.user_metadata?.picture

    try {
      let user = await prisma.user.findFirst({
        where: { authId },
      })

      if (!user) {
        user = await prisma.user.create({
          data: {
            authId,
            email: email!,
            fullName,
            avatarUrl,
          },
        })
      } else {
        // Keep name/avatar fresh in case they updated Google profile
        user = await prisma.user.update({
          where: { authId },
          data: { fullName, avatarUrl },
        })
      }

      // Migrating guest invoices if guestId cookie exists
      const guestId = req.cookies.guestId
      if (guestId) {
        const isProduction = process.env.NODE_ENV === "production"

        await migrateGuestInvoices(user.id, guestId)
        res.clearCookie("guestId", {
          httpOnly: true,
          secure: isProduction,
          sameSite: isProduction ? "none" : "lax",
          path: "/",
        })
      }

      // Setting JWT Token
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          authId: user.authId,
        },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
      )

      const isProduction = process.env.NODE_ENV === "production"

      const cookieOptions = {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? ("none" as const) : ("lax" as const),
        path: "/",
      }

      // Setting JWT Cookie
      res.cookie("token", token, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })

      return res.redirect(`${process.env.FRONTEND_URL}/create/invoice`)
    } catch (prismaError) {
      console.error("[googleLoginController]", prismaError)
      return res.status(500).json({
        error,
      })
    }
  } catch (err: any) {
    console.error("Controller error:", err)
    return res.status(500).json({
      error: "Internal server error",
    })
  }
}

export const googleMeController = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized User",
      })
    }

    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        avatarUrl: true,
      },
    })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    return res.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    console.error("[googleMeController]", error)

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}

export const googleLogoutController = async (req: Request, res: Response) => {
  const isProduction = process.env.NODE_ENV === "production"

  res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
  })

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  })
}
