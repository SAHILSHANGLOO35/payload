import { supabase } from "../../lib/supabase";

export const googleServcice = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
      redirectTo: process.env.GOOGLE_REDIRECT_URL,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data.url;
};
