export type PdfFont = "Inter" | "JetBrains Mono" | "Geist" | "Quicksand"

export type PdfThemeKey = "default" | "vercel" | "github" | "stripe" | "notion"

export type InvoiceTheme = {
  template: PdfThemeKey
  font: string
  mode: "light" | "dark"
  accentColor: string
}

export type PdfTheme = {
  name: string

  page: {
    background: string
    text: string
  }

  heading: string
  mutedText: string
  border: string

  panel: string
  tableHeader: string
  tableRow: string

  accent: string

  // GitHub's "diff add" green — used for positive/total emphasis
  success: string

  totalBackground: string
  totalText: string
}

export const pdfThemes: Record<PdfThemeKey, PdfTheme> = {
  default: {
    name: "Default",

    page: {
      background: "#ffffff",
      text: "#111111",
    },

    heading: "#5b55ff",
    mutedText: "#737373",
    border: "#e5e5e5",

    panel: "#f5f5f5",
    tableHeader: "#635cff",
    tableRow: "#f5f5f5",

    accent: "#635cff",
    success: "#16a34a",

    totalBackground: "#ffffff",
    totalText: "#111111",
  },

  vercel: {
    name: "Vercel",

    page: {
      background: "#050505",
      text: "#ffffff",
    },

    heading: "#ffffff",
    mutedText: "#737373",
    border: "#262626",

    panel: "#0f0f0f",
    tableHeader: "#111111",
    tableRow: "#0d0d0d",

    accent: "#ffffff",
    success: "#3fb950",

    totalBackground: "#050505",
    totalText: "#ffffff",
  },

  github: {
    name: "GitHub",

    page: {
      background: "#0d1117", // canvas.default (dark)
      text: "#c9d1d9", // fg.default
    },

    heading: "#f0f6fc", // fg.default (bright/emphasis)
    mutedText: "#8b949e", // fg.muted
    border: "#30363d", // border.default

    panel: "#161b22", // canvas.subtle
    tableHeader: "#161b22", // canvas.subtle, kept dark instead of a loud fill
    tableRow: "#0d1117", // canvas.default (near-invisible zebra striping)

    accent: "#58a6ff", // GitHub link/accent blue

    // like a confirmed / merged amount
    success: "#3fb950",

    totalBackground: "#161b22",
    totalText: "#f0f6fc",
  },

  stripe: {
    name: "Stripe",

    page: {
      background: "#ffffff",
      text: "#1a1f36",
    },

    heading: "#1a1f36",
    mutedText: "#697386",
    border: "#e3e8ee",

    panel: "#f6f9fc",
    tableHeader: "#f6f9fc",
    tableRow: "#ffffff",

    accent: "#635bff",
    success: "#0d8a4f",

    totalBackground: "#f6f9fc",
    totalText: "#1a1f36",
  },

  notion: {
    name: "Notion",

    page: {
      background: "#191919", // Notion dark page background
      text: "#E6E6E5", // Notion light primary body text
    },

    heading: "#FFFFFF", // Clean white headings
    mutedText: "#9B9B9B", // Notion secondary/muted text
    border: "#2E2E2E", // Notion dark subtle divider borders

    panel: "#202020", // Notion block/callout background
    tableHeader: "#222222", // Slightly distinct header tile
    tableRow: "#1C1C1C", // Alternate row background for striping

    accent: "#EB5757", // Notion classic red/coral accent
    success: "#4dab72",

    totalBackground: "#202020",
    totalText: "#FFFFFF",
  },
}
