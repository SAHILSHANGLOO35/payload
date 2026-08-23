import { create } from "zustand"

export type ViewMode = "form" | "preview" | "both"

type ViewModeStore = {
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
  setResponsiveViewMode: (isLargeScreen: boolean) => void
}

export const useViewModeStore = create<ViewModeStore>((set) => ({
  viewMode: "both",

  setViewMode: (mode) => {
    set({ viewMode: mode })
  },

  setResponsiveViewMode: (isLargeScreen) => {
    set({
      viewMode: isLargeScreen ? "both" : "form",
    })
  },
}))
