import { Logo } from "@/components/common/logo"
import { useAuthStore } from "@/stores/auth-store"
import { FcGoogle } from "react-icons/fc"

export default function Login() {
  const isLoginOpen = useAuthStore((state) => state.isLoginOpen)
  const closeLogin = useAuthStore((state) => state.closeLogin)

  if (!isLoginOpen) return null

  const handleLogin = () => {
    window.location.href = "http://localhost:8000/api/v1/google/auth/login"
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 font-geist"
      onClick={closeLogin}
    >
      <div
        className="flex w-full max-w-sm flex-col items-center rounded-lg border bg-background p-6 shadow-xl"
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
