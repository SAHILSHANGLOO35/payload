import jwt from "jsonwebtoken"
import type { NextFunction, Request, Response } from "express"

export interface AuthRequest extends Request {
  user?: {
    id: string
    email: string
    authId: string
  }
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token

  if (!token) return res.status(401).json({ message: "Unauthorized User!" })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)

    req.user = decoded as AuthRequest["user"]

    next()
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" })
  }
}
