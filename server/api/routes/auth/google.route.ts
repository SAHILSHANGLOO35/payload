import { Router } from "express";
import { googleLoginController } from "../../controllers/auth/google.controller";
import { googleService } from "../../services/google.service";

export const googleAuthRouter = Router();

googleAuthRouter.get("/auth/login", async (req, res) => {
  const url = await googleService();
  return res.redirect(url);
});

googleAuthRouter.get("/auth/callback", googleLoginController);
