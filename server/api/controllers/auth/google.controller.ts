import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { supabase } from "../../../lib/supabase";
import { prisma } from "../../../lib/prisma";

export const googleLoginController = async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string;

    if (!code) {
      return res.status(400).json({ error: "Authorization code is required" });
    }

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Supabase auth error:", error);
      return res.status(400).json({ error: error.message });
    }

    const supabaseUser = data.user;

    if (!supabaseUser) {
      return res.status(400).json({ error: "No Supabase user found" });
    }

    const authId = supabaseUser.id;
    const email = supabaseUser.email;
    const fullName =
      supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name;
    const avatarUrl =
      supabaseUser.user_metadata?.avatar_url ||
      supabaseUser.user_metadata?.picture;

    try {
      let user = await prisma.user.findFirst({
        where: { authId },
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            authId,
            email: email!,
            fullName,
            avatarUrl,
          },
        });
      } else {
        console.log("User already exists!");
      }

      // Setting JWT Token
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" },
      );

      // Setting JWT Cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.redirect(`${process.env.FRONTEND_URL}`);
    } catch (prismaError) {
      console.error("Prisma error:", prismaError);
      return res.status(500).json({
        error,
      });
    }
  } catch (err: any) {
    console.error("Controller error:", err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
