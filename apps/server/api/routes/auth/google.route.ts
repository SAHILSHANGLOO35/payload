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
  try {
    const url = await googleService(req, res)

    return res.redirect(url)
  } catch (error) {
    console.error("[googleAuthRouter]", error)

    return res.status(500).json({
      success: false,
      message: "Unable to start Google login",
    })
  }
})

googleAuthRouter.get("/auth/callback", googleLoginController)

googleAuthRouter.get("/auth/user", authMiddleware, googleMeController)

googleAuthRouter.post("/auth/logout", googleLogoutController)
