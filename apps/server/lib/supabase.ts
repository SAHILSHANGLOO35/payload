import { createClient } from "@supabase/supabase-js"
import type { Request, Response } from "express"

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY!

export const createSupabaseClient = (req: Request, res: Response) => {
  const isProduction = process.env.NODE_ENV === "production"

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      flowType: "pkce",

      // Payload uses its own JWT after OAuth.
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,

      // PKCE verifier belongs to THIS browser/login flow,
      // not one global Express server instance.
      storage: {
        getItem: (key: string) => {
          return req.cookies?.[key] ?? null
        },

        setItem: (key: string, value: string) => {
          res.cookie(key, value, {
            httpOnly: true,
            secure: isProduction,
            sameSite: "lax",
            path: "/",
            maxAge: 10 * 60 * 1000,
          })
        },

        removeItem: (key: string) => {
          res.clearCookie(key, {
            httpOnly: true,
            secure: isProduction,
            sameSite: "lax",
            path: "/",
          })
        },
      },
    },
  })
}
