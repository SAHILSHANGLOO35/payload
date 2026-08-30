import { create } from "zustand"
import axios from "axios"

type User = {
  id: string
  email: string
  fullName: string
  avatarUrl: string | null
}

type AuthStore = {
  user: User | null
  isLoading: boolean
  isLoginOpen: boolean

  openLogin: () => void
  closeLogin: () => void
  checkAuth: () => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: true,
  isLoginOpen: false,

  openLogin: () => set({ isLoginOpen: true }),
  closeLogin: () => set({ isLoginOpen: false }),

  checkAuth: async () => {
    set({ isLoading: true })

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/google/auth/user`,
        {
          withCredentials: true,
        }
      )

      set({
        user: response.data.user,
        isLoading: false,
      })
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        set({
          user: null,
          isLoading: false,
        })

        return
      }

      console.error("[checkAuth]", error)

      set({
        user: null,
        isLoading: false,
      })
    }
  },

  logout: async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/google/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      )

      set({
        user: null,
      })
    } catch (error) {
      console.error("Logout failed:", error)
    }
  },
}))
