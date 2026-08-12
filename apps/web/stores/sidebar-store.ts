import { create } from "zustand"

type SidebarStore = {
  isOpen: boolean
  toggle: () => void
  open: () => void
  close: () => void
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  isOpen: true,

  toggle: () =>
    set((state) => ({
      isOpen: !state.isOpen,
    })),

  open: () => set({ isOpen: true }),

  close: () => set({ isOpen: false }),
}))
