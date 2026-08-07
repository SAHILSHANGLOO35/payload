import { Features } from "@/components/layout/landing/features/features"
import { Footer } from "@/components/layout/landing/footer"
import { Hero } from "@/components/layout/landing/hero"
import { Highlights } from "@/components/layout/landing/highlights"
import { Navbar } from "@/components/layout/landing/navbar"

export default function Page() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Highlights />
      <Features />
      <Footer />
    </div>
  )
}
