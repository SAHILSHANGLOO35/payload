import { Router } from "express";
import { googleLoginController } from "../../controllers/auth/google.controller";
import { googleServcice } from "../../services/google.service";

export const googleAuthRouter = Router();

googleAuthRouter.get("/auth/login", async (req, res) => {
  const url = await googleServcice();
  return res.redirect(url);
});

googleAuthRouter.get("/auth/callback", googleLoginController);
