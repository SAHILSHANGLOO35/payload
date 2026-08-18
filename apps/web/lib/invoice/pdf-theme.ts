export type PdfFont =
  | "Inter"
  | "JetBrains Mono"
  | "Geist"
  | "Helvetica"
  | "Roboto"
  | "Ubuntu"

export type PdfThemeKey =
  | "default"
  | "vercel"
  | "github"
  | "stripe"
  | "notion"
  | "apple"

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

    totalBackground: "#050505",
    totalText: "#ffffff",
  },

  github: {
    name: "GitHub",

    page: {
      background: "#ffffff",
      text: "#24292f",
    },

    heading: "#24292f",
    mutedText: "#57606a",
    border: "#d0d7de",

    panel: "#f6f8fa",
    tableHeader: "#24292f",
    tableRow: "#f6f8fa",

    accent: "#0969da",

    totalBackground: "#ffffff",
    totalText: "#24292f",
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

    totalBackground: "#f6f9fc",
    totalText: "#1a1f36",
  },

  notion: {
    name: "Notion",

    page: {
      background: "#ffffff",
      text: "#37352f",
    },

    heading: "#37352f",
    mutedText: "#787774",
    border: "#e9e9e7",

    panel: "#f7f6f3",
    tableHeader: "#f7f6f3",
    tableRow: "#ffffff",

    accent: "#eb5757",

    totalBackground: "#f7f6f3",
    totalText: "#37352f",
  },

  apple: {
    name: "Apple",

    page: {
      background: "#ffffff",
      text: "#1d1d1f",
    },

    heading: "#1d1d1f",
    mutedText: "#86868b",
    border: "#d2d2d7",

    panel: "#f5f5f7",
    tableHeader: "#f5f5f7",
    tableRow: "#ffffff",

    accent: "#0071e3",

    totalBackground: "#f5f5f7",
    totalText: "#1d1d1f",
  },
}
