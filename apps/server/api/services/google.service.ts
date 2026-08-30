import type { Request, Response } from "express"
import { createSupabaseClient } from "../../lib/supabase"

export const googleService = async (req: Request, res: Response) => {
  const supabase = createSupabaseClient(req, res)

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
      redirectTo: process.env.GOOGLE_REDIRECT_URL,
    },
  })

  if (error) {
    throw new Error(error.message)
  }

  return data.url
}
