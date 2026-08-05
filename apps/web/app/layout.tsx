import { Geist, Geist_Mono, Poppins, Instrument_Serif } from "next/font/google"

import "@workspace/ui/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@workspace/ui/lib/utils"
import { Metadata, Viewport } from "next"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" })

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: "Payload",
  description:
    "Payload is a free, lifetime invoice application for creating beautiful, professional, and interactive invoices. Generate, customize, and share invoices with ease—no subscriptions, no hidden costs.",

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
        instrument_serif.variable
      )}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
