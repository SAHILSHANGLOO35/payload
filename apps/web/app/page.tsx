import { Features } from "@/components/features/features"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { Highlights } from "@/components/highlights"
import { Navbar } from "@/components/navbar"

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
