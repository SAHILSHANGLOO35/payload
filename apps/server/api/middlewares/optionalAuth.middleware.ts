import type { NextFunction, Response } from "express"
import jwt from "jsonwebtoken"
import type { AuthRequest } from "../../types"

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
