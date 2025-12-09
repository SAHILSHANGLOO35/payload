import { Router } from "express";
import { googleAuthRouter } from "./google.route";

export const authRouter = Router();

authRouter.use("/", googleAuthRouter);
