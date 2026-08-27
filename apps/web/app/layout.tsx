import {
  Geist,
  Geist_Mono,
  Poppins,
  Instrument_Serif,
  Pacifico,
} from "next/font/google"

import "@workspace/ui/globals.css"
import { cn } from "@workspace/ui/lib/utils"
import type { Metadata, Viewport } from "next"

import { ThemeProvider } from "@/providers/theme-provider"
import { Toaster } from "@workspace/ui/components/toast"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

const instrument_serif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
})

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: ["400"],
})

const siteUrl = "https://payload-web-one.vercel.app"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  colorScheme: "light dark",
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#ffffff",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#0a0a0a",
    },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Payload — Free Online Invoice Generator",
    template: "%s | Payload",
  },

  description:
    "Create beautiful, professional invoices for free with Payload. Customize templates, fonts, colors, company details, payment information and export invoices as PDF or PNG.",

  applicationName: "Payload",

  keywords: [
    "invoice generator",
    "free invoice generator",
    "online invoice generator",
    "invoice maker",
    "free invoice maker",
    "professional invoice generator",
    "invoice template",
    "free invoice template",
    "PDF invoice generator",
    "PNG invoice generator",
    "custom invoice generator",
    "business invoice generator",
    "freelancer invoice generator",
    "create invoice online",
    "generate invoice online",
    "invoice software",
    "Payload invoice",
  ],

  authors: [
    {
      name: "Sahil Shangloo",
      url: "https://github.com/SAHILSHANGLOO35",
    },
  ],

  creator: "Sahil Shangloo",
  publisher: "Payload",

  category: "Business",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,

    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Payload",

    title: "Payload - Free Online Invoice Generator",

    description:
      "Create beautiful, professional invoices for free. Customize templates, fonts, colors and invoice details, then export as PDF or PNG.",

    locale: "en_US",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Payload - Free Online Invoice Generator",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Payload - Free Online Invoice Generator",

    description:
      "Create beautiful, professional invoices for free. Customize them and export as PDF or PNG.",

    images: ["/og-image.png"],
  },

  icons: {
    icon: [
      {
        url: "/logo-light.ico",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/logo-dark.ico",
        media: "(prefers-color-scheme: dark)",
      },
    ],

    apple: "/apple-touch-icon.png",
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",

  name: "Payload",

  url: siteUrl,

  description:
    "A free online invoice generator for creating, customizing, saving and exporting professional invoices.",

  applicationCategory: "BusinessApplication",

  operatingSystem: "Any",

  browserRequirements: "Requires a modern web browser",

  isAccessibleForFree: true,

  creator: {
    "@type": "Person",
    name: "Sahil Shangloo",
    url: "https://github.com/SAHILSHANGLOO35",
  },

  featureList: [
    "Create professional invoices",
    "Multiple invoice templates",
    "Custom fonts and accent colors",
    "Light and dark invoice themes",
    "Live invoice preview",
    "PDF invoice export",
    "PNG invoice export",
    "Company and client details",
    "Custom invoice fields",
    "Tax and discount calculations",
    "Payment information",
    "Invoice status management",
    "Google authentication",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-geist",
        geist.variable,
        "font-poppins",
        poppins.variable,
        "font-instrument-serif",
        instrument_serif.variable,
        "font-pacifico",
        pacifico.variable
      )}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
