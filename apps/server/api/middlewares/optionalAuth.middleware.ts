import type { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

export interface AuthRequest extends Request {
  user?: {
    id: string
    email: string
  }
}

export const optionalAuthMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token

  if (!token) {
    return next()
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)

    req.user = decoded as AuthRequest["user"]
  } catch (error) {
    req.user = undefined
  }

  next()
}
