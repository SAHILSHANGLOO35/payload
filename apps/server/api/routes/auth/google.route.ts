import { Router } from "express"
import {
  googleLoginController,
  googleLogoutController,
  googleMeController,
} from "../../controllers/auth/google.controller"
import { googleService } from "../../services/google.service"
import { authMiddleware } from "../../middlewares/auth.middleware"

export const googleAuthRouter = Router()

googleAuthRouter.get("/auth/login", async (req, res) => {
  const url = await googleService()
  return res.redirect(url)
})

googleAuthRouter.get("/auth/callback", googleLoginController)

googleAuthRouter.get("/auth/user", authMiddleware, googleMeController)

googleAuthRouter.post("/auth/logout", googleLogoutController)
