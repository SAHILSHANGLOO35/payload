import type { Request, Response } from "express";
import { supabase } from "../../../lib/supabase";
import { googleServcice } from "../../services/google.service";
import { prisma } from "../../../lib/prisma";

export const googleLoginController = async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string | undefined;

    if (code) {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      const supabaseUser = data.user;

      if (!supabaseUser) {
        return res.status(400).json({ error: "No Supabase user found" });
      }

      console.log(supabaseUser);

      const createOrFindUser = async () => {
        const authId = supabaseUser.id;
        const email = supabaseUser.email;
        const fullName = supabaseUser.user_metadata?.full_name;
        const avatarUrl = supabaseUser.user_metadata.avatarUrl;

        try {
          let user = await prisma.user.findFirst({ where: { authId } });

          if (!user) {
            user = await prisma.user.create({
              data: {
                authId,
                email: email!,
                fullName,
                avatarUrl,
              },
            });
          }
          return user;
        } catch (err) {
          console.error("Prisma error:", err);
        }
      };

      await createOrFindUser();

      return res.json({ supabaseUser });
    }
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
