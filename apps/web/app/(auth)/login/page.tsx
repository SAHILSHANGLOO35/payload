"use client"

import { Logo } from "@/components/common/logo"
import { useAuthStore } from "@/stores/auth-store"
import { FcGoogle } from "react-icons/fc"

export default function Login() {
  const isLoginOpen = useAuthStore((state) => state.isLoginOpen)
  const closeLogin = useAuthStore((state) => state.closeLogin)

  if (!isLoginOpen) return null

  const handleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/google/auth/login`
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 font-geist"
      onClick={closeLogin}
    >
      <div
        className="absolute inset-x-0 bottom-0 flex max-h-[90dvh] w-full flex-col items-center overflow-y-auto rounded-t-lg border bg-background p-4 shadow-xl sm:relative sm:inset-auto sm:max-w-sm sm:rounded-lg sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <Logo />

        <h2 className="font-instrument-serif text-3xl font-semibold tracking-wide">
          Welcome Again!
        </h2>

        <div className="mt-1 text-sm tracking-tight text-muted-foreground">
          Login with Google to continue using{" "}
          <span className="underline">Payload.</span>
        </div>

        <button
          type="button"
          className="mt-6 flex w-full cursor-pointer items-center justify-center gap-4 rounded-md border px-4 py-2 text-sm font-medium transition-all duration-200 ease-in-out hover:bg-muted"
          onClick={handleLogin}
        >
          <FcGoogle size={26} />
          Continue with Google
        </button>
      </div>
    </div>
  )
}
